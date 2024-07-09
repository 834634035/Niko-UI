import { Trigger } from "./tooltip";
import { PropType, ExtractPropTypes } from "vue";

export const triggerType = {
  trigger: {
    type: String as PropType<Trigger>,
    default: "hover",
  },
  disabled:{
    type:Boolean,
    default:false
  }
};


export type TriggerProps = ExtractPropTypes<typeof triggerType>;
