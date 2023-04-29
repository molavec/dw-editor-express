<template>

  <div class="w-full text-center" @click="clickHandler">

    <div v-if="image" class="m-auto w-full cursor-pointer">
      <img :src="image" alt="avatar-picture" class="rounded-full h-24 w-24 m-auto"/>
      <p class="text-blue-600 underline">Actualizar</p>
    </div>

    <div v-else class="cursor-pointer">
      <PlusCircleIcon  class="m-auto w-full h-24 text-rose-600" />
      <p class="text-blue-600 underline">Añadir Avatar</p>
    </div>

    <input
      v-show="false"
      ref="imageInput"
      type="file"
      accept="image/*"
      @change="imageChange($event)">

  
  </div>
  
</template>
  
<script setup lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/24/outline';
import { ref, type Ref } from 'vue';

import {useUsers } from '../../composable/users';

const { getAuthUser, setAuthUser } = useUsers();

const props = defineProps<{
  userId: string,
  image: string | undefined,
}>();

const image = ref(props.image ? `http://localhost:3000${props.image}`: undefined );
const imageInput:  Ref<any> = ref(undefined);

const clickHandler = () => {
  if (imageInput.value) imageInput.value.click();
};

const imageChange = (event: Event) => {
  
  const target= event.target as HTMLInputElement;

  if (target.files) {
    // Alamacena path para uso en el navegador
    image.value = getObjectURL(target.files[0]);
  
    // TODO: upload in composable
    // upload image to express server
    const form = new FormData();
    form.append('file', target?.files[0]);
  
    //TODO: añadir id del usuario al post desde el URL
    form.append('id', props.userId);
  
    fetch('http://localhost:3000/user/avatar', {
      method: 'PUT',
      body: form,
    })
    .then(response => response.json())
    .then((result) => {
      console.log('res avatar', result);
      // TODO: update authInfo
      setAuthUser({ ...getAuthUser().value, ...{ image: result.image} });  
    }).catch((error)=> {
      console.log(error);
    });
  }
  
};

const getObjectURL = (file: File) => {
  let url;
  if (window.createObjectURL) { // basic
    url = window.createObjectURL(file);
  } else if (window.URL) { // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
};
  
</script>