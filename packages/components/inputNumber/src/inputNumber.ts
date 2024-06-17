import { ExtractPropTypes } from "vue";

export const inputNumberProps = {
  modelValue: Number,
  min: {
    type: Number,
    default: -Infinity,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  step: {
    type: Number,
    default: 1,
  },
};

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>;


export const inputNumberEmits = {
  "update:modelValue": (value: Number) => Number(value),
  change: (value: Number) => Number(value),
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
}

export type InputNumberEmits = typeof inputNumberEmits;

