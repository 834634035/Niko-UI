<template>
  <div
    @dragover.prevent="onDragover"
    @dragleave.prevent="isOver = false"
    @drop.prevent="onDrop"
  >
    <slot> </slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isOver = ref(false);
const emit = defineEmits({});

const onDrop = (e: DragEvent) => {
  e.stopPropagation();
  console.log(e.dataTransfer?.files);
  emit("file", Array.from(e.dataTransfer!.files));
};
const onDragover = () => {
  isOver.value = true;
};
</script>
