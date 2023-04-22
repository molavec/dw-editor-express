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

const image = ref('');
const imageInput:  Ref<any> = ref(undefined)


const clickHandler = () => {
  if (imageInput.value) imageInput.value.click();
}

const imageChange = (event: Event) => {
  console.log(event);

  image.value = getObjectURL(event.target?.files[0]);

  //TODO: upload to server
  const form = new FormData();
  form.append('file', event.target?.files[0])

  fetch('http://localhost:3000/upload-avatar', {
    method: 'POST',
    body: form
  }).then((res) => {
    console.log(res)
  }).catch((error)=> {
    console.log(error)
  });

  console.log(image.value);
}

const getObjectURL = (file: File) => {
  let url
  if (window.createObjectURL) { // basic
    url = window.createObjectURL(file)
  } else if (window.URL) { // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}
  
</script>