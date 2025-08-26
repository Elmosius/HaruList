<script setup lang="ts">
import Calender from "../../ui/Calender";
import { computed, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import type { ITask } from "../../../types/task.ts";
import TodayTask from "../../ui/TodayTask";
import { formatDate, isNowInRange } from "../../../utils/date.ts";

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
</script>

<template>
  <Calender @selected-date="handleDateClick" />

  <section class="shadow-sm px-3 py-3 rounded-xl mt-3">
    <div class="flex justify-between items-center py-2">
      <h4 class="font-semibold text-sm">
        {{ selectedDate ? formatDate(selectedDate) : formatDate(new Date()) }}
      </h4>
      <p class="text-xs font-semibold">{{ filteredTasks.length }} tasks</p>
    </div>

    <TodayTask :tasks="filteredTasks" @handle-status="handleStatus" />
  </section>
</template>

<style scoped></style>
