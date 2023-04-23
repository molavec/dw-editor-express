<template>
  <!-- Main modal -->
  <div class="flex justify-center w-full h-full p-5">
    <!-- Modal content -->
    <div class="bg-white rounded-lg border-2 border-grey-300 shadow dark:bg-gray-700 min-w-[50%]">
      <div class="py-6 px-6 lg:px-8">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in writer!</h3>
        <form class="space-y-6" @submit.prevent="onSubmit">
          <div>
            <label
              for="firstname"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
              dark:text-white"
              placeholder="Firstname"
              required
            />
          </div>
          <div>
            <label
              for="lastname"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 
                dark:text-white"
              placeholder="Lastname"
              required
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
              class="
                bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Awesome Writer"
            />
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label
              for="repassword"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                dark:placeholder-gray-400 dark:text-white"
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
              w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
              focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm
              px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
              dark:focus:ring-blue-800"
          >
            Create Account
          </button>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered?
            <router-link to="/login" class="text-blue-700 hover:underline dark:text-blue-500">
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
import { useActiveUser } from '../../composable/useActiveUser';
import router from '../../router';
// import { SignUpUser } from '../../firebase/auth';
import { useAuth } from '../../composable/useAuth';

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

const onSubmit = async () => {
  //Check conditions
  if (
    firstname.value === '' ||
    lastname.value === '' ||
    email.value === '' ||
    password.value === '' ||
    repassword.value === ''
  ) {
    requiredFields.value = true;
    return;
  }

  try {
    //Create user on Google Authentication system;
    // const authUser = await SignUpUser(email.value, password.value);
    // const { setAuth } = useAuth();
    // setAuth(authUser);

    //create user with composable function
    const { createUser } = useActiveUser();
    createUser(email.value, firstname.value, lastname.value, alias.value);

    //If all is ok, return to editor
    router.push('/');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    registerError.value = true;

    if (error.code === 'auth/email-already-in-use') {
      errorMessage.value = 'Email already in use.';
    } else {
      errorMessage.value = error.message;
    }
  }
};
</script>
