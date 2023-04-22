<template>

  <div class="w-full text-center">

    <div v-if="image" class="m-auto w-full">
      <img :src="image" alt="avatar-picture" class="rounded-full h-24 w-24 m-auto"/>
      <p>Actualizar</p>
    </div>

    <div v-else>
      <PlusCircleIcon class="h-24 text-rose-600 m-auto w-full" />
      <p>Añadir Avatar</p>
    </div>
  
  </div>
  
</template>
  
<script setup lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const image = ref('avatar.jpg');
  
</script>