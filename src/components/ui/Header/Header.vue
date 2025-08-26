<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ListTodo } from "lucide-vue-next";

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};
</script>

<template>
  <header
    :class="[
      'dark:bg-secondary   sticky top-0 z-50 transition-all duration-300 px-4',
      isScrolled
        ? 'bg-primary/20 backdrop-blur-xl shadow-sm shadow-gray-200 dark:shadow-gray-700'
        : 'bg-primary',
    ]"
  >
    <nav class="container mx-auto px-4 py-3 md:px-16 xl:px-30">
      <button @click="scrollToTop" class="flex items-center gap-3">
        <div
          class="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center dark:bg-primary"
        >
          <ListTodo class="w-5 h-5 text-primary dark:text-secondary" />
        </div>
        <h1 class="text-md font-semibold text-secondary dark:text-primary">
          HaruList
        </h1>
      </button>
    </nav>
  </header>
</template>

<style scoped></style>
