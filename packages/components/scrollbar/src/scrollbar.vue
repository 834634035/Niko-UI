<template>
  <div ref="scrollbarRef" :class="bem.b()" :style="styles">
    <div
      ref="contentRef"
      :class="classes"
      @scroll="handleScroll"
    >
      <component ref="viewRef" :is="tag">
        <slot></slot>
      </component>
    </div>

    <template v-if="!native">
      <Bar
        v-if="rightBarShow"
        :always="alwaysStatus"
        type="right"
        :size="minSize"
        :scrollTop="scrollTop"
      ></Bar>
      <Bar
        v-if="bottomBarShow"
        :always="alwaysStatus"
        type="bottom"
        :size="minSize"
        :scrollLeft="scrollLeft"
      ></Bar>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { computed, ref, watch, provide, reactive, onMounted } from "vue";
import { scrollbarProps } from "./scrollbar";
import Bar from "./bar.vue";
import { scrollbarContextKey } from "./constants";
defineOptions({
  name: "NkScrollbar",
});
const bem = createNamespace("scrollbar");

const props = defineProps(scrollbarProps);

const scrollbarRef = ref<HTMLDivElement>();
const contentRef = ref<HTMLDivElement>();
const viewRef = ref<HTMLElement>();
const scrollTop = ref(0);
const scrollLeft = ref(0);

provide(
  scrollbarContextKey,
  reactive({
    scrollbarElement: scrollbarRef as unknown as HTMLDivElement,
    wrapElement: contentRef as unknown as HTMLDivElement,
  })
);
const classes = computed(() => {
  return [bem.e("content"), bem.is("native", !props.native)];
});

const styles = computed(() => {
  const styleObj = {
    height: "auto",
    maxHeight: "auto",
  };
  if (props.height) {
    styleObj.height = props.height + "px";
  }
  if (props.maxHeight) {
    styleObj.maxHeight = props.maxHeight + "px";
  }
  return styleObj;
});

const rightBarShow = ref(false);
const bottomBarShow = ref(false);
onMounted(() => {
  rightBarShow.value =
    (viewRef.value as unknown as HTMLElement)?.clientHeight ===
    (viewRef.value as unknown as HTMLElement)?.offsetHeight
      ? false
      : true;
  bottomBarShow.value =
    (viewRef.value as unknown as HTMLElement)?.clientWidth ===
    (viewRef.value as unknown as HTMLElement)?.scrollWidth
      ? false
      : true;
  console.log((viewRef.value as unknown as HTMLElement)?.scrollWidth);
  console.log((viewRef.value as unknown as HTMLElement)?.clientWidth);
});

function handleScroll(e) {
  // console.log(e.target.scrollLeft)
  scrollTop.value = e.target.scrollTop;
}

// 是否总是显示滚动条--状态
const alwaysStatus = ref(props.always);

function handleMouseover(e) {
  alwaysStatus.value = true;
}
function handleMouseout(e) {
  alwaysStatus.value = false;
}
</script>
