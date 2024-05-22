import { ExtractPropTypes, PropType } from "vue";

/**
 * modelValue: 是否显示
 * title:标题
 * width:宽度
 * top:头部
 * zIndex:z-index
 * fullscreen: 是否全屏
 * modal: 是否显示遮罩
 */

export const ModalProps = {
  modelValue: {
    type: Boolean,
  },
  title: {
    type: String as PropType<string>,
    default: "",
  },
  width: {
    type: String as PropType<string>,
    default: 500,
  },
  top: {
    type: String as PropType<string>,
    default: "",
  },
  zIndex: {
    type: String as PropType<string>,
    default: "1000",
  },
  fullscreen: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  modal: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  closeOnClickModal: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  showClose: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
} as const;

export const ModalEmits = {
  "update:modelValue": (value: boolean) => value,
  close: () => true,
} as const;

export type ModalPropsType = ExtractPropTypes<typeof ModalProps>;
