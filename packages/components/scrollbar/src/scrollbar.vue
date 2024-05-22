<template>
  <div ref="scrollbarRef" :class="bem.b()" :style="styles">
    <div ref="contentRef" :class="classes" @scroll="handleScroll">
      <component ref="viewRef" :is="tag">
        <slot></slot>
      </component>
    </div>

    <template v-if="!native">
      <Bar
        v-if="rightBarShow"
        :always="always"
        type="right"
        :size="minSize"
        :scrollTop="scrollTop"
      ></Bar>
      <Bar
        v-if="bottomBarShow"
        :always="always"
        type="bottom"
        :size="minSize"
        :scrollLeft="scrollLeft"
      ></Bar>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { isObjects, isNumber } from "@niko/utils/types";
import { computed, ref, provide, reactive, onMounted } from "vue";
import { scrollbarProps, scrollbarEmits } from "./scrollbar";
import Bar from "./bar.vue";
import { scrollbarContextKey } from "./constants";
defineOptions({
  name: "NkScrollbar",
});
const bem = createNamespace("scrollbar");

const props = defineProps(scrollbarProps);
const emit = defineEmits(scrollbarEmits);

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
});

function handleScroll(e) {
  scrollTop.value = e.target.scrollTop;
  scrollLeft.value = e.target.scrollLeft;

  emit("scroll", {
    scrollTop: e.target.scrollTop,
    scrollLeft: e.target.scrollLeft,
  });
}

// 函数重载
function scrollTo(x: number, y: number): void;
function scrollTo(options: ScrollToOptions): void;
function scrollTo(arg1: unknown, arg2?: number) {
  if (isObjects(arg1)) {
    contentRef.value!.scrollTo(arg1);
  } else if (isNumber(arg1) && isNumber(arg2)) {
    contentRef.value!.scrollTo(arg1, arg2);
  }
}


function setScrollTop(value:number){
  if(!isNumber(value)){
    return 
  }
  contentRef.value!.scrollTop = value;
}

function setScrollLeft(value:number){
  if(!isNumber(value)){
    return 
  }
  contentRef.value!.scrollLeft = value;
}


// 暴露出去的方法和属性
defineExpose({
  handleScroll,
  scrollTo,
  setScrollTop,
  setScrollLeft,
  contentRef,
});
</script>
