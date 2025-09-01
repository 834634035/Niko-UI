import type { InjectionKey, Ref } from "vue";
type Position = {
    top: number,
    left: number
  }
export type NkPopperContext = {
    posi:{
        left: number;
        top: number;
    };
    minWidth:Ref<any>;
    resizeObserverRef:Ref<any>;
  };


export const POPPER_CONTENT_KEY: InjectionKey<NkPopperContext> =
  Symbol("popper-content");