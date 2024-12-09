import { ExtractPropTypes } from "vue";

export const sliderProps = {
  modelValue: {
    type: Number,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  showTooltip: {
    type: Boolean,
    default: false,
  },
  showStops: {
    type: Boolean,
    default: false,
  },
};

export const sliderEmits = {
  "update:modelValue": (val: number) => typeof val === "number",
  change: (val: number) => typeof val === "number",
  input: (val: number) => typeof val === "number",
};

export type SliderProps = ExtractPropTypes<typeof sliderProps>;
