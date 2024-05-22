<template>
  <form :class="[bem.b()]">
    <slot></slot>
  </form>
</template>
<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { FormContext, FormContextKey, formProps } from "./form";
import { provide } from "vue";
import { FormItemContext } from "./form-item";
import { Values } from "async-validator";

const bem = createNamespace("form-item");

defineOptions({
  name: "nk-form",
});

const props = defineProps(formProps);

const fields: FormItemContext[] = []; // 父组件收集子组件
// form校验，调用所有子组件的validate方法
const validate = async (
  callback?: (valid: boolean, fields?: Values) => void
) => {
  let errors: Values = {};
  for (const field of fields) {
    try {
      await field.validate("");
    } catch (error) {
      errors = {
        ...errors,
        ...(error as Values).fields,
      };
    }
  }

  // 没有错误就成功
  if (Object.keys(errors).length === 0) {
    return callback?.(true);
  } else {
    if (callback) {
      callback?.(false, errors);
    } else {
      return Promise.reject(errors);
    }
  }
};

const addField: FormContext["addField"] = (context) => {
  fields.push(context);
  // setTimeout(() => {
  //   console.log(fields);
  // }, 1000);
};

const context = {
  ...props,
  addField,
};
provide(FormContextKey, context);

// 将表单校验方法暴露出去，用户可以通过ref来调用
defineExpose({
  validate,
});
</script>
