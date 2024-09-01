<template>
  <OnlyChild :class="[bem.b()]">
    <slot></slot>
  </OnlyChild>
</template>

<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { triggerType } from "./trigger";
import { TOOLTIP_INJECTION_KEY } from "./constants";
import { inject, nextTick, onMounted, provide, ref } from "vue";
import { POPPER_INJECTION_KEY } from "./constants";
import { useTriggerKey } from "./useTriggerKey";

import { OnlyChild } from "./only-child.tsx";
import { POPPER_CONTENT_KEY } from '../../popper/src/constants'

defineOptions({
  name: "NkTooltipTrigger",
});

const bem = createNamespace("tooltip-trigger");

const props = defineProps(triggerType);

const { triggerRef, isEnter } = inject(POPPER_INJECTION_KEY);
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


    const bj = inject(POPPER_CONTENT_KEY)
    console.log('bj',bj)
    //  如果单击触发器并拖动，说明有可能触发器在移动，那弹出层也需要移动
    triggerRef.value.addEventListener("mousedown", mousedown);
    function mousedown() {
      window.addEventListener('mousemove', handleMousemove);
      window.addEventListener('mouseup', handleMouseUp)
    }
    function handleMousemove(event: MouseEvent) {
      // console.log('移动了')
    }
    function handleMouseUp(event: MouseEvent) {
      window.removeEventListener('mousemove', handleMousemove)
      nextTick(() => {
        window.removeEventListener('mouseup', handleMouseUp)
      })
    }
  }
});
</script>
