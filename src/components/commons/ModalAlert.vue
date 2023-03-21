<template>
  <div class="fixed top-0 left-0 right-0 z-50" :class="{ hidden: !isVisible }">
    <div
      tabindex="-1"
      class="bg-grey-500/30 flex content-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[95vh] w-full"
    >
      <div class="max-w-md mt-[100px]">
        <div class="flex content-center justify-center bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="p-6 text-center">
            <svg
              v-if="isDanger"
              aria-hidden="true"
              class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p
              class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
              v-html="message"
            ></p>
            <button
              @click="clickOnSecondaryHandler"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mr-2"
            >
              {{ secondaryCTA }}
            </button>
            <button
              @click="clickOnPrimaryHandler"
              type="button"
              class="text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              :class="{
                'bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800':
                  isDanger,
                'bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800':
                  !isDanger,
              }"
            >
              {{ primaryCTA }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  message: string;
  primaryCTA: string;
  secondaryCTA: string;
  isVisible: boolean;
  isDanger?: boolean;
}>();

const emit = defineEmits(['clickPrimary', 'clickSecondary']);

const clickOnPrimaryHandler = () => {
  emit('clickPrimary');
};

const clickOnSecondaryHandler = () => {
  emit('clickSecondary');
};
</script>
