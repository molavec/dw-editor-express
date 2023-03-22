<template>
  <div @click="isActive ? $emit('ctaClick') : ''">
    <div class="flex justify-center justify-items-center p-2">
      <p
        :class="{
          'text-blue-600 pointer': !isDanger && isActive,
          'text-red-600 pointer': isDanger && isActive,
          'text-grey-300 not-allowed': !isActive,
        }"
      >
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface EditorCTAPropsType {
  text: string;
  isDanger?: boolean;
  isActive?: boolean;
}

withDefaults(defineProps<EditorCTAPropsType>(), {
  isDanger: false,
  isActive: true,
});
</script>

<style scoped>
.not-allowed {
  cursor: not-allowed;
}
.pointer {
  cursor: pointer;
}
.disabled {
  pointer-events: none;
}
</style>
