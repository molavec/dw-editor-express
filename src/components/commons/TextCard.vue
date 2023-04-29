<template>
  <div class="border-2 rounded-lg my-4">
    <!-- Caerd Content -->
    <div class="p-2">
      <h1 class="text-xl font-bold">{{ title }}</h1>
      <p class="text-md py-2">{{ `${content ? content.substring(0, 120) : ''}...` }}</p>
      <p>
        <span
          v-if="isPublished"
          class="
            bg-green-100 text-green-800 
            text-xs font-semibold 
            mr-2 px-2.5 py-0.5 rounded"
        >
          Published
        </span>
        <span
          v-else
          class="
            bg-rose-100 text-rose-800
            text-xs font-semibold 
            mr-2 px-2.5 py-0.5 rounded"
        >
          Draft
        </span>
      </p>
    </div>
    <!-- CTAs -->

    <!-- if: isPublished -->
    <div v-if="isPublished" class="flex flex-row justify-end mt-1 border-t-2">
      <!-- 
      <a href="#" class="grow">
        <div class="flex justify-center justify-items-center p-2 border-r-2">
          <p class="text-rose-600">Duplicate</p>
        </div>
      </a>
       -->
      <router-link :to="`/text/${id}`" class="grow">
        <div class="flex justify-center justify-items-center p-2">
          <p class="text-rose-600">Info</p>
        </div>
      </router-link>
    </div>

    <!-- else: -->
    <div v-else class="flex flex-row justify-end mt-1 border-t-2">
      <!-- Delete button -->
      <!-- <a href="#" class="grow">
        <div class="flex justify-center justify-items-center p-2 border-r-2">
          <p class="text-red-600">Delete</p>
        </div>
      </a> -->
      <!-- info button -->
      <!-- <a href="#" class="grow">
        <div class="flex justify-center justify-items-center p-2 border-r-2">
          <p class="text-rose-600">Info</p>
        </div>
      </a> -->

      <!-- Delete button -->
      <router-link :to="`/edit/${id}`" class="grow">
        <div class="flex justify-center justify-items-center p-2">
          <p class="text-rose-600">Edit</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: number | undefined;
  title: string | undefined;
  content: string | undefined;
  authorId: string | undefined;
  isPublished: boolean | undefined;
}>();
</script>