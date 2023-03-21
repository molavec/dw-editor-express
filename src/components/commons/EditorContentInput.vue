<template>
  <QuillEditor
    class="editor-content-input"
    :options="options"
    theme="bubble"
    @text-change="textHandler"
    @blur="blurHandler"
    @ready="readyHandler"
  />
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

import { QuillEditor, Delta } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import type { Quill, Sources } from 'quill';

const props = defineProps<{ text?: string }>();
const text = ref(props.text || undefined);

const emit = defineEmits(['textChange', 'blurEditor']);

// --> DATA
const quillEditor: Ref<Quill| undefined> = ref();

const options = {
  debug: 'error',
  placeholder: 'Your title goes here...',
  readOnly: false,
};

interface TextChangeType { delta: Delta, oldContents: Delta, source: Sources }

// --> METHODS
const textHandler = (content: TextChangeType) => {
  console.log('delta', content.delta);
  console.log('oldContents', content.oldContents);
  console.log('source', content.source);
  console.log('========================')

  // lift up text
  emit('textChange', text.value);
};

const blurHandler = (editor: Ref<Element>) => {
  console.log('editor', editor);
  console.log('========================')

  const content =  quillEditor.value?.getContents();
  console.log('content', content);
  console.log('text', quillEditor.value?.getText());
  // lift up text
  // emit('blurEditor', text.value);
};

const readyHandler = (quill: Quill) => {
  console.log('quill', quill);
  console.log('========================')

  quillEditor.value = quill;
  // lift up text
  // emit('blurEditor', text.value);
};

</script>

<style>
.editor-content-input .ql-editor {
  overflow: auto;
  resize: none;
  height: 100%;
  padding: 1rem;
  padding-bottom: 150px;
  font-size: 18px;
  color: #333333;
  margin-bottom: 50px;
}

.editor-content-input .ql-editor:focus {
  outline: none;
}
</style>
