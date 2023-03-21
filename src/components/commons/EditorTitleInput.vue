<template>
  <!-- 
  <textarea
    class="editor-title-input"
    :value="text"
    placeholder="Your title goes here"
    @input="(event) => (text = (event.target  as HTMLTextAreaElement).value)"
  />
  -->

  <QuillEditor
    class="editor-title-input"
    :options="options"
    theme="bubble"
    @ready="quillReadyHandler"
    @text-change="textHandler"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { QuillEditor, Delta, Quill } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

const props = defineProps<{ text?: string }>();
const text = ref(props.text || '');

const emit = defineEmits(['textChange']);

//Quill init
const quillObject: Quill = ref(null);
const options = {
  debug: 'error',
  placeholder: 'Your title goes here...',
  readOnly: false,
};

// update content
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const textHandler = (delta: Delta) => {
  // console.log('delta', delta);
  // console.log('getText', quillObject.value.getText());
  text.value = quillObject.value.getText();

  // console.log('text.value from EditorTitleInput', text.value);
  // lift up text
  emit('textChange', text.value);
};

//Actions when Quill is loaded and ready
const quillReadyHandler = (quill: Quill) => {
  // Get Quill Object
  quillObject.value = quill;
  // console.log('quill', quillObject.value);

  //1. TEST: inital data
  //text.value = 'hola \nmundo';
  //2. TEST: set text
  //quillObject.value.setText(text.value);

  //Apend data from properties
  // console.log('quillReadyHandler', text.value);
  quillObject.value.setText(text.value);
};
</script>

<style>
.editor-title-input .ql-editor {
  /* font-size: 22px !important; */
  overflow: auto;
  resize: none;
  padding: 1rem;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  width: calc(100% - 1rem);
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.5rem;
  color: #333333;
  border: 0px;
  border-bottom: 1px solid #333333;
}

.editor-title-input .ql-editor:focus {
  outline: none;
  border-bottom: 2px solid #333333;
}
</style>
