<template>
  <div :class="[bem.b()]">
    <div :class="[bem.e('runway')]" ref="runwayRef">
      <div :class="[bem.e('bar'), bem.is('disabled', disabled)]" :style="barStyle"></div>
      <nk-tooltip :content="content.toString()" v-if="showTooltip">
        <!-- 哈哈哈 -->
        <div :class="[bem.e('button-box')]" :style="buttonStyle" ref="buttonRef" @mousedown="handleMousedown">
          <div :class="[bem.e('button'), bem.is('disabled', disabled)]">
          </div>
        </div>
      </nk-tooltip>
      <template v-else>
        <div :class="[bem.e('button-box')]" :style="buttonStyle" ref="buttonRef" @mousedown="handleMousedown">
          <div :class="[bem.e('button'), bem.is('disabled', disabled)]">
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { sliderProps, sliderEmits } from "./slider";
defineOptions({
  name: "NkSlider",
});

const bem = createNamespace("slider");
const props = defineProps(sliderProps);

const emits = defineEmits(sliderEmits)

const runwayRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)

const width = ref<number>(0)
const clickX = ref<number>(0); // 鼠标点击时的X位置
const moveX = ref<number>(0); // 鼠标移动距离
let currentPercent = 0; // 当前百分比
const beforeValue = ref<number>(0); // 缓存值，用于触发事件时比较

const content = computed(() => {
  // 需要移动的百分比
  let movePercent = moveX.value / (width.value / 100)

  // 限制范围
  let num = Math.round(currentPercent + movePercent)

  if (num < 0) {
    num = 0
  } else if (num > 100) {
    num = 100
  }
  return num || 0
})

const barStyle = computed(() => {
  return {
    width: `${content.value}%`,
  };
})
const buttonStyle = computed(() => {
  return {
    left: `${content.value}%`,
  };
})

onMounted(() => {
  width.value = runwayRef.value?.offsetWidth || 0
  console.log(buttonRef.value?.offsetLeft)
})

watch(() => content.value, (value) => {
  // console.log('有用吗22222',value)
  // console.log(buttonRef.value?.offsetLeft)
})

watch(() => buttonRef.value?.offsetLeft, () => {
  // console.log('有用吗3333')
  // console.log(buttonRef.value?.offsetLeft)
})

let originalOnSelectStart: any = null;
function handleMousedown(event: MouseEvent) {
  // 阻止冒泡
  event.stopPropagation();
  // 如果有选择的文字，清除
  window.getSelection()?.removeAllRanges();
  // 滚动的时候，不让页面选择文字
  originalOnSelectStart = document.onselectstart;
  document.onselectstart = function () {
    return false;
  };

  if (props.disabled) {
    return
  }

  clickX.value = event.pageX;
  window.addEventListener('mousemove', handleMousemove)
  window.addEventListener('mouseup', handleMouseUp)
}
function handleMousemove(event: MouseEvent) {
  // 鼠标X轴方向的移动距离
  moveX.value = event.pageX - clickX.value;

  if (beforeValue.value !== content.value) {
    emits('update:modelValue', content.value)
    emits('input', content.value)
  }
  beforeValue.value = content.value
}
function handleMouseUp(event: MouseEvent) {
  window.removeEventListener('mousemove', handleMousemove)
  nextTick(() => {
    currentPercent = content.value
    // console.log('鼠标抬起了', content.value)
    emits('change', content.value)
    window.removeEventListener('mouseup', handleMouseUp)
  })

  if (document.onselectstart !== originalOnSelectStart) {
    document.onselectstart = originalOnSelectStart;
  }
}
</script>
