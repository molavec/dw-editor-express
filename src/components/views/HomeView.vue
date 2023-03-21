<template>
  <!--   
  <div class="p-2">
    <p><router-link to="/">/home</router-link></p>
    <p><router-link to="/edit">/edit</router-link></p>
    <p><router-link to="/text">/text</router-link></p>
    <p><router-link to="/info">/info</router-link></p>
    <p><router-link to="/texts">/texts</router-link></p>
    <p><router-link to="/profile">/profile</router-link></p>
    <p><router-link to="/login">/login</router-link></p>
    <p><router-link to="/register">/register</router-link></p>
    <p><router-link to="/connect-wallet">/connect-wallet</router-link></p>
    <p><router-link to="/publish">/publish</router-link></p>
  </div>
   -->
  <div class="flex text-center flex-col justify-center content-center w-screen min-h-[50vh] p-2">
    <div class="mb-4">
      <p class="text-xl">Wellcome to</p>
      <p class="text-4xl font-bold my-4">DigitalWriters.<span class="text-rose-700">ART</span></p>
    </div>
    <div class="mt-4">
      <div class="flex justify-center">
        <semipolar-spinner :animation-duration="2000" :size="65" color="#CD162C" />
      </div>
      <p>Loading app...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SemipolarSpinner } from 'epic-spinners';
import router from '../../router';


</script>

<style scoped></style>
