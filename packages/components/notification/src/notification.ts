import { ExtractPropTypes, PropType, ExtractPublicPropTypes,Ref } from "vue";

type typeList = "success" | "info" | "warning" | "error";

export const notificationPropsType = {
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<typeList>,
    default: "info",
  },
  duration: {
    type: Number,
    default: 4500,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  onDestroy: {
    type: Function,
    default: () => {},
  },
  offsetTop:{
    type: Number,
    default: 16
  }
};

export const NotificationEmits = {
  close: () => true,
};

export type NotificationProps = ExtractPropTypes<typeof notificationPropsType>;
