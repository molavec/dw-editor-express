import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('esitor', () => {

  const isChatTypeActive = ref(true);
  const title = ref('');
  const content = ref('');
  const messages: Ref<string[]> = ref([]);

  const setIsChatTypeActive = (isActive: boolean) => {
    console.log(isActive);
    isChatTypeActive.value = isActive;
  }
  
  return { 
    isChatTypeActive,
    title,
    content,
    messages,
    setIsChatTypeActive }
})
