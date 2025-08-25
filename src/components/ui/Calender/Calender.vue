<script setup lang="ts">
import {
  formatDate,
  useFormattedMonth,
  useFormattedYear,
} from "../../../utils/date.ts";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { days, months } from "./calender.ts";
import { computed, ref } from "vue";

const now = formatDate(new Date()).value;
const monthCurrent = ref(useFormattedMonth().value);
const yearCurrent = ref(useFormattedYear().value);
const dateSelected = ref("");

function handleSelectedDate(date: Date) {
  console.log(now === date);
  dateSelected.value = date;
  emit("selectedDate", date);
}

const emit = defineEmits<{
  (e: "selectedDate", date: Date): void;
}>();

const prevMonth = () => {
  if (monthCurrent.value === 1) {
    monthCurrent.value = 12;
    yearCurrent.value--;
  } else {
    monthCurrent.value--;
  }
};

const nextMonth = () => {
  if (monthCurrent.value === 12) {
    monthCurrent.value = 1;
    yearCurrent.value++;
  } else {
    monthCurrent.value++;
  }
};

const calendarDates = computed(() => {
  const monthIndex = monthCurrent.value - 1;
  const firstOfMonth = new Date(yearCurrent.value, monthIndex, 1);
  const offset = (firstOfMonth.getDay() + 6) % 7;
  const start = new Date(firstOfMonth);
  start.setHours(0, 0, 0, 0);
  start.setDate(1 - offset);

  const out = [];
  for (let i = 0; i < 35; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    out.push({
      date: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
      isCurrentMonth: d.getMonth() === monthIndex,
      fullDate: d,
    });
  }
  return out;
});
</script>

<template>
  <section class="shadow-sm py-3 rounded-xl">
    <!-- Header -->
    <div class="text-center flex items-center justify-evenly gap-2 mb-5">
      <button
        @click="prevMonth"
        class="flex items-center justify-center w-6 h-6 bg-secondary/20 rounded-full"
      >
        <ChevronLeft class="w-4 h-4" />
      </button>
      <h2 class="text-lg font-bold text-secondary">
        {{ months[monthCurrent - 1] }} {{ yearCurrent }}
      </h2>
      <button
        @click="nextMonth"
        class="flex items-center justify-center w-6 h-6 bg-secondary/20 rounded-full"
      >
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>

    <div class="overflow-x-auto">
      <div class="px-4">
        <!-- hari -->
        <div
          class="grid grid-cols-7 gap-x-5 text-sm text-secondary text-center"
        >
          <div v-for="(day, i) in days" :key="i">
            {{ day }}
          </div>
        </div>

        <!-- Tanggal -->
        <div
          class="grid grid-cols-7 mt-5 gap-x-5 gap-y-5 text-sm text-secondary text-center"
        >
          <div
            v-for="(date, i) in calendarDates"
            :key="i"
            @click="handleSelectedDate(date.fullDate)"
            :class="[
              now === formatDate(date.fullDate).value
                ? 'bg-accent text-white'
                : '',
              dateSelected === date.fullDate ? 'bg-secondary text-white' : '',
              date.isCurrentMonth ? 'text-secondary' : 'text-secondary/40',
              'w-8 h-8 mx-auto flex items-center justify-center rounded-full',
            ]"
          >
            {{ date.date }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
