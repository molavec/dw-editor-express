<template>
  <div class="flex items-center" @click="toggleIcon">
    <ChatBubbleBottomCenterIcon class="h-6 w-6 text-rose-700" v-if="isChatType" />
    <DocumentTextIcon class="h-6 w-6 text-rose-700" v-else />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChatBubbleBottomCenterIcon } from '@heroicons/vue/24/outline';
import { DocumentTextIcon } from '@heroicons/vue/24/outline';

const isChatType = ref(true);

const emit = defineEmits(['editorTypeChange']);

const toggleIcon = () => {
  isChatType.value = !isChatType.value;
  emit('editorTypeChange', isChatType.value);
};

</script>

<style scoped>
/* Add any additional styling here */
</style>
