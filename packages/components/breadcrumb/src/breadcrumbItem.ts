import { PropType } from "vue";
import type { RouteLocationRaw } from "vue-router";
export const definePropType = <T>(val: any): PropType<T> => val


export const breadcrumbItemProps = {
  to: {
    type: definePropType<RouteLocationRaw>([String, Object]),
    default: "",
  },
  replace: {
    type: Boolean,
    default: false,
  },
};


const objA = {
  a:'1',
  b:'2',
  c:'3',
}