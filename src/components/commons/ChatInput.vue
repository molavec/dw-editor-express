<template>
  <div class="flex justify-between items-center p-2 bg-white">
    <input
      class="w-full mr-2 p-2 rounded-lg ring-2 ring-rose-200 focus:outline-none focus:ring-rose-500"
      type="text"
      placeholder="Type a message..."
      v-model="message"
      @keyup.enter="sendMessage"
    >
    <button
      class="bg-rose-900 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded-lg"
      @click="sendMessage"
    >
      Send
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNotifications } from '../../composable/notifications';
const { appendNotification } = useNotifications();
const message = ref('');

const emit = defineEmits(['sendMessage']);

const sendMessage = () => {
  if (message.value) {
    emit('sendMessage', message.value);
    message.value = '';
    appendNotification('Mensaje enviado');
  }
};

</script>

<style scoped>
/* Add any additional styling here */
</style>
