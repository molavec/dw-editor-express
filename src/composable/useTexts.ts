import { storeToRefs } from 'pinia';
import { useTextStore } from '../stores/textStore';
import type TextType from '../interfaces/TextType';

export const useTexts = () => {
  const textStore = useTextStore();
  const { activeText } = storeToRefs(textStore);

  //Methods
  const getActiveText = () => {
    return activeText;
  };

  const setActiveText = (text: TextType) => {
    textStore.setActiveText(text);
  };

  const loadText = () => {
    return activeText;
  };

  const saveText = () => {
    
    textStore.setActiveText(activeText.value);
  };

  return {
    //Methods
    getActiveText,
    setActiveText,
    saveText,
    loadText,
  };
};
