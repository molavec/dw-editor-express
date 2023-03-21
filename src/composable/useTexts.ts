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
    const requestOptions = {
      method: 'GET',
    };
    
    fetch("http://localhost:3000/load", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log('error', error));
    return activeText;
  };

  const saveText = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(getActiveText().value);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch("http://localhost:3000/save", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  return {
    //Methods
    getActiveText,
    setActiveText,
    saveText,
    loadText,
  };
};
