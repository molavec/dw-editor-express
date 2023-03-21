<template>
  <div
    v-if="isLoading"
    class="flex flex-col justify-center content-center text-center w-screen min-h-[50vh] p-2"
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
    class="flex justify-center"
  >
    <div class="flex flex-col content-start max-w-screen-md w-full">
      <EditorTitleInput 
        class="w-full" 
        :text="title" 
        @blur-editor="titleChangeHandler"
      />
      <EditorContentInput 
        class="w-full" 
        :text="content" 
        @blur-editor="contentChangeHandler"
      />
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, type Ref} from 'vue';
import EditorTitleInput from '../commons/EditorTitleInput.vue';
import EditorContentInput from '../commons/EditorContentInput.vue';
import { SemipolarSpinner } from 'epic-spinners';
import type { Delta } from '@vueup/vue-quill';

import { useTexts } from '../../composable/useTexts';
import type TextType from '../../interfaces/TextType';

//check if data is loading...
const isLoading = ref(false);

// --> DATA
const title: Ref<string | undefined> = ref('');
const content: Ref<string | undefined> = ref('');
const editorContent: Ref<TextType> = ref({
  id: '01',
  title: undefined,
  content: undefined,
  authorId: 'Miguel Olave',
  isPublished: true,
});

// --> INIT
const { setActiveText } = useTexts();

// --> METHODS
const titleChangeHandler = (content: Delta) => {
  editorContent.value.title = content;
  setActiveText(editorContent.value);
}

const contentChangeHandler = (content: Delta) => {
  editorContent.value.content = content;
  setActiveText(editorContent.value);
}
</script>

<style scoped></style>
