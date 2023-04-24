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
      :class="style"
    >
      <span>{{ notification.message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

const style = 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900';

const notifications = [
  {
    id: '1',
    message: 'notification 1',
    style: style,
  },
  {
    id: '2',
    message: 'notification 2',
    style: style,
  },
  {
    id: '3',
    message: 'notification 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    style: style,
  },
  {
    id: '4',
    message: 'notification 4',
    style: style,
  },
];

</script>
