<template>
  <div
    v-if="isLoading"
    class="flex text-center flex-col justify-center content-center w-screen min-h-[50vh] p-2"
  >
    <div class="mb-4">
      <p class="text-xl">Starting</p>
      <p class="text-4xl font-bold my-4">Digital Writers NFT</p>
    </div>
    <div class="mt-4">
      <div class="flex justify-center">
        <semipolar-spinner :animation-duration="2000" :size="65" color="#000000" />
      </div>
      <p>Loading published text...</p>
    </div>
  </div>
  <div v-else class="p-2">
    <p class="my-2">
      <span
        class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
      >
        Published
      </span>
    </p>
    <ContentHeader :title="title" />
    <div class="mt-[30px] mb-[50px] pb-[150px] px-0">
      {{ content }}
    </div>
  </div>

  <!-- CTAs -->
  <EditorCTAContainer>
    <!-- Back CTA -->
    <EditorCTA class="grow border-r-2" :text="backCTA.text" @cta-click="clickBackHandler" />
  </EditorCTAContainer>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import ContentHeader from '../commons/ContentHeader.vue';
import EditorCTAContainer from '../commons/EditorCTAContainer.vue';
import EditorCTA, { EditorCTAPropsType } from '../commons/EditorCTA.vue';
import { useRoute } from 'vue-router';
import { SemipolarSpinner } from 'epic-spinners';

import { useTexts } from '../../composable/useTexts';
import router from '../../router';

const { getActiveText, setActiveTextById, clearActiveText } = useTexts();

// REFs
const title: Ref<string | undefined> = ref('');
const content: Ref<string | undefined> = ref('');

const backCTA: Ref<EditorCTAPropsType> = ref({
  text: '< Back',
});

//check if data is loading...
const isLoading = ref(true);

const clickBackHandler = () => {
  clearActiveText();
  router.push('/');
};

// if required data is loaded first
const loadData = async () => {
  // Get text for ID as param un url
  const route = useRoute();
  if (typeof route.params.id === 'string') {
    await setActiveTextById(route.params.id);
  }

  //3. set title and content with loaded text
  title.value = getActiveText().value?.title;
  content.value = getActiveText().value?.content;

  //Data is loaded! So, change state of isLoading.
  isLoading.value = false;
};
loadData();
</script>

<style scoped></style>
