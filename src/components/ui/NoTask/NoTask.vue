<script setup lang="ts">
import { ListX } from "lucide-vue-next";
</script>

<template>
  <div class="flex mt-20 mb-15 justify-center flex-col items-center gap-2">
    <div
      class="flex items-center justify-center h-24 w-24 bg-secondary/20 rounded-full"
    >
      <ListX class="w-12 h-12 text-gray-500" />
    </div>

    <p class="text-sm font-semibold">No tasks yet</p>
    <p class="text-xs font-medium text-gray-500">
      Add your first task to get started
    </p>
  </div>
</template>

<style scoped></style>
