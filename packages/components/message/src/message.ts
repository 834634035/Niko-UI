import { ExtractPropTypes, PropType } from "vue";
type TypeList = "success" | "info" | "warning" | "error";

export const messageProps = {
  id: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<TypeList>,
    default: "info",
  },
  content: {
    type: String,
    default: "",
  },
  onClose: {
    type: Function,
    default: () => {},
  },
  offset: {
    type: Number,
    default: 16,
  },
  showClose:{
    type: Boolean,
    default: false,
  }
};

export const messageEmits = {
  destroy: () => true,
};

export type MessageProps = ExtractPropTypes<typeof messageProps>;
