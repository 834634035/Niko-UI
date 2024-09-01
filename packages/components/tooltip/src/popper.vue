<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { nextTick, provide, reactive, ref } from "vue";
import { POPPER_INJECTION_KEY, NkPopperInjectionContext } from "./constants";

defineOptions({
  name: "NkTestPopper",
});

const triggerRef = ref<HTMLElement>();
const isEnter = ref<Boolean>(false);
const position = reactive({
  left: 0,
  top: 0,
});

const popperProvides = {
  triggerRef,
  isEnter,
  position,
} as NkPopperInjectionContext;
provide(POPPER_INJECTION_KEY, popperProvides);
</script>
