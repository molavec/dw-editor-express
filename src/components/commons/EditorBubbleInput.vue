<template>
  <div class="flex items-center mb-4">
  <div class="bg-white rounded-lg py-2 px-4 text-white">
    <p v-if="!isEditable" class="text-sm text-slate-900">{{text}}</p>
    <input 
      v-else
      :value="text"
      class="bubble"
      @input="inputHandler"
    />
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface MessageType {
  id?: string, 
  text?: string,
  date?: Date,
  author?: string,
};

const props = defineProps<MessageType>();
const text = ref(props.text);

// --> DATA
const isEditable = ref(false);

// --> METHOD
const inputHandler = () => {

};

</script>

<style></style>
