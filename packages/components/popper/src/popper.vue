<template>
  <Teleport to="#modals">
    <Transition name="nk-popper">
      <div :class="[bem.b()]" ref="popperRef" v-show="isShow" :style="popperRefStyles">
        <template v-if="isScroll">
          <nk-scrollbar :style="styles" maxHeight="280" tag="ul" :class="bem.e('ul')">
            <slot></slot>
          </nk-scrollbar>
        </template>
        <template v-else>
          <div :class="bem.e('content')">
            <slot></slot>
          </div>
        </template>
        <div :class="[bem.e('arrow'), bem.is('show', showArrowStatus)]" :style="arrowStyle"></div>
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
import { computed, inject, nextTick, onBeforeUnmount, onDeactivated, onMounted, provide, reactive, ref, watch } from "vue";
import { POPPER_CONTENT_KEY } from './constants'
import { updata, test } from "./composables/usePopper";
import { POPPER_INJECTION_KEY } from "../../tooltip/src/constants";

const bem = createNamespace("popper");

const props = defineProps(popperProps);

const popperRef = ref<HTMLDivElement>();

const minWidth = ref(0);
const styles = computed(() => {
  return {
    minWidth: minWidth.value + "px",
  };
});

const posi = reactive({
  left: 0,
  top: 0,
});

const popperRefStyles = computed(() => {
  return {
    position: "absolute",
    left: posi.left + "px",
    top: posi.top + "px",
  };
});

// 箭头定位
const arrowStyle = computed(() => {
  return {
    position: "absolute",
    left: minWidth.value / 2 + "px",
    transform: "translateX(-50%)",
  };
});

const showArrowStatus = ref(true);
const resizeObserverRef = ref();
const mutationObserver = ref();

// 如果是toopltip进来的
const obj = inject(POPPER_INJECTION_KEY);

if (obj) {
  obj.position = posi
}

provide(POPPER_CONTENT_KEY, {
  posi,
  minWidth,
  resizeObserverRef
})

nextTick(() => {

  // 判断dom是不是根据body定位的
  if (props.parentDom?.offsetParent === document.body) {
    let width = props.parentDom?.offsetWidth;
    minWidth.value = width ? width : 0;
    posi.left = props.parentDom?.offsetLeft;
    posi.top = props.parentDom?.offsetTop + props.parentDom?.offsetHeight + 10;

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
    myObserver.observe(props.parentDom as HTMLElement);
    resizeObserverRef.value = myObserver;
  } else {
    updata(props.parentDom as HTMLElement, posi, minWidth, resizeObserverRef, mutationObserver)

  }


});

onBeforeUnmount(() => {
  if (resizeObserverRef.value) {
    resizeObserverRef.value?.disconnect()
  }
  if (mutationObserver.value) {
    mutationObserver.value?.disconnect()
    mutationObserver.value = null;
  }
})
defineExpose({
  popperRef,
});
</script>
