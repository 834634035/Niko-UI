import { ExtractPropTypes, PropType } from "vue";

type Arrayable<T> = T | T[];

export type Key = string | number;

/**
 * modelValue： 选中值
 * multiple: 是否多选
 * disabled：是否禁用
 * clearable：清除按钮显示， 仅仅适用于单选
 */
export const selectProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<String | Number | Arrayable<Key>>,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  valueKey: {
    type: String || Number,
    default: undefined,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "请选择",
  },
};

export const selectEmits = {
  "update:modelValue": (value: string) => String(value),
  change: (value: string) => String(value),
  clear: () => true,
};


export type SelectProps = ExtractPropTypes<typeof selectProps>;

