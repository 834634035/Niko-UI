<template>
  <OnlyChild :class="[bem.b()]">
    <slot></slot>
  </OnlyChild>
</template>

<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { triggerType } from "./trigger";
import { TOOLTIP_INJECTION_KEY } from "./constants";
import { inject, nextTick, onMounted, ref } from "vue";
import { POPPER_INJECTION_KEY } from "./constants";
import { useTriggerKey } from "./useTriggerKey";

import { OnlyChild } from "./only-child.tsx";

defineOptions({
  name: "NkTooltipTrigger",
});

const bem = createNamespace("tooltip-trigger");

const props = defineProps(triggerType);

const { triggerRef,isEnter } = inject(POPPER_INJECTION_KEY);
useTriggerKey(triggerRef);

const tooltipContext = inject(TOOLTIP_INJECTION_KEY);

// const isEnter = ref<Boolean>(false);

onMounted(() => {
  if (triggerRef.value) {
    if (props.trigger === "hover") {
      triggerRef.value.addEventListener("mouseenter", () => {
        isEnter.value = true;
        tooltipContext?.setContentVisible(true);
      });
    } else {
      triggerRef.value.addEventListener(props.trigger, () => {
        tooltipContext?.setContentVisible(!tooltipContext?.value.value);
      });
    }
    triggerRef.value.addEventListener("mouseleave", () => {
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
</script>
