<template>
  <div class="p-2">
    <ContentHeader :title="TITLE" button-text="Logout" @button-click="logoutActions" />

    <div class="space-y-6">
      <div>
        <label for="firstname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          First Name
        </label>
        <input
          :value="firstname"
          @input="(event) => (firstname = (event.target as HTMLInputElement).value)"
          type="text"
          name="firstname"
          id="firstname"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Firstname"
        />
      </div>
      <div>
        <label for="lastname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Last Name
        </label>
        <input
          :value="lastname"
          @input="(event) => (lastname = (event.target as HTMLInputElement).value)"
          type="text"
          name="lastname"
          id="lastname"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Lastname"
        />
      </div>
      <div>
        <label for="alias" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Ghost name (alias or pseudonym)
        </label>
        <input
          :value="alias"
          @input="(event) => (alias = (event.target as HTMLInputElement).value)"
          type="text"
          name="alias"
          id="alias"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Awesome Writer"
        />
      </div>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your email
        </label>
        <input
          :value="email"
          @input="(event) => (email = (event.target as HTMLInputElement).value)"
          type="email"
          name="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com"
        />
      </div>
    </div>

    <!-- Update password -->
    <!--     
    <ContentHeader class="mt-4" title="NFT Info" />
    <div class="space-y-6">
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Current Password
        </label>
        <input
          :value="currentPassword"
          @input="(event) => (currentPassword = (event.target as HTMLInputElement).value)"
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your password
        </label>
        <input
          :value="password"
          @input="(event) => (password = (event.target as HTMLInputElement).value)"
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <div>
        <label
          for="repassword"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Repeat your password
        </label>
        <input
          :value="repassword"
          @input="(event) => (repassword = (event.target as HTMLInputElement).value)"
          type="password"
          name="repassword"
          id="repassword"
          placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Change Password
      </button>
    </div> 
    -->

    <!-- NFT Info -->
    <ContentHeader class="mt-4 mb-2" title="NFT Info" />
    <div class="flex flex-col content-center p-4">
      <div class="text-center text-2xl my-4">There is not wallet connected yet</div>
      <div class="flex justify-center w-full text-center">
        <button
          type="button"
          class="flex content-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <div>
            <img src="../../assets/metatask-logo.png" alt="" class="mr-2" />
          </div>
          <div>Connect Wallet</div>
        </button>
      </div>
    </div>
  </div>

  <!-- CTAs -->
  <EditorCTAContainer>
    <!-- Back CTA -->
    <EditorCTA class="grow" :text="backText" @cta-click="clickBackHandler" />
  </EditorCTAContainer>
</template>

<script setup lang="ts">
import ContentHeader from '../commons/ContentHeader.vue';
import EditorCTAContainer from '../commons/EditorCTAContainer.vue';
import EditorCTA from '../commons/EditorCTA.vue';
import { useActiveUser } from '../../composable/useActiveUser';
// import { logoutUser } from '../../firebase/auth';
import { ref } from 'vue';
import router from '../../router';

const TITLE = 'Profile';
const backText = '< Back';

// input reactive variables
const { getActiveUser, logoutUserTasks } = useActiveUser();
const firstname = ref(getActiveUser().value?.firstname);
const lastname = ref(getActiveUser().value?.lastname);
const alias = ref(getActiveUser().value?.alias);
const email = ref(getActiveUser().value?.email);
// const password = ref('');
// const repassword = ref('');
// const currentPassword = ref('');

const clickBackHandler = () => {
  router.push('/texts');
};

const logoutActions = async () => {
  // await logoutUser();
  logoutUserTasks(); // remove user storage
  router.push('/'); // go home
};
</script>

<style scoped></style>
