<template>
  <component :is="tag" :class="colKls" :style="style">
    <slot></slot>
  </component>
</template>
<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { colProps } from "./col";
import { CSSProperties, computed, inject } from "vue";
import { rowContextKey } from "@niko/components/row/src/constants";

defineOptions({
  name: "nk-col",
});

const bem = createNamespace("col");

const props = defineProps(colProps);

const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) });

const style = computed(() => {
  const styles: CSSProperties = {};

  if (gutter.value) {
    styles["box-sizing"] = "border-box";
    styles["padding-right"] = `${gutter.value / 2}px`;
    styles["padding-left"] = `${gutter.value / 2}px`;
  }

  return styles;
});

const colKls = computed(() => {
  const { offset, span } = props;

  return [bem.b(), bem.m(`offset-${offset}`), bem.m(`span-${span}`)];
});
</script>
