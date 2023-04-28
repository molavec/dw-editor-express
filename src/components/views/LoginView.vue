<template>
  <!-- Main modal -->
  <div class="flex justify-center w-full h-full p-5">
    <!-- Modal content -->
    <div class="bg-white rounded-lg border-2 border-grey-300 shadow min-w-[50%]">
      <div class="py-6 px-6 lg:px-8">
        <h3 class="mb-4 text-xl font-medium text-gray-900">Sign in writer!</h3>
        <form class="space-y-6" @submit.prevent="onSubmit">
          <div>
            <label for="email" class="
              block mb-2 text-sm font-medium text-gray-900
          "
              >Your email<span class="text-red-600">*</span></label
            >
            <input
              :value="email"
              @input="(event) => (email = (event.target as HTMLInputElement).value)"
              type="email"
              name="email"
              id="email"
              class="
                bg-gray-50 border border-gray-300
                text-gray-900 text-sm rounded-lg
                focus:ring-rose-500 focus:border-rose-500 
                block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Your password<span class="text-red-600">*</span></label
            >
            <input
              :value="password"
              @input="(event) => (password = (event.target as HTMLInputElement).value)"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="
              bg-gray-50 border border-gray-300 text-gray-900
                text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 
                block w-full p-2.5"
              required
            />
          </div>
          <!-- 
          <div class="flex justify-between">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  class="
                    w-4 h-4 bg-gray-50 rounded border border-gray-300
                    focus:ring-3 focus:ring-rose-300 dark:bg-gray-600
                    dark:border-gray-500 dark:focus:ring-rose-600 
                    dark:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                for="remember"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Remember me</label
              >
            </div>
            <a href="#" class="text-sm text-rose-700 hover:underline dark:text-rose-500"
              >Lost Password?</a
            >
          </div> 
          -->
          <div class="text-red-600 text-center font-bold">
            <p class="p-2" v-if="requiredFields">Fill required fields</p>
            <p class="p-2" v-if="registerError">{{ errorMessage }}</p>
          </div>
          <button
            type="submit"
            class="
              w-full text-white bg-rose-700
            hover:bg-rose-800 focus:ring-4 focus:outline-none
            focus:ring-rose-300 font-medium rounded-lg text-sm 
              px-5 py-2.5 text-center"
          >
            Login Now
          </button>
          <div class="text-sm font-medium text-gray-500">
            Not registered?
            <router-link to="/register" class="text-rose-700 hover:underline">
              Create account
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUsers } from '../../composable/users';
import router from '../../router';
// import { signInUser } from '../../firebase/auth';
// import { useAuth } from '../../composable/useAuth';

import { useNotifications } from '../../composable/notifications';
import type UserType from '@/interfaces/UserType';

// input reactive variables
const email = ref('');
const password = ref('');

//error messages display conditions
const requiredFields = ref(false);
const registerError = ref(false);
const errorMessage = ref('');

const { appendNotification } = useNotifications();

const onSubmit = async () => {
  if (email.value === '' || password.value === '') {
    requiredFields.value = true;
    return;
  }

  try {
    //check with Google Authentication system;
    // const loginUser = await signInUser(email.value, password.value);
    // const { setAuth } = useAuth();
    // setAuth(loginUser);

    //getUser Info from firestore;
    const { signIn, setAuthUser } = useUsers();
    const result:any = await signIn(email.value, password.value);

    if(result.error){
      appendNotification(result.error);
    }

    //If all is ok, return to editor
    if(result.id) {
      appendNotification('Bienvenido!');
      const user: UserType = {
        id: result.id,
        email: result.email,
        firstname: result.firstname,
        lastname: result.lastname,
        alias: result.alias,
        image: result.image,
        token: result.token,
      };
      setAuthUser(user);
      router.push('/');
    }

    // console.log(activeUser.value);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('error',  error.code);
  }
};
</script>
