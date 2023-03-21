<template>
  <div class="flex justify-between w-full p-2">
    <router-link to="/">
      <div class="flex content-center">
        <DigitalWriterLogo />
      </div>
    </router-link>
    <!-- <router-link :to="activeUser?.id !== undefined ? '/profile' : '/login'">
      <div v-if="activeUser?.image" class="flex justify-center content-center">
        <img
          class="shrink-0 p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          :src="activeUser?.image"
          alt="Bordered avatar"
        />
      </div>
      <div
        v-else-if="fullname"
        class="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600"
      >
        <span class="font-medium text-gray-600 dark:text-gray-300">{{
          fullname.substring(0, 1)
        }}</span>
      </div>
      <div
        v-else
        class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600"
      >
        <svg
          class="absolute -left-1 w-12 h-12 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </router-link> -->
  </div>
</template>

<script setup lang="ts">
import DigitalWriterLogo from '../commons/DigitalWriterLogo.vue';
import { useActiveUser } from '../../composable/useActiveUser';

// const { getActiveUser, getActiveUserFullname } = useActiveUser();
// const activeUser = getActiveUser();
// const fullname = getActiveUserFullname();
</script>
