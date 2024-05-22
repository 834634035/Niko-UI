<template>
  <div :class="[bem.b()]" @click="handleCilck">
    <template v-if="drag">
      <UploadDragger @file="handleDragUpload">
        <slot></slot>
      </UploadDragger>
    </template>
    <template v-else>
      <slot></slot>
    </template>
    <input
        type="file"
        ref="inputRef"
        :name="name"
        :accept="accept"
        :multiple="multiple"
        @change="handleChange"
      />
  </div>
</template>

<script lang="ts" setup>
import UploadDragger from "./upload-dragger.vue";
import { createNamespace } from "@niko/utils/create";
import { uploadProps, genId, UploadRawFile } from "./upload";
import { ref } from "vue";
import { uploadContentProps } from "./upload-content";
import { httpRequest } from "./ajax";
const bem = createNamespace("upload");

defineOptions({
  name: "nk-upload-content",
  inheritAttrs: false,
});
const props = defineProps(uploadContentProps);
const inputRef = ref<HTMLInputElement>();

function handleDragUpload(files){
  uploadFiles(files)
}
async function upload(file: UploadRawFile) {
  // 输入框清空
  inputRef.value!.value = "";
  let result = await props.beforeUpload(file);
  if (result === false) return props.onRemove(file); // 停止上传

  // 开始上传
  const { method, name, headers, data, action } = props;
  httpRequest({
    method,
    action,
    file,
    name,
    headers,
    data,
    onError: (e) => {
      props.onError(e, file);
    },
    onSuccess(res) {
      props.onSuccess(res, file);
    },
    onProgress(res) {
      props.onProgress(res, file);
    },
  });
}

function uploadFiles(files:FileList){
  for (let i = 0; i < files.length; i++) {
    const rawFile = files[i] as UploadRawFile;
    rawFile.uid = genId();
    props.onStart(rawFile);
    upload(rawFile);
  }
}
const handleChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files!;
  uploadFiles(files)
};
const handleCilck = () => {
  inputRef.value!.value = "";
  inputRef.value!.click();
};
</script>
