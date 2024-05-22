<template>
  <UploadContent v-bind="uploadContentProps">
    <slot></slot>
  </UploadContent>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { UploadFile, UploadFiles, UploadRawFile, uploadProps } from "./upload";
import UploadContent from "./upload-content.vue";
import { UploadContentProps } from "./upload-content";
defineOptions({
  name: "nk-upload",
});

// 父组件接收
const props = defineProps(uploadProps);
const emit = defineEmits({});

const uploadFiles = ref<UploadFiles>(props.FileList);


// 监控文件变化，双向绑定
watch(uploadFiles,(newVal)=>{
  emit('onUpdate:FileList',newVal)
})

const findFile = (rawFile: UploadRawFile) => {
  return uploadFiles.value.find((file) => file.uid === rawFile.uid);
};
const uploadContentProps = computed<UploadContentProps>(() => {
  return {
    ...props,
    onStart: (rawFile) => {
      console.log("start");
      const uploadFile: UploadFile = {
        uid: rawFile.uid,
        name: rawFile.name,
        percentage: 0,
        raw: rawFile,
        size: rawFile.size,
        status: "start",
      };
      // uploadFile.url = new URL(rawFile.name).href; // 实现预览
      uploadFile.url = URL.createObjectURL(rawFile)
      uploadFiles.value = [...uploadFiles.value, uploadFile];

      props.onChange(uploadFile);
    },
    onProgress: (e, rawFile) => {
      console.log("progress");
      const uploadFile = findFile(rawFile)!;
      uploadFile.status = "uploading";
      uploadFile.percentage = e.pecetange;
      props.onProgress(e, uploadFile, uploadFiles.value);
    },
    onRemove: async (rawFile) => {
      console.log("remove");
      const uploadFile = findFile(rawFile)!;
      const r = await props.beforeRemove(uploadFile, uploadFiles.value);
      if (r !== false) {

        uploadFiles.value.splice(uploadFiles.value.indexOf(uploadFile),1)
        props.onRemove(uploadFile,uploadFiles.value)
      }
    },
    onError: (err,rawFile) => {
      console.log("error");
      const uploadFile = findFile(rawFile)!;
      uploadFile.status = 'error'
      uploadFiles.value.splice(uploadFiles.value.indexOf(uploadFile),1)
      props.onError(err,uploadFile,uploadFiles.value)
    },
    onSuccess: (res,rawFile) => {
      console.log("success");
      const uploadFile = findFile(rawFile)!;
      uploadFile.status = 'success'
      props.onSuccess(res,uploadFile,uploadFiles.value)

    },
  };
});
</script>
