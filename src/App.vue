<template>
  <div class="h-screen flex flex-col">
    <top-bar-app />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import TopBarApp from './components/combined/TopBarApp.vue';
</script>

<style scoped></style> 
