<template>
  <a :href="href" :target="target" :class="classList">
    <slot></slot>
  </a>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { linkProps } from "./link";
import { createNamespace } from "@niko/utils/create";
defineOptions({
  name: "NkLink", 
});
const bem = createNamespace("link");

const props = defineProps(linkProps);


const classList = computed(() => {
  return [
    bem.b(),
    bem.m(props.type),
    bem.is('underline',props.underline),
    bem.is('disabled',props.disabled),
  ];
});

</script>
