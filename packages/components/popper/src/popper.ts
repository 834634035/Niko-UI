import { ExtractPropTypes, PropType } from "vue";

export const popperProps = {
  parentDom: {
    type: [HTMLElement, null] as PropType<HTMLElement | null>,
    default: null,
  },
  isShow: {
    type: Boolean,
    default: false,
  },
  isScroll:{
    type: Boolean,
    default: true,
  }
};

export type popperType = ExtractPropTypes<typeof popperProps>;
