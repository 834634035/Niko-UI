import { Trigger, PosList } from "./tooltip";
import { PropType, ExtractPropTypes } from "vue";

export const contentProp = {
  visible: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  contentStyle: {
    type: Object,
    default: () => ({}),
  },
  placement: {
    type: String as PropType<PosList>,
    default: "bottom",
  },
};

export type TriggerProps = ExtractPropTypes<typeof contentProp>;
