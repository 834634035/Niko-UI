import { ExtractPropTypes, PropType } from "vue";

export type direction = "rtl" | "ltr" | "ttb" | "btt";

/**
 * modelValue: 是否显示
 * title:标题
 * direction: 方向
 * size: 大小
 * showClose: 是否显示关闭按钮
 * zIndex:z-index
 * modal: 是否显示遮罩
 * withHeader: 是否显示header层
 */ 
export const drawerProps = {
  modelValue: {
    type: Boolean,
  },
  title: {
    type: String,
    default: "",
  },
  direction: {
    type: String as PropType<direction>,
    default: "rtl",
  },
  size: {
    type: String || Number,
    default: "30%",
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
  },
  modal: {
    type: Boolean,
    default: true,
  },
  withHeader:{
    type: Boolean,
    default: true,
  },
  closeOnClickModal:{
    type: Boolean,
    default: true,
  },
  lockScroll:{
    type: Boolean,
    default: true,
  }
};

export type DrawerPropsType = ExtractPropTypes<typeof drawerProps>;



export const drawerEmits = {
  "open":() => true,
  "opened":() => true,
  "close":() => true,
  "closed":() => true,
}