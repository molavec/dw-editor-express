<template>
  <top-bar-app />
  <div>
    <p>
      <button @click="addHandler">ADD ++</button>
    </p>
    <p>
      <PropsTest :valor="valor"></PropsTest>
    </p>

  </div>

  <router-view></router-view>
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
