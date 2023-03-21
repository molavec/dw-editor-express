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
      <p>Loading editor...</p>
    </div>
  </div>
  <div v-else>
    <EditorTitleInput :text="title" @text-change="titleChangeHandler" />
    <EditorContentInput :text="content" @text-change="contentChangeHandler" />
  </div>
  <EditorCTAContainer :message="notificationMessage" :isDanger="isDanger">
    <!-- Cancel CTA -->
    <EditorCTA
      class="grow border-r-2"
      :text="cancelCTA.text"
      :isDanger="cancelCTA.isDanger"
      :isActive="cancelCTA.isActive"
      @cta-click="cancelHandler"
    />
    <!-- Publish CTA -->
    <EditorCTA
      class="grow border-r-2"
      :text="publishCTA.text"
      :isDanger="publishCTA.isDanger"
      :isActive="publishCTA.isActive"
      @cta-click="publishHandler"
    />
    <!-- Save CTA -->
    <EditorCTA
      class="grow"
      :text="saveCTA.text"
      :isDanger="saveCTA.isDanger"
      :isActive="saveCTA.isActive"
      @cta-click="saveHandler"
    />
  </EditorCTAContainer>

  <ModalAlert
    :message="ALERT_MESSAGE"
    primaryCTA="Login"
    secondaryCTA="Register"
    :isVisible="isModalAlertToLoginActivated"
    @click-primary="router.push('Login')"
    @click-secondary="router.push('Register')"
  />
</template>

<script setup lang="ts">
import { ref, computed, type Ref, type ComputedRef} from 'vue';
import EditorTitleInput from '../commons/EditorTitleInput.vue';
import EditorContentInput from '../commons/EditorContentInput.vue';
import EditorCTAContainer from '../commons/EditorCTAContainer.vue';
import EditorCTA, { type EditorCTAPropsType } from '../commons/EditorCTA.vue';
import ModalAlert from '../commons/ModalAlert.vue';
import router from '../../router';
import { useRoute } from 'vue-router';
import { SemipolarSpinner } from 'epic-spinners';
import type TextType from '../../interfaces/TextType';

//composables
import { useTexts } from '../../composable/useTexts';
import { useActiveUser } from '../../composable/useActiveUser';
// import { isUserLogged } from '../../firebase/auth';
// import { getPutObjectSignedURL, putObjectToStorj } from '../../oort';

const ALERT_MESSAGE =
  '<b>You should be logged to do this action!</b> <br> <b>Sign up</b> or <b>Login</b> now!';

const { getActiveText, setActiveText, createText, updateText, clearActiveText, setActiveTextById } =
  useTexts();
const { getActiveUser } = useActiveUser();

const notificationMessage: Ref<string | null> = ref(null);
const isDanger = ref(false);

//check if data is loading...
const isLoading = ref(true);

// console.log(getActiveText().value?.title);
// console.log(getActiveText().value?.content);

// REFs
const title: Ref<string | undefined> = ref('');
const content: Ref<string | undefined> = ref('');

const isCancelActive = ref(true);
const isPublishActive = ref(false);
const isSaveActive = ref(false);
const isModalAlertToLoginActivated = ref(false);

const cancelCTA: Ref<EditorCTAPropsType> = ref({
  text: 'Cancel',
  isDanger: true,
  isActive: isCancelActive,
});

const publishCTA: Ref<EditorCTAPropsType> = ref({
  text: 'Publish',
  isDanger: false,
  isActive: isPublishActive,
});

const saveCTA: Ref<EditorCTAPropsType> = ref({
  text: 'Save',
  isDanger: false,
  isActive: isSaveActive,
});

// computed
const computedText: ComputedRef<TextType> = computed(() => {
  // console.log('title', title.value);
  // console.log('content', content.value);
  return {
    id: getActiveText().value?.id,
    title: title.value,
    content: content.value,
    authorId: getActiveUser().value?.id,
    isPublished: getActiveText().value?.isPublished,
  };
});

// CTAs Handlers
const cancelHandler = () => {
  clearActiveText();
  // isUserLogged((isLogged: boolean) => {
  //   if (isLogged) {
  //     router.push('/texts');
  //   } else {
  //     router.push('/');
  //   }
  // });
};

