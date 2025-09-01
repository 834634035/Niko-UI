<template>
  <Transition name="nk-message-box-fade" @after-leave="onAfterLeave">
    <div :class="[bem.b()]" v-show="showStatus">
      <div :class="[bem.e('model'),'fade']">
        <div :class="[bem.e('header')]">
          <span :class="[bem.e('title')]">{{ props.title }}</span>
          <!-- 关闭按钮 -->
          <div :class="[bem.e('close'), showClose(props.showClose)]" @click="close">
            <nk-icon :color="'#ccc'" :size="20">
              <X></X>
            </nk-icon>
          </div>
        </div>

        <div :class="[bem.e('content')]">
          {{ message }}
        </div>
        <div :class="[bem.e('footer')]">
          <nk-button size="small" @click="submit" type="primary" style="margin-right: 8px;">确定</nk-button>
          <nk-button size="small" @click="close">取消</nk-button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">

import { createNamespace } from "@niko/utils/create";

import { messageBoxProps, messageBoxEmits } from './messageBox'
import X from "@niko/components/internal-icon/x";
import NkIcon from "@niko/components/icon";

import NkButton from "@niko/components/button";
import NkMessage from '@niko/components/message'
import { onMounted, ref } from "vue";

const props = defineProps(messageBoxProps)

defineOptions({
  name: "nk-message-box"
});
const bem = createNamespace("message-box");

const emit = defineEmits(messageBoxEmits);


const showStatus = ref<Boolean>(false)

// 延时显示
onMounted(() => {
  showStatus.value = true
})

const showClose = function (value: boolean) {
  if (!value) {
    return bem.is("show", true);
  } else {
    return "";
  }
};


const submit = function () {
  emit('confirm')
  NkMessage({ content: "确定", type: 'success' })
  emit('destroy')
};
const close = function () {
  showStatus.value = false
};
const onAfterLeave = function () {
  NkMessage({ content: "已关闭", type: 'warning' })
  emit('destroy')
}
</script>