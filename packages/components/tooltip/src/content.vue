<template>
  <nk-popper :parentDom="triggerRef" :isShow="visible" :isScroll="false">
    <div :class="[bem.b()]" v-show="visible" ref="popperRef">
      <slot></slot>
    </div>
  </nk-popper>
</template>

<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { contentProp } from "./content";
import { POPPER_INJECTION_KEY } from "./constants";
import { inject, nextTick, onMounted, ref, watch } from "vue";
defineOptions({
  name: "NkTooltipContent",
});

const bem = createNamespace("tooltip-content");
const props = defineProps(contentProp);
const popperRef = ref<HTMLElement>();
const { triggerRef, isEnter } = inject(POPPER_INJECTION_KEY);

import { TOOLTIP_INJECTION_KEY } from "./constants";
const tooltipContext = inject(TOOLTIP_INJECTION_KEY);

onMounted(() => {

  // 这样的话，滑动到提示框内，也不会消失
  nextTick(() => {
    if (popperRef.value) {
      popperRef.value.addEventListener("mouseenter", () => {
        isEnter.value = true;
        tooltipContext?.setContentVisible(true);
      });

      popperRef.value.addEventListener("mouseleave", () => {
        // 离开的时候要做防抖
        isEnter.value = false;
        let timer = setTimeout(() => {
          if (isEnter.value === false) {
            tooltipContext?.setContentVisible(false);
          } else {
            isEnter.value = true;
          }
          clearTimeout(timer);
        }, 500);
      });
    }
  });
});
</script>
