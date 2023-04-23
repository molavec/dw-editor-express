<template>
  <div class="flex justify-between max-w-full">
    
    <!-- Logo -->
    <router-link to="/">
      <div class="p-2">
        <DigitalWriterLogo />
      </div>
    </router-link>

    <!-- Editor CTAs -->
    <div class="flex p-2">
      <div class="flex justify-center items-center px-2">
        <ChatDocumentSwitcher/>
      </div>
      <div class="flex justify-center items-center px-2">
        <button
          class="text-rose-700
            border-2
            border-rose-700
            hover:border-rose-800
            hover:text-rose-800
            font-medium
            rounded-full
            text-sm
            px-5
            py-2.5
            text-center
            dark:border-rose-600
            dark:hover:border-rose-700
            dark:focus:ring-rose-900"
            @click="loadHandler"
          >
          Abrir
        </button>
      </div>
      <div class="flex justify-center items-center px-2">
        <button 
          class="text-white
            bg-rose-700
            hover:bg-rose-800
            font-medium
            rounded-full
            text-sm
            px-5
            py-2.5
            text-center
            dark:bg-rose-600
            dark:hover:bg-rose-700
            dark:focus:ring-rose-900"
            @click="saveHandler"
        >
          Guardar
        </button>
      </div>
      <div class="flex justify-center items-center px-2">
        <router-link to="/profile">
          <ProfileAvatar
            :username="username"
            custom-size="36px"
            :border="false"
            bg-color="#be123c"
            image="avatar.jpg"
            text-color="#ffffff"
          />
        </router-link>
      </div>
      
    </div>

  </div>
</template>

<script setup lang="ts">
import { useTexts } from '@/composable/useTexts';
import DigitalWriterLogo from '../commons/DigitalWriterLogo.vue';
import ChatDocumentSwitcher from '../commons/ChatDocumentSwitcher.vue';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ProfileAvatar from 'vue-profile-avatar';


// -> INIT
const { loadText,  saveText } = useTexts();

// -> DATA
const username = 'username';

// -> METHODS
const loadHandler = () => {
  loadText();
};

const saveHandler = () => {
  saveText();
};

</script>
