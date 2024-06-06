<template>
  <li :class="[bem.b(), bem.is('checked', checked)]" @click="handleClick">
    <span v-if="$slots.default || label">
      <template v-if="!$slots.default">
        {{ label }}
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </span>
  </li>
</template>
<script setup lang="ts">
import { createNamespace } from "@niko/utils/create";
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import { optionProps } from "./option";
import {
  SelectPropsContext,
  selectContextKey,
} from "@niko/components/select/src/constants";
defineOptions({
  name: "NkOption",
});

const bem = createNamespace("option");
const props = defineProps(optionProps);

const defaultChecked = ref<Boolean>(false);
const checked = computed(() => {
  if (defaultChecked.value) {
    return true;
  }
  return false;
});

const propsContext = inject(selectContextKey) as unknown as SelectPropsContext;

// 监听modelValue的变化，控制选中状态
watch(
  () => propsContext.modelValue,
  () => {
    // 如果是多选，
    if (propsContext.props.multiple) {
      // 绑定的值是数组
      if (
        propsContext.props.modelValue &&
        Array.isArray(propsContext.props.modelValue)
      ) {
        // 包含值，则选中
        defaultChecked.value = propsContext.props.modelValue.includes(
          props.value
        )
          ? true
          : false;
      }
    } else {
      // 单选就判断是否全等
      defaultChecked.value =
        propsContext.props.modelValue === props.value ? true : false;
    }
  },
  {
    deep: true,
    immediate: true,
  }
);

function handleClick() {
  defaultChecked.value = !defaultChecked.value;

  // if(!propsContext.props.multiple){
  //   console.log('这里你不应该触发')
  // }

  // 把当前值传过去
  if (defaultChecked.value) {
    // 是不是多选，多选直接push
    if (propsContext.props.multiple) {
      propsContext.modelValue.push(props.value);
      propsContext.optionsArray.push(props.label);
    } else {
      // 不是多选的话，只保留最后一次点击
      propsContext.modelValue.splice(0, 1, props.value);
      propsContext.optionsArray.splice(0, 1, props.label);
    }
  } else {
    let i = propsContext.modelValue.indexOf(props.value);
    propsContext.modelValue.splice(i, 1);

    let j = propsContext.optionsArray.indexOf(props.label);
    propsContext.optionsArray.splice(j, 1);
  }

  // // 如果不是多选，要通知父组件隐藏
  // if(!propsContext.props.multiple){

  // }
}

onMounted(() => {});

nextTick(() => {});
</script>
