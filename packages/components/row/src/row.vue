<template>
  <component :is="props.tag" :class="[bem.b(), rowKls]" :style="rowStyle">
    <slot></slot>
  </component>
</template>
<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { rowContextKey } from "./constants";

import { rowProps } from "./row";
import { CSSProperties, computed, provide } from "vue";

defineOptions({
  name: "nk-row",
});

const props = defineProps(rowProps);

const gutter = computed(() => {
  return props.gutter;
});

provide(rowContextKey, {
  gutter,
});

const bem = createNamespace("row");

const rowStyle = computed(() => {
  const styles:CSSProperties = {};
  if(!props.gutter){
    return styles;
  }

  // 往里缩
  styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
  return styles;
});

const rowKls = computed(() => {
  return [
    bem.is(`justify-${props.justify}`, props.justify !== "start"),
    bem.is(`align-${props.align}`, !!props.align),
  ];
});
</script>
