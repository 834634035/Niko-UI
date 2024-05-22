import { ExtractPropTypes, PropType } from "vue";

/**
 * type: link类型
 * underline: 是否有下划线
 * disabled：是否是禁用状态
 * href: 链接跳转地址
 * target：链接原生属性
 * icon：图标
 */
export const linkProps = {
  type: {
    type: String as PropType<
      "primary" | "success" | "warning" | "danger" | "info" | "default"
    >,
    default: "default",
  },
  underline: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String as PropType<string>,
    default: "",
  },
  target: {
    type: String as PropType<"_blank" | "_parent" | "_self" | "_top">,
    default: "_self",
  },
};

export type linkPropsType = ExtractPropTypes<typeof linkProps>;
