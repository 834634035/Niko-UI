import type { InjectionKey } from "vue";

import { RadioGroupProps, RadioGroupEmits } from "./radio-group";

interface radioContextType {
  props: RadioGroupProps;
  setValue: (val: string | number | boolean) => void;
}

const radioGroupContextKey = Symbol(
  "radioContextKey"
) as InjectionKey<radioContextType>;

export default radioGroupContextKey;
