import { PropType, ExtractPropTypes } from "vue";

export type PosList =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export type Trigger = "hover" | "click" | "focus";

export const tooltipProps = {
  content: {
    type: String,
    default: "",
  },
  placement: {
    type: String as PropType<PosList>,
    default: "bottom",
  },
  trigger: {
    type: String as PropType<Trigger>,
    default: "hover",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  visible:{
    type:Boolean
  }
};

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>;
