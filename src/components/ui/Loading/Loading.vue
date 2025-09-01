<script setup lang="ts">
import { Loader } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import gsap from "gsap";

const loading = ref<HTMLElement | null>(null);
const number = { val: 0 };
const displayNumber = ref();

onMounted(() => {
  if (!loading.value) return;

  const defaultLayout = document.getElementById("default-layout");
  const sectionLoading = document.getElementById("loading");

  const tl = gsap.timeline({
    yoyo: true,
    defaults: { ease: "none" },
  });

  tl.to(number, {
    val: 100,
    duration: 2,
    onUpdate: () => {
      displayNumber.value = Math.round(number.val);
    },
    onComplete: () => {
      const loader: any = gsap.utils.toArray(".loader")[0];
      loader.classList.remove("animate-spin");
    },
  })
    .to(loading.value, {
      opacity: 0,
      y: -35,
      duration: 1,
      ease: "power1.inOut",
    })
    .to(sectionLoading, {
      backgroundColor: "#F6F4F3",
      duration: 1,
      onComplete: () => {
        sectionLoading?.classList.add("hidden");
        defaultLayout?.classList.remove("hidden");
      },
    });
});
</script>

<template>
  <section class="h-screen w-screen bg-black" id="loading">
    <div
      class="flex flex-col items-center justify-center h-screen gap-3"
      ref="loading"
    >
      <Loader class="w-4 h-4 text-white animate-spin loader" />
      <p class="text-xs text-white">{{ displayNumber }}%</p>
    </div>
  </section>
</template>

<style scoped></style>
