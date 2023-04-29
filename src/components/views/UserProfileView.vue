<template>
  <div class="p-2">

    <ContentHeader :title="TITLE" />
    <div class="space-y-6 my-6 mb-[60px]">
      <!-- image uploader -->
      <div>
        <AvatarManager v-if="id" :user-id="id" :image="image"/>
      </div>

      <div>
        <label for="firstname" class="block mb-2 text-sm font-medium text-gray-900 ">
          First Name
        </label>
        <input
          :value="firstname"
          @input="(event) => (firstname = (event.target as HTMLInputElement).value)"
          type="text"
          name="firstname"
          id="firstname"
          class="
          bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
            block w-full p-2.5"
          placeholder="Firstname"
        />
      </div>
      <div>
        <label for="lastname" class="block mb-2 text-sm font-medium text-gray-900 ">
          Last Name
        </label>
        <input
          :value="lastname"
          @input="(event) => (lastname = (event.target as HTMLInputElement).value)"
          type="text"
          name="lastname"
          id="lastname"
          class="
          bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5"
          placeholder="Lastname"
        />
      </div>
      <div>
        <label for="alias" class="block mb-2 text-sm font-medium text-gray-900 ">
          Pseudonym (alias)
        </label>
        <input
          :value="alias"
          @input="(event) => (alias = (event.target as HTMLInputElement).value)"
          type="text"
          name="alias"
          id="alias"
          class="
          bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 blockw-full p-2.5 "
          placeholder="Awesome Writer"
        />
      </div>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">
          Your email
        </label>
        <input
          :value="email"
          @input="(event) => (email = (event.target as HTMLInputElement).value)"
          type="email"
          name="email"
          id="email"
          class="
          bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5"
          placeholder="name@company.com"
        />
      </div>
    </div>

    <!-- Update password -->
    <!--     
    <ContentHeader class="mt-4" title="NFT Info" />
    <div class="space-y-6">
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">
          Current Password
        </label>
        <input
          :value="currentPassword"
          @input="(event) => (currentPassword = (event.target as HTMLInputElement).value)"
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          class="
            bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5"
          required
        />
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">
          Your password
        </label>
        <input
          :value="password"
          @input="(event) => (password = (event.target as HTMLInputElement).value)"
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          class="
            bg-gray-50 border border-gray-300 text-gray-900 text-sm
            rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5"
          required
        />
      </div>
      <div>
        <label
          for="repassword"
          class="block mb-2 text-sm font-medium text-gray-900 "
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
          class="
            bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5 "
          required
        />
      </div>
      <button
        class="
          text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
          focus:outline-none focus:ring-blue-300 font-medium rounded-lg
          text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Change Password
      </button>
    </div> 
    -->

  </div>

  <!-- CTAs -->
  <EditorCTAContainer>
    <!-- Back CTA -->
    <EditorCTA class="grow" text="< Back" @cta-click="clickBackHandler" />
    <EditorCTA class="grow" text="Save" @cta-click="clickSaveHandler" />
  </EditorCTAContainer>
</template>

<script setup lang="ts">
import ContentHeader from '../commons/ContentHeader.vue';
import EditorCTAContainer from '../commons/EditorCTAContainer.vue';
import EditorCTA from '../commons/EditorCTA.vue';
import AvatarManager from '../commons/AvatarManager.vue';

import { useNotifications } from '../../composable/notifications';

import { useUsers } from '../../composable/users';
// import { logoutUser } from '../../firebase/auth';
import { ref } from 'vue';
import router from '../../router';
import type UserType from '@/interfaces/UserType';

const TITLE = 'Profile';

// input reactive variables
const { getAuthUser, getActiveUser, setActiveUser, updateActiveUser } = useUsers();
const { appendNotification } = useNotifications();

setActiveUser(getAuthUser().value);

console.log('activeUser', getActiveUser().value);

const id = ref(getActiveUser().value?.id);
const email = ref(getActiveUser().value?.email);
const firstname = ref(getActiveUser().value?.firstname);
const lastname = ref(getActiveUser().value?.lastname);
const alias = ref(getActiveUser().value?.alias);
const image = ref(getActiveUser().value?.image);
// const password = ref('');
// const repassword = ref('');
// const currentPassword = ref('');

const clickBackHandler = () => {
  router.push('/');
};

const clickSaveHandler = async () => {
  const user: UserType = {
    id: id.value,
    email: email.value,
    firstname: firstname.value,
    lastname: lastname.value,
    alias: alias.value,
  };
  const result = await updateActiveUser(user);
  
  appendNotification('Usuario actualizado.');

};

// const logoutActions = async () => {
//   // await logoutUser();
//   logoutUserTasks(); // remove user storage
//   router.push('/'); // go home
// };
</script>

<style scoped></style>
