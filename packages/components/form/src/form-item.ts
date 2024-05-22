// prop 检验的属性键名
// label 标签文本
// rules  校验规则
// show-message 是否显示校验错误信息

import type { RuleItem } from "async-validator";
import { ExtractPropTypes, InjectionKey, PropType } from "vue";

export type Arrayable<T> = T | T[];

export interface FormItemRule extends RuleItem {
  trigger?: string | string[];
}

export const formItemValidateState = ["success", "error", ""] as const;
export type FormItemValidateState = (typeof formItemValidateState)[number];

export const fromItemProps = {
  prop: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  rules: [Object, Array] as PropType<Arrayable<FormItemRule>>,
  showMessage: {
    type: Boolean,
    default: true,
  },
} as const;

export type FormItemProps = Partial<ExtractPropTypes<typeof fromItemProps>>;

export interface FormItemContext extends FormItemProps {
  validate: (
    trigger: string,
    callback?: (isValid: boolean) => any
  ) => Promise<any>;
}

export const FormItemContextKey: InjectionKey<FormItemContext> = Symbol('');
