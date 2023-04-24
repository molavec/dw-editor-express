<template>
  <!-- notification area -->
  <div
    v-if="notifications.length > 0"
    class="flex flex-col w-full gap-4 items-center fixed bottom-[70px]"
  >
    <div
      v-for="notification in notifications" 
      :key="notification.message?.replace(/ /g, '-')"
      class="text-normal font-semibold mx-2 px-2.5 py-0.5 rounded"
      :class="notification.style"
    >
      <span>{{ notification.message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotifications } from '../../composable/notifications';

const { getNotificationsRef } = useNotifications();
const notifications = getNotificationsRef();

</script>
