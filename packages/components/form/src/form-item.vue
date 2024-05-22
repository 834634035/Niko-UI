<template>
  <div
    :class="[
      bem.b(),
      bem.is('success', validateState === 'success'),
      bem.is('error', validateState === 'error'),
    ]"
  >
    <label :class="bem.e('label')">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div :class="bem.e('content')">
      <slot></slot>
      <div :class="bem.e('error')">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import AsyncValidator, { Values } from "async-validator";
import { computed, inject, onMounted, provide, ref, toRefs } from "vue";
import {
  FormItemValidateState,
  fromItemProps,
  FormItemContextKey,
  FormItemContext,
  FormItemRule,
  Arrayable,
} from "./form-item";
import { FormContextKey } from "./form";
const bem = createNamespace("form-item");

defineOptions({
  name: "nk-form-item",
});

const FormContext = inject(FormContextKey); // 父级上下文
const props = defineProps(fromItemProps);

// 这里主要做检验逻辑

const validateState = ref<FormItemValidateState>("");
const validateMessage = ref("");

const converArray = (rules: Arrayable<FormItemRule> | undefined) => {
  return rules ? (Array.isArray(rules) ? rules : [rules]) : [];
};
const _rules = computed(() => {
  let rules: FormItemRule[];
  const myRules: FormItemRule[] = converArray(props.rules);
  rules = myRules;
  const formRules = FormContext?.rules;

  if (formRules && props.prop) {
    const _temp = formRules[props.prop];

    if (_temp) {
      // myRules.push(...converArray(_temp))

      // 如果父级有校验规则的话，以父级为主，子级不要
      rules = [...converArray(_temp)];
    }
  }

  return rules;
});

const getRuleFiltered = (trigger: string) => {
  const rules = _rules;
  return rules.value.filter((rule) => {
    if (!rule.trigger || !trigger) return true;
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger);
    } else {
      return rule.trigger === trigger;
    }
  });
};

const onValidationSuccessed = () => {
  validateState.value = "success";
  validateMessage.value = "";
};

const onValidationFailed = (error: Values) => {
  validateState.value = "error";
  const { errors } = error;
  validateMessage.value = errors[0].message;
};
const validate: FormItemContext["validate"] = async (
  trigger: string,
  callback?
) => {
  const rules = getRuleFiltered(trigger);

  // 如果没有对应的rules规则，不用管
  if (rules.length === 0) return;

  // 拿到触发的时机，校验是否通过
  const modelName = props.prop;

  const validator = new AsyncValidator({
    [modelName]: rules,
  });

  const model = FormContext?.model || "";
  return validator
    .validate({
      [modelName]: model[modelName],
    })
    .then((e) => {
      onValidationSuccessed();
    })
    .catch((err: Values) => {
      onValidationFailed(err);
      return Promise.reject(err)

    });
};

const context: FormItemContext = {
  ...props,
  validate,
};
provide(FormItemContextKey, context);

onMounted(() => {
  // 把子组件的上下文给父组件上下文
  FormContext?.addField(context);
});
</script>