const publishHandler = async () => {
  //TODO: save in Storj
  // note: if we can get NFT we can just send file (a TextType object) to storj just for get in hackaton XD!

  //Check if user is logged
  // isUserLogged(async (isLogged: boolean) => {
  //   try {
  //     // 1. getting TextType object
  //     const textObj = getActiveText();

  //     console.log('textObj.value.id', textObj.value?.id);
  //     if (textObj.value?.id === undefined) {
  //       notificationMessage.value = 'Save it before!';
  //       isDanger.value = true;
  //     } else if (isLogged) {
  //       notificationMessage.value = 'Posting...';

  //       // 3. Actions required to Publish NFT in future
  //       // Now Posting TextType Object sin Storj. In near future, NFT goes to Storj!! Whoojooo!
  //       //update field in text
  //       const text: TextType = {
  //         id: textObj.value?.id,
  //         title: textObj.value?.title,
  //         content: textObj.value?.content,
  //         authorId: textObj.value?.authorId,
  //         isPublished: true,
  //       };
  //       // Here Use getPutObjectSignedURL, usePutObjectFromSignedURL to push TextType object in Storj
  //       //const key = `${textObj.value?.id}-${textObj.value?.title}`;
  //       //const signedURL = await getPutObjectSignedURL(key, text);
  //       //TODO: upload text to storj
  //       const signedURL = await getPutObjectSignedURL(text);
  //       console.log(signedURL);

  //       if (signedURL) {
  //         const result = await putObjectToStorj(signedURL, text);
  //         console.log(result);
  //       }

  //       await updateText(text);
  //       notificationMessage.value = 'Text Published!';
  //       router.push(`/text/${text.id}`);
  //     } else {
  //       // Invite to Login
  //       notificationMessage.value = 'Login Required';
  //       isDanger.value = true;
  //       console.log('isModalAlertToLoginActivated.value', isModalAlertToLoginActivated.value);
  //       isModalAlertToLoginActivated.value = true;
  //       console.log('isModalAlertToLoginActivated.value', isModalAlertToLoginActivated.value);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //     notificationMessage.value = 'Error in save: Try later!';
  //     isDanger.value = true;
  //   }
  // });
};

const saveHandler = () => {
  //Check if user is logged
  // isUserLogged(async (isLogged: boolean) => {
  //   try {
  //     if (isLogged) {
  //       // Save on Firestore using composable
  //       //BUG: notification is not updated after login
  //       notificationMessage.value = 'saving...';
  //       console.log('computedText.value.id', computedText.value.id);
  //       if (computedText.value.id === undefined) {
  //         // console.log('CREATE TEXT');
  //         await createText(
  //           computedText.value.title || '',
  //           computedText.value.content || '',
  //           computedText.value.authorId || '',
  //           computedText.value.isPublished || false,
  //         );
  //         notificationMessage.value = 'saved';
  //       } else {
  //         // console.log('UPDATE TEXT');
  //         await updateText(computedText.value);
  //         notificationMessage.value = 'updated';
  //       }
  //       //deactive save button
  //       // console.log('deactive save button');
  //       isSaveActive.value = false;
  //       isPublishActive.value = true;
  //     } else {
  //       // Invite to Login
  //       notificationMessage.value = 'Login Required';
  //       isDanger.value = true;
  //       isModalAlertToLoginActivated.value = true;
  //       console.log('isModalAlertToLoginActivated.value', isModalAlertToLoginActivated.value);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //     notificationMessage.value = 'Error in save: Try later!';
  //     isDanger.value = true;
  //   }
  // });
};

const titleChangeHandler = (text: string) => {
  // get text value
  title.value = text;

  // update and publish save button if title is not null
  isSaveActive.value = title.value ? true : false;

  // check if text has id. if yes, it is saved.
  if (getActiveText().value?.id) {
    isPublishActive.value = title.value ? true : false;
  }

  // update text storage with composable
  setActiveText(computedText.value);
};

const contentChangeHandler = (text: string) => {
  // get text value
  content.value = text;

  // update and publish save button if title is not null
  isSaveActive.value = title.value ? true : false;

  // check if text has id. if yes, it is saved.
  if (getActiveText().value?.id) {
    isPublishActive.value = title.value ? true : false;
  }

  // update text storage with composable
  setActiveText(computedText.value);
};

// if required data is loaded first
const loadData = async () => {
  //1. check if user is Logged
  // isUserLogged((isLogged: boolean) => {
  //   if (!isLogged) {
  //     notificationMessage.value = 'Start Writing and Save it! 👇 ';
  //   }
  // });

  //2.  Get text for ID as param un url
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
