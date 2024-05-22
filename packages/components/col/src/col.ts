import { ExtractPropTypes, PropType } from "vue";

export const colProps = {
  span: {
    type: Number,
    default: 24,
  },
  offset: { 
    type: Number,
    default: 0,
  },
  tag: {
    type: String as PropType<string>,
    default: "div",
  },
  // push: { 
  //   type: Number,
  //   default: 0,
  // },
  // pull: { 
  //   type: Number,
  //   default: 0,
  // },
};

export type ColPropsType = ExtractPropTypes<typeof colProps>;
