<script setup lang="ts">
import Stats from '../../ui/Stats';
import { computed, ref } from 'vue';
import NoTask from '../../ui/NoTask';
import TodayTask from '../../ui/TodayTask';
import ModalCreate from '../../ui/ModalCreate';
import { useLocalStorage } from '@vueuse/core';
import type { ITask } from '../../../types/task';
import { isNowInRange } from '../../../utils/date';
import Button from '../../ui/Button';

const tasks = useLocalStorage<ITask[]>('tasks', []);
const handleStatus = (id: number) => {
  const task = tasks.value.find((task) => task.id === id);
  if (!task) return;
  task.status = task.status === 'pending' ? 'completed' : 'pending';
};

const isOpen = ref(false);
const closeModal = () => {
  isOpen.value = false;
};

const handleAddTask = (newTask: ITask) => {
  tasks.value.push(newTask);
  isOpen.value = false;
};

const filteredTasks = computed(() => tasks.value.filter((task) => isNowInRange(task.dateStart, task.dateEnd)));
</script>

<template>
  <Stats :tasks="tasks" />

  <section class="mt-5">
    <div class="flex justify-between items-center">
      <h4 class="font-semibold">Today's Tasks</h4>
      <RouterLink to="/tasks" class="text-xs text-accent mt-1 font-bold">View All</RouterLink>
    </div>

    <div>
      <TodayTask :tasks="filteredTasks" @handle-status="handleStatus" />
      <NoTask v-if="filteredTasks.length === 0" />

      <div class="flex justify-center">
        <!-- <button @click="isOpen = true" class="bg-secondary dark:border dark:border-b-gray-200 text-primary px-6 py-2 rounded-xl mt-5 w-full md:w-1/2">+ Add New Task</button> -->
        <Button @click="isOpen = true">+ Add New Task </Button>
      </div>

      <ModalCreate v-if="isOpen" @add-task="handleAddTask" @close-modal="closeModal" />
    </div>
  </section>
</template>

<style scoped></style>
