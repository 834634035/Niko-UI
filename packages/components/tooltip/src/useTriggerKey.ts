import { InjectionKey, ObjectDirective, Ref, provide } from "vue";

type RefDomSetter = <T>(el: T) => void;

export type RefDomInjectionContext = {
  setRefDom: RefDomSetter;
};

export const TRIGGER_INJECTION_KEY: InjectionKey<RefDomInjectionContext> =
  Symbol("trigger");

export const useTriggerKey = <T>(refDom: Ref<T | null>) => {
  refDom.value = null;

  const setRefDom = (el: T) => {
    refDom.value = el;
  };

  provide(TRIGGER_INJECTION_KEY, {
    setRefDom,
  });
};

export const useTriggerDirective = (
  setRefDom: RefDomSetter
): ObjectDirective => {
  return {
    mounted(el) {
      setRefDom(el);
    },
    updated(el) {
      setRefDom(el);
    },
    unmounted() {
      setRefDom(null);
    },
  };
};
