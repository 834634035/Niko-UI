import { ExtractPropTypes, PropType } from "vue";

// 给每个文件进行一个包装，包装一个全新的类型
export interface UploadFile {
  uid?: number; // 文件id
  name: string; // 文件名
  url?: string; // 文件地址
  status?: string; // 状态
  percentage?: number; // 进度条
  raw?: File; // 原始文件类型
  size?: number; // 文件大小
}

export type UploadFiles = UploadFile[];


// 给组件的使用也定义一些类型，给用户使用的类型
export const baseProps = {
  FileList: {
    type: Array as PropType<UploadFiles>,
    default: () => [] as const,
  },
  action: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: false,
  },

  // input使用
  name: {
    type: String,
    default: "file",
  },
  accept: {
    type: String,
    default: "",
  },
  // 上传使用
  method: {
    type: String,
    default: "post",
  },
  headers: {
    type: Object,
    default: () => ({}),
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  drag:{
    type: Boolean,
    default: false
  }
} as const;


export type UploadRawFile = File & { uid: number };
export type UploadProgressEvent = ProgressEvent & { pecetange: number };

const NOOP = () => {};
export const uploadProps = {
  ...baseProps,
  onPreview: {
    // 预览
    type: Function as PropType<(file: UploadFile) => void>,
    default: NOOP,
  },

  onChange: {
    type: Function as PropType<(file: UploadFile) => void>,
    default: NOOP,
  },

  onRemove: {
    type: Function as PropType<
      (file: UploadFile, UploadFiles: UploadFiles) => Promise<boolean> | boolean
    >,
    default: NOOP,
  },

  beforeUpload: {
    // 上传之前
    type: Function as PropType<
      (file: UploadRawFile) => Promise<boolean> | boolean
    >,
    default: NOOP,
  },
  beforeRemove: {
    type: Function as PropType<
      (file: UploadFile, UploadFiles: UploadFiles) => Promise<boolean> | boolean
    >,
    default: NOOP,
  },
  onProgress: {
    type: Function as PropType<
      (
        file: UploadProgressEvent,
        uploadFile: UploadFile,
        uploadFiles: UploadFile[]
      ) => void
    >,
    default: NOOP,
  },
  onSuccess: {
    type: Function as PropType<
      (response: any, file: UploadFile, uploadFiles: UploadFile[]) => void
    >,
    default: NOOP,
  },
  onError: {
    type: Function as PropType<
      (err: any, file: UploadFile, uploadFiles: UploadFile[]) => void
    >,
    default: NOOP,
  },
} as const;

export type UploadProps = ExtractPropTypes<typeof uploadProps>;


let id = 0;
export const genId = () => id++
