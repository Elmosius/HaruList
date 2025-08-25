<script setup lang="ts">
import Stats from "../../ui/Stats";
import { ref } from "vue";
import NoTask from "../../ui/NoTask";
import TodayTask from "../../ui/TodayTask";
import ModalCreate from "../../ui/ModalCreate";
import { useLocalStorage } from "@vueuse/core";
import type { ITask } from "../../../types/task.ts";

const tasks = useLocalStorage<ITask[]>("tasks", []);
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
  <Stats :tasks="tasks" />

  <section class="mt-5">
    <div class="flex justify-between items-center">
      <h4 class="font-semibold">Today's Tasks</h4>
      <RouterLink to="/tasks" class="text-xs text-accent mt-1 font-semibold"
        >View All</RouterLink
      >
    </div>

    <div>
      <TodayTask :tasks="tasks" @handle-status="handleStatus" />
      <NoTask v-if="tasks.length === 0" />

      <button
        @click="isOpen = true"
        class="bg-secondary text-primary px-6 py-2 rounded-xl mt-5 w-full"
      >
        + Add New Task
      </button>

      <ModalCreate
        v-if="isOpen"
        @add-task="handleAddTask"
        @close-modal="closeModal"
      />
    </div>
  </section>
</template>

<style scoped></style>
