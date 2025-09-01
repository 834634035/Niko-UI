import { ExtractPropTypes,PropType } from "vue";

export type Type = "success" | "info" | "warning" | "error";
export type effectType = "light" | "dark";

export const alertProps = {
  title: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<Type>,
    default: "info",
  },
  description: {
    type: String,
    default: "",
  },
  closable: {
    type: Boolean,
    default: true,
  },
  center: {
    type: Boolean,
    default: false,
  },
  effect:{
    type: String as PropType<effectType>,
    default: "light"
  }
};

export const alertEmits = {
    close: () => true
};


export type AlertProps = ExtractPropTypes<typeof alertProps>;
export type AlertEmits = typeof alertEmits;
