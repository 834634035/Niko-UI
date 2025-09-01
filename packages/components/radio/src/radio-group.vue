<template>
  <div :class="[bem.b()]"><slot></slot></div>
</template>

<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { radioGroupProps, radioGroupEmits } from "./radio-group";
import { provide } from "vue";
import radioGroupContextKey from "./constants";

defineOptions({
  name: "nkRadioGroup",
});

const bem = createNamespace("radio-group");
const props = defineProps(radioGroupProps);
const emit = defineEmits(radioGroupEmits);

function setValue(val: string | number | boolean) {
  emit("update:modelValue", val);
  emit("change", val);
}

provide(radioGroupContextKey, { props, setValue });
</script>
