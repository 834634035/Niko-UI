import { ExtractPropTypes, PropType } from "vue";

export const popperProps = {
  parentDom: {
    type: [HTMLDivElement, null] as PropType<HTMLDivElement | null>,
    default: null,
  },
  isShow: {
    type: Boolean,
    default: false,
  },
};

export type popperType = ExtractPropTypes<typeof popperProps>;
