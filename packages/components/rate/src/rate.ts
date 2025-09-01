import { ExtractPropTypes } from "vue";

export const rateProps = {
  modelValue: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 5,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
};

export const rateEmits = {
  "update:modelValue": (value: number) => typeof value === "number",
  change: (value: number) => typeof value === "number",
};

export type x = ExtractPropTypes<typeof rateProps>;
