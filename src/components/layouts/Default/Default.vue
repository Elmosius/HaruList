<script setup lang="ts">
import Header from "../../ui/Header";
import Footer from "../../ui/Footer";
import FloatingNav from "../../ui/FloatingNav";
import { useLocalStorage } from "@vueuse/core";
import Loading from "../../ui/Loading";

const darkMode = useLocalStorage("darkMode", false);
</script>

<template>
  <Loading />

  <div :data-theme="darkMode ? 'dark' : ''" id="default-layout" class="hidden">
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
