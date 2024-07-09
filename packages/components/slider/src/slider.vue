<template>
  <div :class="[bem.b()]">
    <div :class="[bem.e('runway')]">
      <div :class="[bem.e('bar')]"></div>
      <div :class="[bem.e('button')]"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
defineOptions({
  name: "NkSlider",
});

const bem = createNamespace("slider");
</script>
