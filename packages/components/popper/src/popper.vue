<template>
  <Teleport to="#modals">
    <Transition name="nk-popper">
      <div
        :class="[bem.b()]"
        ref="popperRef"
        v-show="isShow"
        :style="popperRefStyles"
      >
        <nk-scrollbar
          :style="styles"
          maxHeight="280"
          tag="ul"
          :class="bem.e('ul')"
        >
          <slot></slot>
        </nk-scrollbar>
        <div
          :class="[bem.e('arrow'), bem.is('show', showArrowStatus)]"
          :style="arrowStyle"
        ></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
defineOptions({
  name: "NkPopper",
});
import { createNamespace } from "@niko/utils/create";
import { popperProps } from "./popper";
import {
  computed,
  inject,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect,
  watchPostEffect,
} from "vue";

const bem = createNamespace("popper");

const props = defineProps(popperProps);

const popperRef = ref<HTMLDivElement>();

const minWidth = ref(0);
const styles = computed(() => {
  let obj = {
    minWidth: minWidth.value + "px",
  };
  return obj;
});

const posi = reactive({
  left: 0,
  top: 0,
});

const popperRefStyles = computed(() => {
  let obj = {
    position: "absolute",
    left: posi.left + "px",
    top: posi.top + "px",
  };
  return obj;
});

// 箭头定位
const arrowStyle = computed(() => {
  let obj = {
    position: "absolute",
    left: minWidth.value / 2 + "px",
    transform: "translateX(-50%)",
  };
  return obj;
});

const showArrowStatus = ref(true);

nextTick(() => {
  let width = props.parentDom?.offsetWidth;
  minWidth.value = width ? width : 0;
  if (props.parentDom?.offsetWidth) {
    posi.left = props.parentDom?.offsetLeft;
    posi.top = props.parentDom?.offsetTop + props.parentDom?.offsetHeight + 10;
  }

  // 创建一个ResizeObserver对象，监听parentDom的大小变化
  const myObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      // 高度不是时刻发生变化的，不用做节流
      // 应该只用调整高度
      posi.top =
        (props.parentDom as HTMLDivElement).offsetTop +
        entry.borderBoxSize[0].blockSize +
        10;
    });
  });
  myObserver.observe(props.parentDom as Element);
});

onMounted(() => {});

defineExpose({
  popperRef,
});
</script>
