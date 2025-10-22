<script setup lang="ts">
import { Check, Clock8 } from "lucide-vue-next";
import { getGreeting, useFormattedDateNow } from "../../../utils/date.ts";
import type { ITask } from "../../../types/task.ts";
import { computed } from "vue";

const now = useFormattedDateNow();
const greet = getGreeting();

const { tasks } = defineProps<{
  tasks: ITask[];
}>();

const completedTasks = computed(
  () => tasks.filter((task) => task.status === "completed").length,
);
</script>

<template>
  <section>
    <div>
      <h2 class="text-2xl font-semibold">
        {{ greet }}
        <span class="font-semibold text-accent">!</span>
      </h2>
      <p class="text-sm">Today's {{ now }}</p>
    </div>

    <div class="flex justify-between mt-8 gap-4">
      <div class="p-6 shadow-sm border border-gray-200 rounded-2xl w-full">
        <div class="flex items-center justify-between">
          <h3>{{ completedTasks }}</h3>
          <div
            class="rounded-lg bg-accent/20 w-6 h-6 flex items-center justify-center"
          >
            <Check class="w-4 h-4 text-accent" />
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-1 dark:text-primary">Completed</p>
      </div>

      <div class="p-6 shadow-sm border border-gray-200 rounded-2xl w-full">
        <div class="flex items-center justify-between">
          <h3>{{ tasks.length - completedTasks }}</h3>
          <div
            class="rounded-lg bg-secondary/20 w-6 h-6 flex items-center justify-center dark:bg-primary/20"
          >
            <Clock8 class="w-4 h-4 text-secondary dark:text-primary" />
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-1 dark:text-primary">Pending</p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
