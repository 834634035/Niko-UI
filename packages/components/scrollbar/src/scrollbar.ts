import { ExtractPropTypes, PropType } from "vue";

/**
 * height: 滚动条高度
 * max-height: 滚动条最大高度
 * native: 是否使用原生滚动条
 * tag: 视图的元素标签
 * always: 滚动条总是显示
 * min-size: 滚动条最小高度
 *
 *
 */

export const scrollbarProps = {
  height: {
    type: String || Number,
    default: "",
  },
  maxHeight: {
    type: String || Number,
    default: "",
  },
  native: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: "div",
  },
  always: {
    type: Boolean,
    default: false,
  },
  minSize: {
    type: Number,
    default: 20,
  },
};

export type scrollbarPropsType = ExtractPropTypes<typeof scrollbarProps>;
