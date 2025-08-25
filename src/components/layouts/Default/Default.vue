<script setup lang="ts">
import Header from "../../ui/Header";
import Footer from "../../ui/Footer";
import FloatingNav from "../../ui/FloatingNav";
</script>

<template>
  <Header />

  <main class="bg-primary min-h-screen flex flex-col px-8 py-5">
    <div class="container mx-auto md:px-16 xl:px-50">
      <RouterView />
      <FloatingNav />
    </div>
  </main>

  <Footer />
</template>

<style scoped></style>
