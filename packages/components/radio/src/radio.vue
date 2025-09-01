<template>
  <label
    for=""
    :class="[
      bem.b(),
      bem.is('checked', isChecked),
      bem.is('disabled', isDisabled),
      bem.is('border', border),
    ]"
    @click="handleClick"
  >
    <span :class="[bem.e('input')]">
      <input type="text" id="" :class="[bem.e('original')]" />
      <span :class="[bem.e('inner')]"></span>
    </span>
    <span :class="[bem.e('label')]">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { radioProps, radioEmits } from "./radio";
import { computed, inject } from "vue";
import radioGroupContextKey from "./constants";
import { RadioGroupProps } from "./radio-group";
defineOptions({
  name: "nkRadio",
});

const bem = createNamespace("radio");
const props = defineProps(radioProps);
const emit = defineEmits(radioEmits);

// 编组的父组件上下文
const radioGroupContext = inject(radioGroupContextKey);

const radioGroupValue = computed(() => {
  return (radioGroupContext?.props as RadioGroupProps)?.modelValue;
});

const isChecked = computed(() => {
  // 只要有这个上下文，那就用上下文的数据
  let val = <string | number | boolean>"";
  if (radioGroupContext) {
    val = radioGroupValue.value;
  } else {
    val = props.modelValue;
  }

  if (props.value !== undefined && props.value !== null) {
    return props.value === val;
  } else if (props.label !== undefined && props.label !== null) {
    return props.label === val;
  } else {
    return false;
  }
});

const isDisabled = computed(() => {
  if (radioGroupContext) {
    return radioGroupContext.props.disabled;
  } else {
    return props.disabled;
  }
});
// 点击了，就去改变值
const handleClick = () => {
  if (isDisabled.value) return;
  if (isChecked.value) return;
  if (radioGroupContext) {
    radioGroupContext.setValue(props.value ?? props.label);
  } else {
    emit("update:modelValue", props.value ?? props.label);
  }
  emit("change", props.value ?? props.label);
};
</script>
