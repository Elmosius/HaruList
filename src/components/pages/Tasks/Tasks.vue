<script setup lang="ts">
import Calender from "../../ui/Calender";
import { computed, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { Plus } from "lucide-vue-next";
import type { ITask } from "../../../types/task.ts";
import TodayTask from "../../ui/TodayTask";
import { formatDate, isNowInRange } from "../../../utils/date.ts";
import ModalCreate from "../../ui/ModalCreate";

const selectedDate = ref<Date>();
const tasks = useLocalStorage<ITask[]>("tasks", []);

const handleDateClick = (date: Date) => {
  selectedDate.value = date;
};

const filteredTasks = computed(() => {
  if (!selectedDate.value)
    return tasks.value.filter((task) =>
      isNowInRange(task.dateStart, task.dateEnd),
    );

  return tasks.value.filter((task) =>
    isNowInRange(task.dateStart, task.dateEnd, selectedDate.value),
  );
});

const handleStatus = (id: number) => {
  const task = tasks.value.find((task) => task.id === id);
  if (!task) return;
  task.status = task.status === "pending" ? "completed" : "pending";
};

const isOpen = ref(false);
const closeModal = () => {
  isOpen.value = false;
};

const handleAddTask = (newTask: ITask) => {
  tasks.value.push(newTask);
  isOpen.value = false;
};
</script>

<template>
  <Calender @selected-date="handleDateClick" />

  <section
    class="shadow-sm px-3 py-3 rounded-xl mt-3 dark:border dark:border-gray-200"
  >
    <div class="flex justify-between items-center py-2">
      <h4 class="font-semibold text-sm">
        {{ selectedDate ? formatDate(selectedDate) : formatDate(new Date()) }}
      </h4>

      <div class="flex items-center gap-3">
        <p class="text-xs font-semibold">{{ filteredTasks.length }} tasks</p>
        <button
          @click="isOpen = true"
          class="w-6 h-6 flex items-center justify-center bg-accent rounded-lg"
        >
          <Plus class="w-4 h-4 text-primary animate-bounce duration-3000" />
        </button>
      </div>
    </div>

    <TodayTask :tasks="filteredTasks" @handle-status="handleStatus" />

    <ModalCreate
      v-if="isOpen"
      @add-task="handleAddTask"
      @close-modal="closeModal"
    />
  </section>
</template>

<style scoped></style>
