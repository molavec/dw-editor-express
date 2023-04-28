<template>

    <p>{{ text }}</p>

</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';


const text: Ref<string | null> = ref(null);


</script>

<style></style>