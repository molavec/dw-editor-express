<template>
  <div class="h-screen flex flex-col">
    <top-bar-app />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TopBarApp from './components/combined/TopBarApp.vue';
import PropsTest from './components/commons/PropsTest.vue';

const valor = ref(0);

const addHandler = () => {
  valor.value++;
};
</script>

<style scoped></style> 
