<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { useRoute } from 'vue-router';
const path = useRoute().path;
const darkMode = useLocalStorage('darkMode', false);
</script>

<template>
  <section :data-theme="darkMode ? 'dark' : ''" class="h-screen bg-primary dark:bg-secondary dark:text-primary px-8 py-5">
    <div class="h-full container mx-auto md:px-16 xl:px-50">
      <div class="h-full flex flex-col justify-center items-center">
        <h1 class="text-xl font-bold text-">{{ path }} not found</h1>
        <RouterLink to="/" class="text-sm text-accent mt-1 font-bold">Back to Home</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
