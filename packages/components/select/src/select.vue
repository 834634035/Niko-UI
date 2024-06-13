<template>
  <div
    ref="selectRef"
    :class="[bem.b(), bem.is('focused', isFocused)]"
    v-click-outside:[popperRef]="handleClickOutside"
    @click="handleClick"
    @mouseenter="isMouseEnter = true"
    @mouseleave="isMouseEnter = false"
  >
    <div :class="[bem.e('content')]">
      <div :class="bem.be('input', 'wrapper')"></div>
      <div :class="[bem.e('placeholder'), bem.is('is-transparent', isFocused)]">
        <span v-if="optionsArray.length === 0"> 请选择 </span>
        <span v-if="!multiple && optionsArray.length === 1">
          {{ optionsArray[0] }}
        </span>
        <div
          v-if="multiple && optionsArray.length"
          :class="[bem.e('selection')]"
        >
          <div
            :class="[bem.e('selected-item')]"
            v-for="(item, i) in optionsArray"
            :key="i"
          >
            <span>{{ item }}</span>
            <nk-icon :color="'#a8abb2'" :size="14" @click.stop="remove(i)">
              <X></X>
            </nk-icon>
          </div>
        </div>
      </div>
    </div>
    <div :class="[bem.e('icon'), bem.is('reverse', isFocused)]">
      <nk-icon
        :color="'#a8abb2'"
        :size="14"
        @click.stop="removeAll"
        v-if="clearableShow"
      >
        <X></X>
      </nk-icon>
      <nk-icon :color="'#a8abb2'" :size="14" v-else>
        <ArrowDown></ArrowDown>
      </nk-icon>
    </div>

    <div :class="[bem.e('option')]">
      <!-- 把父元素的上下文传给子元素 -->
      <nk-popper ref="popperRef" :parentDom="selectRef" :isShow="isFocused">
        <slot></slot>
      </nk-popper>
    </div>
  </div>
</template>
<script setup lang="ts">
import { createNamespace } from "@niko/utils/create";
import { ClickOutside } from "@niko/directives";
import ArrowDown from "@niko/components/internal-icon/ArrowDown";
import {
  computed,
  provide,
  reactive,
  ref,
  onMounted,
  watch,
  nextTick,
} from "vue";
import { selectContextKey } from "./constants";
import { selectEmits, selectProps } from "./select";
import X from "@niko/components/internal-icon/x";

defineOptions({
  name: "NkSelect",
});

const vClickOutside = ClickOutside;
const bem = createNamespace("select");
const selectRef = ref<HTMLDivElement>();
const popperRef = ref<HTMLDivElement>();
const emit = defineEmits(selectEmits);
const props = defineProps(selectProps);

// const contentRef = computed(() => {
//   return popperRef.value?.popperRef;
// });

// 当前选中的label数据值
const optionsArray = reactive<Array<String>>([]);

// 传给option可供修改的值, 默认是一个数组吧
const modelValue = reactive<Array<String | Number>>([]);

// 初始化modelValue
initModelValue();

provide(
  selectContextKey,
  reactive({
    props,
    modelValue,
    optionsArray,
  })
);

// 如果option组件传递的值发生了变化
watch(
  () => modelValue,
  (newVal) => {
    if (props.multiple) {
      setModelValue(newVal);
    } else {
      setModelValue(newVal[0]);
      // 并且把下拉框关掉
      isFocused.value = false;
    }
  },
  {
    deep: true,
  }
);
// 显示的label值
watch(
  () => optionsArray,
  (newVal) => {
    // console.log("label", newVal);
  },
  {
    deep: true,
    immediate: true,
  }
);

const isMouseEnter = ref(false);
// 是否显示清除按钮
const clearableShow = computed(() => {
  return props.clearable && optionsArray.length && isMouseEnter.value;
});

// dom加载后，把父元素注入
onMounted(() => {});

// 当前是否选中
const isFocused = ref(false);

function initModelValue() {
  // 如果是多选，modelValue必须是数组
  if (props.multiple) {
    if (!Array.isArray(props.modelValue)) {
      throw new TypeError("多选情况下,modelValue必须为数组");
    } else {
      props.modelValue.forEach((item) => {
        modelValue.push(item);
      });
    }
  } else {
    if (Array.isArray(props.modelValue)) {
      throw new TypeError("非多选情况下,modelValue不可以是数组");
    } else if (
      props.modelValue !== null &&
      props.modelValue !== undefined &&
      props.modelValue !== ""
    ) {
      modelValue.push(props.modelValue);
    }
  }
}
function handleClick() {
  // 如果有选择的文字，清除
  window.getSelection()?.removeAllRanges();

  isFocused.value = !isFocused.value;
}

// 删除某一项
function remove(i) {
  optionsArray.splice(i, 1);
  modelValue.splice(i, 1);
  setModelValue(modelValue);
}

// 清除所有值
function removeAll() {
  if (props.multiple) {
    modelValue.length = 0;
    optionsArray.length = 0;
    setModelValue(modelValue);
  } else {
    setModelValue("");
  }
  isFocused.value = false;
}

function setModelValue(value) {
  // 如果是多选，必须是数组，且数组长度大于0，则更新modelValue
  if (props.multiple) {
    if (Array.isArray(value)) {
      console.log("本次赋值的value", value);
      emit("update:modelValue", value);
    }
  } else {
    if (value !== undefined && value !== null) {
      emit("update:modelValue", value);
    }
  }
}

function handleClickOutside() {
  isFocused.value = false;
}

defineExpose({
  popperRef: popperRef,
});
</script>
