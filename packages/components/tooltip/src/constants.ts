import type { InjectionKey, Ref } from "vue";

export type ElTooltipInjectionContext = {
  value: Ref<boolean>;
  setContentVisible: (visible: boolean) => void;
};

export const TOOLTIP_INJECTION_KEY: InjectionKey<ElTooltipInjectionContext> =
  Symbol("elTooltip");

export type NkPopperInjectionContext = {
  triggerRef: Ref<HTMLElement | undefined>;
  isEnter: Ref<Boolean>;
  position: any;
};

export const POPPER_INJECTION_KEY: InjectionKey<NkPopperInjectionContext> =
  Symbol("popper");
