import { ExtractPropTypes, PropType } from "vue";


export const barProps = {
    type: {
      type: String as PropType<"right" | "bottom">,
      default: "right",
    },
    size: {
      type: Number,
      default: 20,
    },
    scrollTop:{
      type: Number,
      default: 0,
    },
    scrollLeft:{
      type: Number,
      default: 0,
    },
    always:{
      type: Boolean,
      default: false
    }
  };
  
  export type barPropsType = ExtractPropTypes<typeof barProps>;
