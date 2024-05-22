// type属性
// modleValue属性
// placheholder属性
// clearable属性
// show-password属性
// disabled属性
// readonly属性

import { ExtractPropTypes, PropType, readonly } from "vue";

// size属性

// prefix-icon属性

// suffix-icon属性

// clear-icon属性

// show-word-limit属性

// autosize属性

// autocomplete属性

// tabindex属性

// validate-event属性

// name属性

// maxlength属性

export const inputProps = {
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: [Number, String] as PropType<string | number>,
    default: "",
  },
  placeholder: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
} as const;

export type inputProps = ExtractPropTypes<typeof inputProps>;

export const inputEmits = {
  "update:modelValue": (value: string) => String(value),
  input: (value: string) => String(value),
  change: (value: string) => String(value),
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  click: (e: MouseEvent) => e instanceof MouseEvent,
  clear: () => true,
};

export type inputEmits = typeof inputEmits;
