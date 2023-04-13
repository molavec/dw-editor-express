<template>
  <input
    class="editor-title"
    @blur="blurHandler"
  />
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';


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

const blurHandler = () => {
  content.value = quillEditor.value?.getContents();
  emit('blurEditor', content.value);
};

</script>

<style>
.editor-title {
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

.editor-title:focus {
  font-family: Inter, Arial, Helvetica, sans-serif;
  outline: none;
}
</style>
