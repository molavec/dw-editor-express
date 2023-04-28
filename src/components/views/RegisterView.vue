<template>
  <!-- Main modal -->
  <div class="flex justify-center w-full h-full p-5">
    <!-- Modal content -->
    <div class="bg-white rounded-lg border-2 border-grey-300 shadow min-w-[50%]">
      <div class="py-6 px-6 lg:px-8">
        <h3 class="mb-4 text-xl font-medium text-gray-900">Sign in writer!</h3>
        <form class="space-y-6" @submit.prevent="onSubmit">
          <div>
            <label
              for="firstname"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              First Name<span class="text-red-600">*</span>
            </label>
            <input
              :value="firstname"
              @input="(event) => (firstname = (event.target as HTMLInputElement).value)"
              type="text"
              name="firstname"
              id="firstname"
              class="
              bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5"
              placeholder="Firstname"
              required
            />
          </div>
          <div>
            <label
              for="lastname"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Last Name<span class="text-red-600">*</span>
            </label>
            <input
              :value="lastname"
              @input="(event) => (lastname = (event.target as HTMLInputElement).value)"
              type="text"
              name="lastname"
              id="lastname"
              class="
                bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5"
              placeholder="Lastname"
              required
            />
          </div>
          <div>
            <label for="alias" class="block mb-2 text-sm font-medium text-gray-900">
              Ghost name (alias or pseudonym)
            </label>
            <input
              :value="alias"
              @input="(event) => (alias = (event.target as HTMLInputElement).value)"
              type="text"
              name="alias"
              id="alias"
              class="
                bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5"
              placeholder="Awesome Writer"
            />
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
              Your email<span class="text-red-600">*</span>
            </label>
            <input
              :value="email"
              @input="(event) => (email = (event.target as HTMLInputElement).value)"
              type="email"
              name="email"
              id="email"
              class="
                bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password<span class="text-red-600">*</span>
            </label>
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
          <div>
            <label
              for="repassword"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Repeat your password<span class="text-red-600">*</span>
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
                text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500
                block w-full p-2.5"
              required
            />
          </div>
          <div class="text-red-600 text-center font-bold">
            <p class="p-2" v-if="requiredFields">Fill required fields</p>
            <p class="p-2" v-if="passwordsDoesNotMatch">Passwords does not Match</p>
            <p class="p-2" v-if="registerError">{{ errorMessage }}</p>
          </div>
          <button
            type="submit"
            class="
              w-full text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 
              focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm
              px-5 py-2.5 text-center"
          >
            Create Account
          </button>
          <div class="text-sm font-medium text-gray-500">
            Already registered?
            <router-link to="/login" class="text-rose-700 hover:underline">
              Sign in
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
// import { SignUpUser } from '../../firebase/auth';
// import { useAuth } from '../../composable/useAuth';

import { useNotifications } from '../../composable/notifications';
import type UserType from '@/interfaces/UserType';

// input reactive variables
const firstname = ref('');
const lastname = ref('');
const alias = ref('');
const email = ref('');
const password = ref('');
const repassword = ref('');

//error messages display conditions
const requiredFields = ref(false);
const passwordsDoesNotMatch = ref(false);
const registerError = ref(false);
const errorMessage = ref('');

const { appendNotification } = useNotifications();

const onSubmit = async () => {
  //Check required
  if (
    firstname.value === '' ||
    lastname.value === '' ||
    email.value === '' ||
    password.value === '' ||
    repassword.value === ''
  ) {
    //TODO: notification
    return;
  }

  if (password.value !== repassword.value) {
    //TODO: notification
    return;
  }

  try {
    //Create user on Google Authentication system;
    // const authUser = await SignUpUser(email.value, password.value);
    // const { setAuth } = useAuth();
    // setAuth(authUser);

    //create user with composable function
    const { signUp, setAuthUser } = useUsers();
    const result:any = await signUp(
      email.value,
      password.value,
      firstname.value,
      lastname.value,
      alias.value,
    );

    if(result.error){
      appendNotification(result.error);
    }

    //If all is ok, return to editor
    if(result.id) {

      appendNotification('Usuario creado exitósamente!');
      
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

  } catch (error: any) {
    //TODO: notification
    console.log('error', error);
  }
};
</script>
