<template>
  <div class="flex justify-between border-b-2 border-black">
    <h1 class="text-2xl">{{ title }}</h1>
    <button
      v-if="buttonText"
      type="button"
      class="
        text-white bg-rose-600 hover:bg-rose-800 focus:ring-4
        focus:ring-rose-300 font-medium rounded-lg text-sm
        px-5 py-2.5 mr-2 mb-2"
      @click="$emit('buttonClick')"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title?: string; buttonText?: string }>();
</script>
