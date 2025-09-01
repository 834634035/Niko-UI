<template>
  <div :class="[bem.b()]">
    <span
      :class="[
        bem.e('sub'),
        bem.e('button'),
        bem.is('disabled', inputValue === min),
      ]"
      @click="subValue"
      >-</span
    >
    <span
      :class="[
        bem.e('add'),
        bem.e('button'),
        bem.is('disabled', inputValue === max),
      ]"
      @click="addValue"
      >+</span
    >
    <nk-input
      v-model="inputValue"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      :min="min"
      :max="max"
      :step="step"
      type="number"
    ></nk-input>
  </div>
</template>
<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { nextTick, ref, watch } from "vue";
import { inputNumberProps, inputNumberEmits } from "./inputNumber.ts";

defineOptions({
  name: "nk-inputNumber",
});
const bem = createNamespace("inputNumber");
const props = defineProps(inputNumberProps);

const emit = defineEmits(inputNumberEmits);

const inputValue = ref();
inputValue.value = props.modelValue;

// 直接加的话，js有精度问题
const addValue = () => {
  if (inputValue.value >= props.max) return;
  inputValue.value = ensurePrecision(inputValue.value);
  setInputValue();
};
const subValue = () => {
  if (inputValue.value <= props.min) return;
  inputValue.value = ensurePrecision(inputValue.value, -1);
  setInputValue();
};

const ensurePrecision = (value: number, coefficient: 1 | -1 = 1) => {
  return toPrecision(value, props.step * coefficient);
};

const toPrecision = (val, increasedValue) => {
  const str = val.toString();
  if (str.indexOf(".") !== -1) {
    let arr = str.split(".");
    let pow = Math.pow(10, arr[1].length);
    let num = Math.round(val * pow) + Math.round(increasedValue * pow);
    num = num / pow;
    return num;
  } else {
    return val + increasedValue;
  }
};

const handleInput = (value: string) => {
};

const handleFocus = (e: FocusEvent) => {
  emit("focus", e);
};
const handleBlur = (e: FocusEvent) => {
  const value = (e.target as HTMLInputElement).value;
  let num = Number(value) || 0;
  if (num <= props.min) {
    inputValue.value = props.min;
  } else if (num >= props.max) {
    inputValue.value = props.max;
  } else {
    inputValue.value = num;
  }
  emit("change", Number(inputValue.value));
  emit("blur", e);
  setInputValue();
};

const setInputValue = () => {
  let num = Number(inputValue.value);
  if (num < props.min) {
    inputValue.value = props.min;
  }
  if (num > props.max) {
    inputValue.value = props.max;
  }

  emit("update:modelValue", Number(inputValue.value));
};
</script>
