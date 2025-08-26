<script setup lang="ts">
import Header from "../../ui/Header";
import Footer from "../../ui/Footer";
import FloatingNav from "../../ui/FloatingNav";
import { useLocalStorage } from "@vueuse/core";

const darkMode = useLocalStorage("darkMode", false);
</script>

<template>
  <div :data-theme="darkMode ? 'dark' : ''">
    <Header />

    <main
      class="bg-primary dark:bg-secondary dark:text-primary min-h-screen flex flex-col px-8 py-5"
    >
      <div class="container mx-auto md:px-16 xl:px-50">
        <RouterView />
        <FloatingNav />
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped></style>
