<template>
  <div
    v-if="isLoading"
    class="flex flex-col justify-center content-center text-center w-screen p-2"
  >
    <div class="mb-4">
      <p class="text-xl">Wellcome to</p>
      <p class="text-4xl font-bold my-4">DigitalWriters.<span class="text-rose-700">ART</span></p>
    </div>
    <div class="mt-4">
      <div class="flex justify-center">
        <semipolar-spinner :animation-duration="2000" :size="65" color="#CD162C" />
      </div>
      <p>Loading app...</p>
    </div>
  </div>
  <div 
    v-else
    class="flex justify-center h-full max-h-full"
  >
    <div class="flex flex-col content-start h-full max-h-full max-w-screen-md w-full px-2">
      <!-- Chat editor title -->
      <div class="">
        <EditorTitleInput 
          class="w-full" 
          :text="title" 
          @blur-editor="titleChangeHandler"
        />
      </div>


      <!-- Chat Editor messages -->
      <div class="bg-rose-100 p-4 h-full max-h-full overflow-auto overscroll-none">
        <div v-for="(message, index) in messages" :key="index">
          <EditorBubbleInput :text="message"/>
        </div>
      </div>

      <!-- Chat editor input -->
      <div class="">
        <ChatInput @send-message="messageHandler"/>      
      </div>

    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, type Ref} from 'vue';
import EditorTitleInput from '../commons/EditorTitleInput.vue';
import EditorBubbleInput from '../commons/EditorBubbleInput.vue';
import ChatInput from '../commons/ChatInput.vue';
import { SemipolarSpinner } from 'epic-spinners';
import type { Delta } from '@vueup/vue-quill';

import { useTexts } from '../../composable/useTexts';

//check if data is loading...

// --> DATA
const isLoading = ref(false);
const title: Ref<Delta | undefined> = ref();
const messages: Ref<string[]> = ref([]);

// --> INIT


// --> METHODS
const titleChangeHandler = (content: Delta) => {
  console.log('content', content);
}

const messageHandler = (message: string) => {
  messages.value.push(message);
}


</script>

<style scoped></style>
