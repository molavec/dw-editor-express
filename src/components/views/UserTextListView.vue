<template>
  <div class="p-2">
    <ContentHeader :title="TITLE" :buttonText="BUTTON_TEXT" @button-click="newTextHandler" />
    <!-- Loading data screen -->
    <div
      v-if="isLoading"
      class="flex text-center flex-col justify-center content-center w-screen min-h-[50vh] p-2"
    >
      <div class="mb-4">
        <p class="text-xl">Your texts are comming!</p>
        <p class="text-4xl font-bold my-4">Digital Writers NFT</p>
      </div>
      <div class="mt-4">
        <div class="flex justify-center">
          <semipolar-spinner :animation-duration="2000" :size="65" color="#000000" />
        </div>
        <p>Loading texts...</p>
      </div>
    </div>
    <!-- Card texts list -->
    <div v-else class="p-4">
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
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTexts } from '../../composable/useTexts';
import router from '../../router';
import ContentHeader from '../commons/ContentHeader.vue';
import TextCard from '../commons/TextCard.vue';
import { SemipolarSpinner } from 'epic-spinners';
// import { isUserLogged } from '../../firebase/auth';
import { useActiveUser } from '../../composable/useActiveUser';

const TITLE = 'My Texts';
const BUTTON_TEXT = 'New text';

const isLoading = ref(true);

const { getActiveUser } = useActiveUser();
const { getTextList, updateTextListFromDB, clearActiveText } = useTexts();
const texts = getTextList();

// console.log('texts', texts.value);

const newTextHandler = () => {
  router.push('/edit');
};

// call all text from firestore only if file is empty the store
const loadData = async () => {
  // clearActiveText
  clearActiveText();

  //1. check if user is Logged
  // isUserLogged(async (isLogged: boolean) => {
  //   if (isLogged) {
  //     // it checks if id of user is available, else watch for it
  //     if (getActiveUser().value?.id) {
  //       await updateTextListFromDB();
  //       isLoading.value = false;
  //     } else {
  //       watch(getActiveUser(), async () => {
  //         await updateTextListFromDB();
  //         isLoading.value = false;
  //       });
  //     }
  //   } else {
  //     router.push('/login');
  //   }
  // });
};
loadData();
</script>

<style scoped></style>
