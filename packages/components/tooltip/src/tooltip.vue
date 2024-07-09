<template>
  <nk-test-popper ref="tooltipRef">
    <nk-tooltip-trigger :trigger="trigger" :disabled="disabled">
      <slot></slot>
    </nk-tooltip-trigger>

    <nk-tooltip-content
      :visible="contentVisible"
      ref="contentRef"
      :placement="placement"
    >
      {{ content }}
    </nk-tooltip-content>
  </nk-test-popper>
</template>

<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { tooltipProps } from "./tooltip";
import nkTooltipContent from "./content.vue";
import nkTooltipTrigger from "./trigger.vue";
import nkTestPopper from "./popper.vue";
import { computed, nextTick, onMounted, provide, reactive, ref, useSlots } from "vue";
import { TOOLTIP_INJECTION_KEY } from "./constants";
defineOptions({
  name: "NkTooltip",
});

const bem = createNamespace("tooltip");
const props = defineProps(tooltipProps);

const tooltipRef = ref<HTMLDivElement>();
const contentRef = ref<HTMLDivElement>();

const contentVisible = ref<boolean>(props.visible ? true : false);

const setContentVisible = (value: boolean) => {
  contentVisible.value = value;
};

const posi = reactive({
  left: 0,
  top: 0,
});

const contentStyle = computed(() => {
  return {
    position: "absolute",
    top: posi.top + "px",
    left: posi.left + "px",
  };
});

provide(TOOLTIP_INJECTION_KEY, {
  setContentVisible,
  value: contentVisible,
});

let slot = useSlots();

onMounted(() => {
//   console.log(slot);
  nextTick(() => {
    console.log(tooltipRef);
  });
});
</script>
