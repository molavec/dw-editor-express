<template>
  <div class="flex items-center" @click="toggleIcon">
    <svg v-if="isChatIcon" class="w-6 h-6 text-rose-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.314 3.686c-3.905-3.905-10.237-3.905-14.143 0-3.905 3.905-3.905 10.237 0 14.143m3.536-9.899v3h-3.536l-4 4v-4h-3.536v-3.536h3.536v-4l4 4z"/>
    </svg>
    <svg v-else class="w-6 h-6 text-rose-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M13 2l7 7-7 7M5 9h9a3 3 0 013 3v8a3 3 0 01-3 3H5a3 3 0 01-3-3V12a3 3 0 013-3z"/>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isChatIcon = ref(true);

const toggleIcon = () => {
  isChatIcon.value = !isChatIcon.value;
};

</script>

<style scoped>
/* Add any additional styling here */
</style>
