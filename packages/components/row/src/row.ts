import { ExtractPropTypes, PropType } from "vue";

export const rowProps = {
  gutter: {
    type: Number,
    default: 0,
  },
  justify: {
    type: String as PropType<
      | "start"
      | "end"
      | "center"
      | "space-around"
      | "space-between"
      | "space-evenly"
    >,
    default: "start",
  },
  align: {
    type: String as PropType<"top" | "middle" | "bottom">,
  },
  tag: {
    type: String as PropType<string>,
    default: "div",
  },
};


export type RowPropsType = ExtractPropTypes<typeof rowProps>;

