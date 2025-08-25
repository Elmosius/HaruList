<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { moods } from "./moods.ts";
import type { ITask } from "../../../types/task.ts";

const emit = defineEmits<{
  (e: "closeModal"): void;
  (e: "addTask", task: ITask): void;
}>();

const task = reactive({
  title: "",
  dateStart: "",
  dateEnd: "",
  mood: null,
});

const addTask = () => {
  if (!task.title.trim()) return;

  const newTask = {
    id: Math.floor(Math.random() * 1000000),
    title: task.title,
    status: "pending",
    dateStart: task.dateStart,
    dateEnd: task.dateEnd,
    mood: task.mood,
  };

  emit("addTask", newTask);

  task.title = "";
  task.mood = null;
  task.dateStart = "";
  task.dateEnd = "";

  emit("closeModal");
};

watch(
  () => task.dateStart,
  (newStart) => {
    if (task.dateEnd && newStart > task.dateEnd) {
      task.dateEnd = newStart;
    }
  },
);

watch(
  () => task.dateEnd,
  (newEnd) => {
    if (task.dateStart && newEnd < task.dateStart) {
      task.dateStart = newEnd;
    }
  },
);
</script>

<template>
  <div
    class="fixed inset-0 bg-secondary/30 backdrop-blur-xs flex items-center justify-center p-4 z-60"
    @click="emit('closeModal')"
  >
    <!-- Modal Content -->
    <div class="bg-primary rounded-3xl p-6 w-full max-w-md mx-4" @click.stop>
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Add new task</h2>
        <button
          @click="emit('closeModal')"
          class="text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>
      </div>

      <!-- Task Name Input -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Task name
        </label>
        <input
          v-model="task.title"
          type="text"
          placeholder="What are you going to do?"
          class="w-full text-sm px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 ring-secondary focus:border-transparent"
        />
      </div>

      <!-- Mood Selection -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-3">
          How do you feel about this task?
        </label>
        <div class="flex gap-3 justify-center">
          <button
            v-for="(emoji, index) in moods"
            :key="index"
            @click="task.mood = index"
            :class="[
              'w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl transition-all',
              task.mood === index
                ? 'ring-2 ring-accent bg-blue-50'
                : 'hover:bg-gray-200',
            ]"
          >
            {{ emoji }}
          </button>
        </div>
        <p class="text-center text-xs text-gray-500 mt-2">
          Please select your mood
        </p>
      </div>

      <div class="mb-8">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Set a due time for this task
        </label>
        <input
          v-model="task.dateStart"
          type="datetime-local"
          class="w-full px-4 text-sm py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          :max="task.dateEnd"
        />

        <input
          v-model="task.dateEnd"
          type="datetime-local"
          :min="task.dateStart"
          class="w-full px-4 text-sm py-3 mt-1 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
      </div>

      <button
        @click="addTask"
        :disabled="
          !(task.dateEnd && task.dateEnd) ||
          !task.title.trim() ||
          !task.mood === 0
        "
        :class="[
          'w-full py-2 text-sm rounded-xl font-medium transition-colors',
          !(task.dateEnd && task.dateEnd) ||
          !task.title.trim() ||
          !task.mood === 0
            ? 'bg-secondary/30 text-primary hover:bg-slate-700'
            : 'bg-secondary text-primary cursor-not-allowed',
        ]"
      >
        Add a task
      </button>
    </div>
  </div>
</template>
