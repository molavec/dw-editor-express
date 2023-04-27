import { storeToRefs } from 'pinia';
import { useEditorStore } from '../stores/editorStore';

export const useTexts = () => {
  const isChatTypeStore  = useEditorStore();
  const { isChatTypeActive, title, content, messages } = storeToRefs(isChatTypeStore);

  //Methods
  const loadText = () => {
    const requestOptions = {
      method: 'GET',
    };
    
    fetch('http://localhost:3000/text', requestOptions)
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

  const saveText = () => {

    if(isChatTypeActive) {
      content.value = messages.value.join('\n');
    }

    const data = {
      title: title.value,
      content: content.value,
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

  return {
    saveText,
    loadText,
  };
};
