<template>
  <!-- Main modal -->
  <div class="flex justify-center w-full h-full p-5">
    <!-- Modal content -->
    <div class="bg-white rounded-lg border-2 border-grey-300 shadow dark:bg-gray-700 min-w-[50%]">
      <div class="py-6 px-6 lg:px-8">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Publish as NFT</h3>
        <div class="text-center w-full">
          <p class="text-md">Are you sure about creating</p>
          <p class="text-md">{{ title }}</p>
          <p class="text-md">as NFT?</p>
          <p>Important</p>
          <p>This action is irreversible!</p>
        </div>
        <div>
          <button
            type="button"
            class="
              text-white bg-blue-700 hover:bg-blue-800
              focus:ring-4 focus:ring-blue-300 font-medium 
              rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
              dark:bg-blue-600 dark:hover:bg-blue-700
              focus:outline-none dark:focus:ring-blue-800"
          >
            Cancel
          </button>
          <button
            type="button"
            class="
            text-white bg-blue-700 hover:bg-blue-800
            focus:ring-4 focus:ring-blue-300 font-medium
            rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
            dark:bg-blue-600 dark:hover:bg-blue-700
            focus:outline-none dark:focus:ring-blue-800"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const title = 'NAME_OF_TEXT';
</script>
