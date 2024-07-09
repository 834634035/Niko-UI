<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { nextTick, provide, ref } from "vue";
import { POPPER_INJECTION_KEY, NkPopperInjectionContext } from "./constants";

defineOptions({
  name: "NkTestPopper",
});

const triggerRef = ref<HTMLElement>();
const isEnter = ref<Boolean>(false);

const popperProvides = {
  triggerRef,
  isEnter,
} as NkPopperInjectionContext;
provide(POPPER_INJECTION_KEY, popperProvides);
</script>
