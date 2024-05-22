<template>
  <button
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round', round),
      bem.is('loading', loading),
      bem.is('disabled', disabled),
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="emitClick"
    @mousedown="emitMousedown"
  >
    <template v-if="iconPlacement === 'left'">
      <nk-icon style="margin-right: 5px;">
        <LoadingComponent v-if="loading" />
        <template v-else-if="slots.icon">
            <Component :is="slots.icon" ></Component>
        </template>
      </nk-icon>
    </template>
    <slot></slot>
    <template v-if="iconPlacement === 'right'">
      <nk-icon style="margin-left: 5px;">
        <LoadingComponent v-if="loading" />
        <template v-else-if="slots.icon">
            <Component :is="slots.icon" ></Component>
        </template>
      </nk-icon>
    </template>
  </button>
</template>

<script lang="ts" setup>
import LoadingComponent from "@niko/components/internal-icon/Loading";
import { computed, defineProps, defineEmits, useSlots } from "vue";
import { createNamespace } from "@niko/utils/create";
import { buttonEmits, buttonProps } from "./button";
import NkIcon from "@niko/components/icon";
const bem = createNamespace("button");

defineOptions({
  name: "nk-button",
});
const props = defineProps(buttonProps);
const emit = defineEmits(buttonEmits);


const slots = useSlots()

function emitClick(e:MouseEvent){
    emit("click",e)
}

function emitMousedown(e:MouseEvent){
    emit("mousedown",e)
}
</script>
