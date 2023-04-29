<template>
  <!-- notification area -->
  <div
    v-if="notifications.length > 0"
    class="flex justify-end space-x-4 fixed bottom-[60px] right-6"
  >
    <div v-for="notification in notifications" :key="notification.message?.replace(/ /g, '-')">
      <span
        v-if="notification.isDanger"
        class="
          text-2xl bg-red-100 text-red-800 font-semibold 
          mr-2 px-2.5 py-0.5 rounded 
          dark:bg-red-200 dark:text-red-900"
        >{{ notification.message }}</span
      >
      <span
        v-else
        class="
          text-2xl bg-green-100 text-green-800 font-semibold 
          mr-2 px-2.5 py-0.5 rounded
          dark:bg-green-200 dark:text-green-900"
        >{{ notification.message }}</span
      >
    </div>
  </div>
  <!-- CTA area -->
  <div class="flex flex-row border-2 fixed bottom-0 left-0 right-0 bg-white">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, watch } from 'vue';

export interface notificationType {
  message?: string | null;
  isDanger?: boolean | null;
}

const props = defineProps<notificationType>();

// Init
const notifications: Ref<notificationType[]> = ref([
  {
    message: props.message,
    isDanger: props.isDanger,
  },
]);
// remove notification after 3 seconds
setTimeout(() => {
  notifications.value.shift();
}, 3000);

watch(props, (props) => {
  notifications.value.push({
    message: props.message,
    isDanger: props.isDanger,
  });
  // remove notification after 3 seconds
  setTimeout(() => {
    notifications.value.shift();
  }, 3000);
});
</script>
