<template>
  <!-- notification area -->
  <div
    v-if="notifications.length > 0"
    class="flex flex-col w-full gap-4 items-center fixed bottom-[70px]"
  >
    <div
      v-for="(notification, index) in notifications"
      :key="notification.message?.replace(/ /g, '-')" 
      class="
      flex flex-row flex-nowrap gap-2
      text-normal font-semiboldmx-2
      px-2.5 py-0.5 rounded"
      :class="notification.style"
    >
      <div>
        <span>{{ notification.message }}</span>
      </div>
      <div @click="closeHandler(index)">
        <XCircleIcon  class="h-6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotifications } from '../../composable/notifications';
import { XCircleIcon } from '@heroicons/vue/24/outline';

const { getNotificationsRef } = useNotifications();
const notifications = getNotificationsRef();

const closeHandler = (index: number) => {
  notifications.value.splice(index, 1);
};
</script>
