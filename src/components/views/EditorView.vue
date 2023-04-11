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

      <div class="bg-rose-100 p-4">
        <div v-for="(message, index) in messages" :key="index">
          <EditorBubbleInput :text="message"/>
        </div>
      </div>
      <ChatInput/>      
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, watch, type Ref} from 'vue';
import EditorTitleInput from '../commons/EditorTitleInput.vue';
import EditorBubbleInput from '../commons/EditorBubbleInput.vue';
import ChatInput from '../commons/ChatInput.vue';
import EditorContentInput from '../commons/EditorContentInput.vue';
import { SemipolarSpinner } from 'epic-spinners';
import type { Delta } from '@vueup/vue-quill';

import { useTexts } from '../../composable/useTexts';
import type TextType from '../../interfaces/TextType';

//check if data is loading...

// --> DATA
const isLoading = ref(false);
const title: Ref<Delta | undefined> = ref();
const content: Ref<string | undefined> = ref('Lorem ipsum lkdasjdlakjladkn aslkd aslkd alksd laks dlka sdlk alkd alkd alsk dlska dlkaj vlk;asj vkldsja df;jsa f;kljas d;klfjd sa;kfj sdak;j f;sdka fkasdj f;lksdja f;lsad f;l sdak;jf sda;kf a;sdkj ;');
const editorContent: Ref<TextType> = ref({
      id: '01',
  title: undefined,
  content: undefined,
  authorId: 'Miguel Olave',
  isPublished: true,
});

// --> INIT
const { getActiveText, setActiveText, isTextLoaded } = useTexts();


// -> WATCHERS
// watch(isTextLoaded, (value) => {
//   console.log("WATCHER", value)
//   title.value = getActiveText().value?.title;
//   content.value = getActiveText().value?.content;
//   console.log(title.value);
//   console.log(content.value);
//   // title.value = 'title';
//   // content.value = 'content';
// });


// --> METHODS
const titleChangeHandler = (content: Delta) => {
  console.log('content', content);
  editorContent.value.title = content;
  setActiveText(editorContent.value);
}

const contentChangeHandler = (content: Delta) => {
  console.log('content', content);
  editorContent.value.content = content;
  setActiveText(editorContent.value);
}
</script>

<style scoped></style>
