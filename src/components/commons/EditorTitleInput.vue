<template>
  <QuillEditor
    class="editor-title-input"
    :options="options"
    theme="bubble"
    @text-change="changeHandler"
    @blur="blurHandler"
    @ready="readyHandler"
  />
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';

import { QuillEditor, Delta } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import type { Quill, Sources } from 'quill';


const emit = defineEmits(['textChange', 'blurEditor']);

const props = defineProps<{ text?: Delta }>();

console.log('PROPS.TEXT', props.text);

// --> DATA
const quillEditor: Ref<Quill| undefined> = ref();
// const text: Ref< string | Delta | undefined>= ref(props.text || undefined);
const content: Ref<Delta | undefined> = ref();

const text = computed(()=>{
  console.log('COMPUTED TITLE');
  return props.text;
});

const options = {
  debug: 'error',
  placeholder: 'Your title goes here...',
  readOnly: false,
};

interface TextChangeType { delta: Delta, oldContents: Delta, source: Sources }

// --> METHODS
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const changeHandler = (content: TextChangeType) => {
  // console.log('delta', content.delta);
  // console.log('oldContents', content.oldContents);
  // console.log('source', content.source);
  // console.log('========================');

  // lift up text
  emit('textChange', text.value);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const blurHandler = (editor: Ref<Element>) => {
  // console.log('editor', editor);
  // console.log('========================')

  content.value = quillEditor.value?.getContents();
  // console.log('content', content.value);
  // console.log('text', quillEditor.value?.getText());
  
  // lift up text
  emit('blurEditor', content.value);
};

const readyHandler = (quill: Quill) => {
  // console.log('quill', quill);
  // console.log('========================')

  quillEditor.value = quill;

  if (props.text) quill.setContents(props.text);

  // lift up text
  // emit('blurEditor', text.value);
};

</script>

<style>
.editor-title-input .ql-editor {
  font-family: Inter, Arial, Helvetica, sans-serif;
  overflow: auto;
  resize: none;
  padding: 1rem;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.5rem;
  color: #333333;
  border: 0px;
}

.editor-title-input .ql-editor:focus {
  font-family: Inter, Arial, Helvetica, sans-serif;
  outline: none;
}
</style>
