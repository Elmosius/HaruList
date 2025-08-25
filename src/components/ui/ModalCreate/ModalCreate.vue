<script setup lang="ts">
import { ref } from "vue";
import { moods } from "./moods.ts";
import type { ITask } from "../../../types/task.ts";

const emit = defineEmits<{
  (e: "closeModal"): void;
  (e: "addTask", task: ITask): void;
}>();

const taskName = ref("");
const selectedMood = ref(null);
const taskDate = ref("");

const addTask = () => {
  if (!taskName.value.trim()) return;

  const newTask = {
    id: Math.floor(Math.random() * 1000000),
    title: taskName.value,
    status: "pending",
    date: taskDate.value,
    mood: selectedMood.value,
  };

  emit("addTask", newTask);

  taskName.value = "";
  selectedMood.value = null;
  taskDate.value = "";

  emit("closeModal");
};
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
          v-model="taskName"
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
            @click="selectedMood = index"
            :class="[
              'w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl transition-all',
              selectedMood === index
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
          v-model="taskDate"
          type="datetime-local"
          class="w-full px-4 text-sm py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
      </div>

      <button
        @click="addTask"
        :disabled="!taskName.trim()"
        :class="[
          'w-full py-2 text-sm rounded-xl font-mediuma transition-colors',
          !taskName.trim()
            ? 'bg-secondary/30 text-primary hover:bg-slate-700'
            : 'bg-secondary text-primary cursor-not-allowed',
        ]"
      >
        Add a task
      </button>
    </div>
  </div>
</template>
