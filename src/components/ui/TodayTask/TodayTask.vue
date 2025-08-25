<script setup lang="ts">
import type { ITask } from "../../../types/task.ts";
import { formatTime } from "../../../utils/date.ts";
import { moods } from "../ModalCreate/moods.ts";
const { tasks } = defineProps<{
  tasks: ITask[];
}>();

const emit = defineEmits<{
  (e: "handleStatus", id: number): void;
}>();
</script>

<template>
  <div
    class="flex p-3 mt-5 rounded-xl shadow-sm border border-gray-200 justify-between items-center mb-5 cursor-pointer"
    v-for="task in tasks"
    :key="task.id"
    @click="emit('handleStatus', task.id)"
  >
    <div class="flex items-center gap-5">
      <div
        :class="[
          'rounded-full w-4 h-4 border border-secondary/30 transition-all duration-100',
          task.status === 'completed' ? 'bg-secondary/20' : '',
        ]"
      ></div>
      <h4
        :class="[
          'text-sm transition-all duration-100',
          task.status === 'completed' ? 'line-through decoration-accent' : '',
        ]"
      >
        {{ task.title }}
      </h4>
    </div>

    <div class="flex items-center gap-3">
      <p class="text-xs font-light">
        {{ formatTime(task.dateStart) }} - {{ formatTime(task.dateEnd) }}
      </p>
      <div
        class="p-2 w-2 h-2 flex items-center justify-center rounded-full bg-secondary/20"
      >
        {{ moods[task.mood] }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
