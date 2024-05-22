<template>
  <div :class="[bem.b(), bem.is('hidden', !props.modelValue)]" ref="modalRef">
    <div
      :class="[bem.e('overlay'), bem.is('modalShow', props.modal)]"
      @click="overlayClick"
      ref="overlayRef"
    >
      <div :class="bem.e('main')" :style="modelStyle">
        <div v-if="$slots.header" :class="bem.e('header')">
          <slot name="header"></slot>
        </div>
        <div v-else :class="bem.e('header')">
          <span :class="bem.e('title')">
            {{ props.title }}
          </span>

          <!-- 关闭按钮 -->
          <div :class="[bem.e('close'), showClose(props.showClose)]" @click="close">
            <nk-icon :color="'#ccc'" :size="20">
              <X></X>
            </nk-icon>
          </div>
        </div>

        <div
          :class="[bem.e('content'), bem.is('fullscreen', props.fullscreen)]"
        >
          <slot></slot>
        </div>

        <div v-if="$slots.footer" :class="bem.e('footer')">
          <slot name="footer"></slot>
        </div>

        <div v-else :class="bem.e('footer')">
          <nk-button type="primary" @click="close">确定</nk-button>
          <nk-button @click="close">取消</nk-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from "@niko/utils/create";
import { ModalProps, ModalEmits } from "./modal";
import { computed, ref, watch } from "vue";
import X from "@niko/components/internal-icon/x";

defineOptions({
  name: "nk-modal",
  inheritAttrs: false,
});
const bem = createNamespace("modal");

const props = defineProps(ModalProps);
const emits = defineEmits(ModalEmits);

const modelStyle = computed(() => {
  const { width, top, zIndex = "1000", fullscreen } = props;
  let style: any = {};
  if (fullscreen) {
    style.width = "100%";
    style.height = "100%";
    style.marginTop = "0";
    style.marginBottom = "0";
  } else {
    style.width = width + "px";
    style.marginTop = top + "px";
  }
  style.zIndex = zIndex;
  return style;
});

const modalRef = ref<HTMLInputElement>();
const overlayRef = ref<HTMLInputElement>();
// watch(
//   () => props.modelValue,
//   () => {
//     console.log("监控");
//     if (props.modelValue) {
//       modalRef.value?.classList;
//       console.log(modalRef.value?.classList);
//     }
//   }
// );

const showClose = function (value:boolean) {
  if (!value) {
    return bem.is("show", true);
  } else {
    return "";
  }
};

const close = () => {
  emits("update:modelValue", false);
  emits("close");
};

const overlayClick = (e) => {
  if (!props.closeOnClickModal) return;

  if (e.target === overlayRef.value) {
    close();
  }
};
</script>
