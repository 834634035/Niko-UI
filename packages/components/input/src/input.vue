<template>
  <div :class="[bem.b()]">
    <div :class="bem.e('group')">
      <div v-if="$slots.prepend" :class="bem.be('group', 'prepend')">
        <slot name="prepend"></slot>
      </div>

      <div :class="[bem.e('wrapper')]">
        <span v-if="$slots.prefix" :class="[bem.e('prefix')]">
          <slot name="prefix"></slot>
        </span>
        <input
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          v-bind="attrs"
          :class="[bem.e('inner')]"
          ref="input"
          :placeholder="placeholder"
          @input="handleInput"
          @change="handleChange"
          @blur="handleBlur"
          @focus="handleFocus"
        />
        <nk-icon v-if="showPwdVisible" @click="handlePasswordVisible">
          e
        </nk-icon>

        <nk-icon v-if="showClear" @click="clear"> x </nk-icon>

        <span v-if="$slots.suffix" :class="[bem.e('suffix')]">
          <slot name="suffix"></slot>
        </span>
      </div>

      <div v-if="$slots.append" :class="bem.be('group', 'append')">
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { createNamespace } from "@niko/utils/create";
import {
  useAttrs,
  useSlots,
  watch,
  ref,
  onMounted,
  nextTick,
  computed,
  inject,
} from "vue";
import { inputEmits, inputProps } from "./input";
import { FormItemContextKey } from "../../form/src/form-item";

const formItemContext = inject(FormItemContextKey);

defineOptions({
  name: "nk-input",
  inheritAttrs: false,
});
const bem = createNamespace("input");

const props = defineProps(inputProps);
const emit = defineEmits(inputEmits);

const attrs = useAttrs();

const slots = useSlots();

watch(
  () => props.modelValue,
  () => {
    formItemContext && formItemContext?.validate("change").catch((err) => {});
    setNativeInputValue();
  }
);
// ------------------------------------------------------------------

const input = ref<HTMLInputElement | null>(null);
function setNativeInputValue() {
  const inputEle = input.value;
  if (!inputEle) {
    return;
  }
  inputEle.value = String(props.modelValue);
}

const focus = async () => {
  await nextTick();
  input.value?.focus();
};

// ------------------------------------------------------------------

const passwordVisible = ref(false);
const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
  focus();
};

const showPwdVisible = computed(() => {
  return (
    props.modelValue && props.showPassword && !props.disabled && !props.readonly
  );
});

// ------------------------------------------------------------------

const showClear = computed(() => {
  return (
    props.clearable && props.modelValue && !props.readonly && !props.disabled
  );
});

const clear = () => {
  emit("input", "");
  emit("update:modelValue", "");
  emit("clear");
  focus();
};

// ------------------------------------------------------------------

onMounted(() => {
  setNativeInputValue();
});

// ------------------------------------------------------------------

function handleInput(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit("input", value);
  emit("update:modelValue", value);
}

function handleChange(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit("change", value);
  // emit('update:modelValue', value)
}

function handleBlur(e: FocusEvent) {
  formItemContext && formItemContext?.validate("blur").catch((err) => {});
  emit("blur", e);
}

function handleFocus(e: FocusEvent) {
  emit("focus", e);
}
</script>
