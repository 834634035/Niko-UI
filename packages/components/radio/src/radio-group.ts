import { isBoolean, isNumber, isString } from "@niko/utils/types";
import { ExtractPropTypes, PropType } from "vue";

export const radioGroupProps = {
  modelValue: {
    type: [Number, String, Boolean] as PropType<string | number | boolean>,
    default: "",
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  name: {
    default: "",
  },
};

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;

export const radioGroupEmits = {
  "update:modelValue": (value: string | number | boolean) =>
    isString(value) || isNumber(value) || isBoolean(value),
  change: (value: string | number | boolean) =>
    isString(value) || isNumber(value) || isBoolean(value),
};

export type RadioGroupEmits = typeof radioGroupEmits;
