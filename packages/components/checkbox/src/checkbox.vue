<template>
  <label :class="bem.b()">
    <span :class="bem.e('input')">
      <input
        ref="inputRef"
        v-model="model"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        @change="handleChange"
      />
    </span>

    <span v-if="$slots.default || label" :class="bem.e('label')">
      <slot></slot>
      <template v-if="!$slots.default">
        {{ label }}
      </template>
    </span>
  </label>
</template>

<script setup lang="ts">
import { createNamespace } from "@niko/utils/create";
import { checkboxEmits, checkboxProps } from "./checkbox";
import { computed, watch, ref } from "vue";
import { onMounted } from "vue";
const bem = createNamespace("checkbox");

const props = defineProps(checkboxProps);
const emit = defineEmits(checkboxEmits);

defineOptions({
  name: "nk-checkbox",
});

const model = computed<string | number | boolean>({
  get() {
    return props.modelValue as string | number | boolean;
  },
  set(val: string | number | boolean) {
    return emit("update:modelValue", val);
  },
});

const inputRef = ref<HTMLInputElement>();
function indeterminate(val: boolean) {
  inputRef.value!.indeterminate = val;
}


function handleChange(e:Event){
    const target = e.target as HTMLInputElement;
    const value = target.checked ? true : false;
    emit('change',value)
}

watch(() => props.indeterminate, indeterminate);

onMounted(() => {
  indeterminate(props.indeterminate);
});
</script>
