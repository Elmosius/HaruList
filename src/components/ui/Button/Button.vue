<script setup lang="ts">
const emits = defineEmits<{
  (e: 'click'): any;
}>();

const { custom } = defineProps({
  custom: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <button @click="emits('click')" :class="[custom, 'bg-secondary hover:bg-secondary/90 dark:border dark:border-b-gray-200 text-primary px-6 py-2 rounded-xl mt-5 w-full md:w-1/2']">
    <slot></slot>
  </button>
</template>

<style scoped></style>
