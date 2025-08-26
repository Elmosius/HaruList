<script setup lang="ts">
import { ref, watch } from "vue";
import { House, ClipboardList, MoonStar, SunMedium } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useLocalStorage } from "@vueuse/core";

const router = useRouter();
const activeItem = ref(router.currentRoute.value.path);
const isDark = useLocalStorage("darkMode", false);

watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    activeItem.value = newPath;
  },
);
</script>

<template>
  <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
    <div
      class="bg-primary/20 dark:bg-secondary/20 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 px-6 py-2"
    >
      <div class="flex items-center space-x-8 mt-1">
        <RouterLink
          to="/"
          @click="activeItem = '/'"
          :class="[
            'flex flex-col items-center space-y-1 transition-all duration-100 group',
            activeItem === '/'
              ? 'text-secondary/90'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          <div class="relative dark:text-primary">
            <House
              :class="[
                'w-4 h-4 transition-transform duration-100',
                activeItem === '/' ? 'scale-110' : 'group-hover:scale-105',
              ]"
            />
            <div
              v-if="activeItem === '/'"
              class="absolute -top-1 -right-2 w-2 h-2 bg-accent rounded-full animate-pulse"
            ></div>
          </div>
          <span
            v-if="activeItem === '/'"
            class="text-xs font-semibold dark:text-primary"
            >Home</span
          >
        </RouterLink>

        <RouterLink
          to="/tasks"
          @click="activeItem = '/tasks'"
          :class="[
            'flex flex-col items-center space-y-1 transition-all duration-100 group',
            activeItem === '/tasks'
              ? 'text-secondary/90'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          <div class="relative dark:text-primary">
            <ClipboardList
              :class="[
                'w-4 h-4 transition-transform duration-100',
                activeItem === '/tasks' ? 'scale-110' : 'group-hover:scale-105',
              ]"
            />

            <div
              v-if="activeItem === '/tasks'"
              class="absolute -top-1 -right-2 w-2 h-2 bg-accent rounded-full animate-pulse"
            ></div>
          </div>
          <span
            v-if="activeItem === '/tasks'"
            class="text-xs font-semibold dark:text-primary"
            >Tasks</span
          >
        </RouterLink>

        <button
          :class="[
            'flex flex-col items-center space-y-1 transition-all duration-100 group',
            activeItem === '/tasks'
              ? 'text-secondary/90'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          <div
            class="relative dark:text-primary cursor-pointer"
            @click="isDark = !isDark"
          >
            <MoonStar
              v-if="isDark"
              class="w-4 h-4 transition-transform duration-100 group-hover:scale-105 animate-pulse"
            />
            <SunMedium
              v-else
              class="w-5 h-5 transition-transform duration-100 group-hover:scale-105 animate-pulse"
            />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
