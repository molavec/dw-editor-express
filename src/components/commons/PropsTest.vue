<template>
  <div>
    <p> props.valor: {{ props.valor }} </p>
    <p> valor: {{ valor }} </p>
    <p> valueState: {{ valueState }} </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  valor: number;
}>();

const valor = ref(props.valor);
const valueState = ref(props.valor);

console.log('props.valor', props.valor);
console.log('valueState', valueState.value);

</script>