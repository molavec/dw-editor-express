<template>
  <div class="h-screen flex flex-col">
    <top-bar-app />
    <router-view></router-view>
    <notification-area />
  </div>
</template>

<script setup lang="ts">
import TopBarApp from './components/combined/TopBarApp.vue';
import NotificationArea from './components/commons/NotificationArea.vue';
</script>

<style scoped></style> 
