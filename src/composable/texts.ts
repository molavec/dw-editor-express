import { storeToRefs } from 'pinia';
import { useEditorStore } from '../stores/editorStore';
import type TextType from '../interfaces/TextType';


export const useTexts = () => {
  const editorStore  = useEditorStore();
  const { isChatTypeActive, id, title, content, messages } = storeToRefs(editorStore);

  const saveText = (userId: number | undefined) => {

    if(isChatTypeActive) {
      content.value = messages.value.join('\n');
    }

    const data = {
      id: id.value,
      title: title.value,
      content: content.value,
      userId: userId,
    };

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(data);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch('http://localhost:3000/text/', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  //Methods
  const loadText = (id: number) => {
    const requestOptions = {
      method: 'GET',
    };
    
    fetch(`http://localhost:3000/text/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(JSON.parse(result));
        const data = JSON.parse(result);
        title.value = data.title;
        content.value = data.content;
        messages.value = content.value.split('\n');
      })
      .catch(error => console.log('error', error));
  };

  const loadTextsByUserId = (userId: number | undefined):Promise<TextType[]> => {
    const requestOptions = {
      method: 'GET',
    };
    
    return new Promise ((resolve, reject) => {
      fetch(`http://localhost:3000/text/list/${userId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          const data = result;
          console.log('result list by user id', result);
          resolve(data);
        })
        .catch(error => reject(error));
    });
  };

  const clearActiveText = () => {
    title.value = '';
    content.value = '';
    messages.value = [];
  };

  return {
    saveText,
    loadTextsByUserId,
    loadText,
    clearActiveText,
  };
};
