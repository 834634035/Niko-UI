import { PropType } from "vue";

type MessageBoxType = "warning" | "success" | "info" | "error";

export const messageBoxProps = {
  title: {
    type: String,
    default: "提示",
  },
  message: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<MessageBoxType>,
    default: "",
  },
  showClose: {
    type: Boolean,
    default: true,
  },
};

export const messageBoxEmits = {
  confirm: () => true,
  cancel: () => true,
  destroy: () => true,
};
