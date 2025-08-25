<script setup lang="ts">
import Calender from "../../ui/Calender";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import type { ITask } from "../../../types/task.ts";

const selectedDate = ref("");
const tasks = useLocalStorage<ITask[]>("tasks", []);

const handleDateClick = (date: Date) => {
  selectedDate.value = date;
};
</script>

<template>
  <Calender @selected-date="handleDateClick" />

  <section>
    <div class="flex justify-between items-center">
      <h4 class="font-semibold">Tasks</h4>
    </div>
  </section>
</template>

<style scoped></style>
