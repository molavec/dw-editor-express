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
    class="flex justify-center grow"
  >
    <div class="flex flex-col content-start max-w-screen-md w-full px-2">
      <!-- Chat editor title -->
      <div>
        <input 
          v-model="title"
          class="editor-title w-full" 
          type="text"
          placeholder="Your title here..."
        />
      </div>


      <div v-if="isChatTypeActive" class="flex flex-col justify-stretch h-full">
        <!-- Chat Editor messages -->
        <div class="grow bg-rose-100 p-4 mb-[60px] overflow-auto overscroll-auto">
          <div v-for="(message, index) in messages" :key="index">
            <EditorBubbleInput :text="message"/>
          </div>
        </div>
  
        <!-- Chat editor input -->
        <div class="flex flex-row border-2 fixed bottom-0 left-0 right-0 bg-white">
          <ChatInput @send-message="messageHandler"/>      
        </div>
      </div>

      <div v-else class="p-4 h-full max-h-[600px] overflow-auto overscroll-none">
          <!-- TODO: Cambiar por arrglo de text -->
        <textarea 
          v-model="content"
          cols="30"
          rows="10"
          placeholder="Start here"
          class="p-2 w-full h-full resize-none"
        />
      </div>

    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import EditorBubbleInput from '../commons/EditorBubbleInput.vue';
import ChatInput from '../commons/ChatInput.vue';

import { SemipolarSpinner } from 'epic-spinners';

import { storeToRefs } from 'pinia';
import { useEditorStore } from '../../stores/editorStore';

import { useRoute } from 'vue-router';
const route = useRoute();

const isChatTypeStore  = useEditorStore();
const { isChatTypeActive, id, title, content, messages } = storeToRefs(isChatTypeStore);

// --> DATA
const isLoading = ref(false);



id.value = parseInt(route.params.id);

// --> WHATCHERS
watch(isChatTypeActive, (isChatActive) => {
  if(isChatActive) {
    messages.value = content.value.split('\n');
  } else {
    content.value = messages.value.join('\n');
  };
});

// --> METHODS
const messageHandler = (message: string) => {
  messages.value.push(message);
};

</script>

<style scoped>
.editor-title {
  font-family: Inter, Arial, Helvetica, sans-serif;
  overflow: auto;
  resize: none;
  padding: 1rem;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.5rem;
  color: #333333;
  border: 0px;
}

.editor-title:focus {
  font-family: Inter, Arial, Helvetica, sans-serif;
  outline: none;
}
</style>
