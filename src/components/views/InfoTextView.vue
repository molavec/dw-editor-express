<template>
  <div class="p-2">
    <ContentHeader :title="TITLE" />

    <!-- Text info -->
    <p>
      <span class="font-bold">Title: </span>
      {{ title }}
    </p>
    <p>
      <span class="font-bold">Extract: </span> <br />
      {{ `${content.substring(0, 120)}...` }}
    </p>

    <!-- NFT Info -->
    <ContentHeader class="mt-4" title="NFT Info" />
    <p class="text-center">This text is not published yet</p>
  </div>

  <!-- CTAs -->
  <EditorCTAContainer>
    <!-- Back CTA -->
    <EditorCTA class="grow border-r-2" :link="backLink" :text="backText" />
  </EditorCTAContainer>
</template>

<script setup lang="ts">
import ContentHeader from '../commons/ContentHeader.vue';
import EditorCTAContainer from '../commons/EditorCTAContainer.vue';
import EditorCTA from '../commons/EditorCTA.vue';
import { ref } from 'vue';

const title = ref('Loading...');
const content = ref('Loading...');

const TITLE = 'Text Information';
const backText = '< Back';
const backLink = '#'; //TODO: Get it from vue-router
</script>

<style scoped></style>
