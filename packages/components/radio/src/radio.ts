import { isBoolean, isNumber, isString } from "@niko/utils/types";
import { ExtractPropTypes, PropType } from "vue";

export const radioProps = {
  modelValue: {
    type: [Number, String, Boolean] as PropType<string | number | boolean>,
    default: "",
  },
  value: {
    type: [Number, String, Boolean] as PropType<string | number | boolean>,
    default: "",
  },
  label: {
    type: [Number, String, Boolean] as PropType<string | number | boolean>,
    default: "",
  },
  disabled:{
    type: Boolean as PropType<boolean>,
    default: false
  },
  border:{
    type: Boolean as PropType<boolean>,
    default: false
  },
  name:{
    default: ''
  }
};



export type RadioProps = ExtractPropTypes<typeof radioProps>



export const radioEmits = {
  "update:modelValue": (value: string | number | boolean) => 
    isString(value) || isNumber(value) || isBoolean(value),
  change: (value: string | number | boolean) => 
    isString(value) || isNumber(value) || isBoolean(value),
}

export type RadioEmits = typeof radioEmits

