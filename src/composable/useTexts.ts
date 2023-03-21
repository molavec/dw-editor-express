import { storeToRefs } from 'pinia';
import { useTextStore } from '../stores/textStore';
import type TextType from '../interfaces/TextType';

import { useActiveUser } from './useActiveUser';

export const useTexts = () => {
  const textStore = useTextStore();
  const { activeText, textList } = storeToRefs(textStore);

  const { getActiveUser } = useActiveUser();

  //Methods
  const getActiveText = () => {
    return activeText;
  };

  const getTextList = () => {
    return textList;
  };

  const updateTextListFromDB = async () => {
    //1. get text from firestore
    const activeUser = getActiveUser();
    // console.log('activeUser', activeUser.value);
    // const textList = await getTextListByAuthorId(activeUser.value?.id);
    // console.log('textList', textList);

    //2. set store
    // textStore.setTextList(textList);

    //3. return textList
    return textList;
  };

  const setActiveText = (text: TextType) => {
    textStore.setActiveText(text);
  };

  const setTextList = (textList: TextType[]) => {
    textStore.setTextList(textList);
  };

  const clearActiveText = () => {
    // console.log('CLEARING TEXT');
    textStore.clearActiveText();
  };

  const createText = async (
    title: string,
    content: string,
    authorId: string,
    isPublished: boolean,
  ) => {
    //save text in Firestore
    //const textId = await createTextDoc(title, content, authorId, isPublished);

    // const activeText: TextType = {
    //   id: textId,
    //   title: title,
    //   content: content,
    //   authorId: authorId,
    //   isPublished: isPublished,
    // };

    // // Update store
    // textStore.setActiveText(activeText);
  };

  const updateText = async (text: TextType) => {
    // Update text in Firestore
    //const textDocRef = await updateTextDoc(text);
    //console.log(textDocRef);

    // Update store
    textStore.setActiveText(text);
  };

  const setActiveTextById = async (id?: string) => {
    if (id) {
      //get user data from firestore
      //const text = await getTextById(id);

      // set active user in store
      //textStore.setActiveText(text);
      //return text;
    }
    return null;
  };

  return {
    //Properties
    activeText,
    textList,

    //Methods
    getActiveText,
    getTextList,
    setActiveText,
    setTextList,
    createText,
    updateText,
    updateTextListFromDB,
    clearActiveText,
    setActiveTextById,
  };
};