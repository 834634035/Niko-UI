<template>
  <div :class="[bem.b()]">
    <span v-for="(item, index) in max" :key="index" :class="[bem.e('item'), bem.is('disabled', disabled)]"
      @mouseenter="handleMouseenter(index + 1)" @click="handleClick(index + 1)" @mouseleave="handleMouseleave">
      <nk-icon :class="[bem.e('icon'), bem.is('hover', currentValue >= index + 1)]">
        <StarOutline v-show="currentValue < index + 1"></StarOutline>
        <Star v-show="currentValue >= index + 1"></Star>
      </nk-icon>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { rateProps, rateEmits } from "./rate";
import Star from "@niko/components/internal-icon/star";
import StarOutline from "@niko/components/internal-icon/starOutline";
import { ref } from "vue";



defineOptions({
  name: "NkRate",
});
const bem = createNamespace("rate");

const props = defineProps(rateProps);
const emits = defineEmits(rateEmits);

const currentValue = ref<number>(props.modelValue);
const hisValue = ref<number>(props.modelValue);



const handleMouseenter = (i: number) => {
  if(props.disabled) return 
  currentValue.value = i
}

const handleMouseleave = () => {
  if(props.disabled) return 
  currentValue.value = hisValue.value
}

const handleClick = (i: number) => {
  if(props.disabled) return 
  if (props.clearable && i === hisValue.value) {
    setValue(0);
  } else {
    setValue(i);
  }
}

const setValue = (value: number) => {
  hisValue.value = value;
  currentValue.value = value;
  emits('change', value)
  emits("update:modelValue", value)
}


const setCurrentValue = (value: number) => {
  hisValue.value = value;
  currentValue.value = 0;
  emits("update:modelValue", value)
}

const resetCurrentValue = () => {
  hisValue.value = 0;
  currentValue.value = 0;
  emits("update:modelValue", 0)
}

defineExpose({
  setCurrentValue,
  resetCurrentValue,
})

</script>
