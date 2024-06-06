import type { InjectionKey } from "vue";

import { SelectProps } from "./select";

export interface SelectPropsContext {
  props: SelectProps;
  optionsArray: Array<String>;
  modelValue: Array<String | Number>;
}
export const selectContextKey: InjectionKey<SelectPropsContext> =
  Symbol("selectContextKey");
