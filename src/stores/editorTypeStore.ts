import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEditorTypeStore = defineStore('isChatActive', () => {

  const isChatTypeActive = ref(true);

  const setIsChatTypeActive = (isActive: boolean) => {
    console.log(isActive);
    isChatTypeActive.value = isActive;
  }
  
  return { isChatTypeActive, setIsChatTypeActive }
})
