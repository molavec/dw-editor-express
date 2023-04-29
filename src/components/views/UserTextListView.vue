<template>
  <div class="p-2">
    <ContentHeader :title="TITLE" :buttonText="BUTTON_TEXT" @button-click="newTextHandler" />
    <!-- Loading data screen -->
    <div
      v-if="isLoading"
      class="flex text-center flex-col justify-center content-center w-screen min-h-[50vh] p-2"
    >
      <div class="mb-4">
        <p class="text-xl">Your texts are loading!</p>
        <p class="text-4xl font-bold my-4">DigitalWriters.<span class="text-rose-700">ART</span></p>
      </div>
      <div class="mt-4">
        <div class="flex justify-center">
          <semipolar-spinner :animation-duration="2000" :size="65" color="#CD162C" />
        </div>
        <p>Loading texts...</p>
      </div>
    </div>
    <!-- Card texts list -->
    <div v-else class="p-4">
      
      <div v-if="texts.length > 0">
        <TextCard 
          v-for="(item, index) in texts"
          :key="item.title ? item.title.replace(/ /g, '-') : `no-title-${index}`"
          :id="item.id"
          :title="item.title"
          :content="item.content"
          :author-id="item.title"
          :isPublished="item.isPublished"
        />
      </div>

      <div v-else>
        <p>No hay textos!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import router from '../../router';
import { useTexts } from '../../composable/texts';
import { useUsers } from '../../composable/users';

import ContentHeader from '../commons/ContentHeader.vue';
import TextCard from '../commons/TextCard.vue';
import { SemipolarSpinner } from 'epic-spinners';
import type TextType from '../../interfaces/TextType';

const TITLE = 'My Texts';
const BUTTON_TEXT = 'New text';
const isLoading = ref(true);
const texts: Ref<TextType[]> = ref([]);

const { getAuthUser } = useUsers();
const { loadTextsByUserId, clearActiveText } = useTexts();

const init = async () => {
  console.log('getAuthUser().value?.id', getAuthUser().value?.id);
  if(getAuthUser().value?.id)
    texts.value = await loadTextsByUserId(getAuthUser().value?.id);
  isLoading.value = false;
  console.log('texts', texts.value);
};

init();


const newTextHandler = () => {
  router.push('/edit');
};
// call all text from firestore only if file is empty the store
clearActiveText();
</script>

<style scoped></style>