// 存储组件的属性和相关事件

import { ExtractPropTypes, PropType } from "vue";

// size 组件大小
// type
// round 是否为圆角
// circle 是否为圆形
// loading 是否加载
// disabled 是否禁用
// icon 图标
// icon-placement 图标位置

// 插槽
// icon
// loading

export type Size = "small" | "medium" | "large";

export type Type =
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "default";

export type NativeType = "button" | "submit" | "reset";

export type IconPlacement = "left" | "right";

export const buttonProps = {
  size: String as PropType<Size>,
  type: {
    type: String as PropType<Type>,
    validator: (val: string) => {
      return [
        "primary",
        "success",
        "info",
        "warning",
        "danger",
        "default",
      ].includes(val);
    },
    default: "default",
  },
  round: Boolean,
  loading: Boolean,
  disabled: Boolean,
  nativeType: {
    type: String as PropType<NativeType>,
    default: "button",
  },
  iconPlacement: {
    type: String as PropType<IconPlacement>,
    default: "",
  },
} as const;

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  mousedown: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export type ButtonEmits = typeof buttonEmits;

