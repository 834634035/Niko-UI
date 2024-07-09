import {
  Comment,
  Fragment,
  Text,
  cloneVNode,
  defineComponent,
  inject,
  withDirectives,
} from "vue";
import { isObject } from "@niko/utils/types";
import { createNamespace } from "@niko/utils/create";
import { TRIGGER_INJECTION_KEY, useTriggerDirective } from "./useTriggerKey";
import { NOOP } from "@vue/shared";
import type { Ref, VNode } from "vue";

const NAME = "ElOnlyChild";

export const OnlyChild = defineComponent({
  name: NAME,
  setup(_, { slots, attrs }) {
    const forwardRefInjection = inject(TRIGGER_INJECTION_KEY);
    const forwardRefDirective = useTriggerDirective(
      forwardRefInjection?.setRefDom ?? NOOP
    );
    return () => {
      const defaultSlot = slots.default?.(attrs);
      // console.log(defaultSlot)
      if (!defaultSlot) return null;

      if (defaultSlot.length > 1) {
        console.log("requires exact only one valid child.");
        return null;
      }

      const firstLegitNode = findFirstLegitChild(defaultSlot);
      if (!firstLegitNode) {
        console.log("no valid child node found");
        return null;
      }

      return withDirectives(cloneVNode(firstLegitNode!, attrs), [
        [forwardRefDirective],
      ]);
    };
  },
});

function findFirstLegitChild(node: VNode[] | undefined): VNode | null {
  if (!node) return null;
  const children = node as VNode[];
  for (const child of children) {
    /**
     * when user uses h(Fragment, [text]) to render plain string,
     * this switch case just cannot handle, when the value is primitives
     * we should just return the wrapped string
     */
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          continue;
        case Text:
        case "svg":
          return wrapTextContent(child);
        case Fragment:
          return findFirstLegitChild(child.children as VNode[]);
        default:
          return child;
      }
    }
    return wrapTextContent(child);
  }
  return null;
}

function wrapTextContent(s: string | VNode) {
  const ns = createNamespace("only-child");
  return <span class={ns.e("content")}>{s}</span>;
}

export type OnlyChildExpose = {
  forwardRef: Ref<HTMLElement>;
};
