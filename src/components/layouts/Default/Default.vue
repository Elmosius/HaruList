<script setup lang="ts">
import Header from '../../ui/Header';
import Footer from '../../ui/Footer';
import FloatingNav from '../../ui/FloatingNav';
import { useLocalStorage, useSessionStorage } from '@vueuse/core';
import Loading from '../../ui/Loading';
import { onMounted, ref } from 'vue';

const darkMode = useLocalStorage('darkMode', false);
const hasSeenIntro = useSessionStorage('hasSeenIntro', false);
const isLoading = ref(!hasSeenIntro.value);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
    hasSeenIntro.value = true;
  }, 3000);
});
</script>

<template>
  <Loading v-if="isLoading" />

  <div :data-theme="darkMode ? 'dark' : ''" id="default-layout" :class="[isLoading ? 'hidden' : 'block']">
    <Header />

    <main class="bg-primary dark:bg-secondary dark:text-primary min-h-screen flex flex-col px-8 py-5">
      <div class="container mx-auto md:px-16 xl:px-50">
        <RouterView />
        <FloatingNav />
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped></style>
