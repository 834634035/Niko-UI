import { isElement } from "@niko/utils/types";

import type {
  ComponentPublicInstance,
  DirectiveBinding,
  ObjectDirective,
} from "vue";

type DocumentHandler = <T extends MouseEvent>(mouseup: T, mouseDown: T) => void;

type FlushList = Map<
  HTMLElement,
  {
    documentHandler: DocumentHandler;
    bindingFn: (...args: unknown[]) => unknown;
  }[]
>;

const nodeList: FlushList = new Map();

let startClick: MouseEvent;

document.addEventListener("mousedown", (e: MouseEvent) => (startClick = e));
document.addEventListener("mouseup", (e: MouseEvent) => {
  for (const handler of nodeList.values()) {
    for (const { documentHandler } of handler) {
      documentHandler(e, startClick);
    }
  }
});

function createDocumentHandler(
  el: HTMLElement,
  binding: DirectiveBinding
): DocumentHandler {
  let excludes: HTMLElement[] = [];

  if (Array.isArray(binding.arg)) {
    excludes = binding.arg;
  } else if (isElement(binding.arg)) {
    excludes.push(binding.arg as unknown as HTMLElement);
  }

  return function (mouseup, mousedown) {
    // 给popper组件用的，自定义指令会把popper组件实例传过来
    // 这一块我好像套了太多层了,问题不大,只是名字重复了
    const popperRef = (
      binding.instance as ComponentPublicInstance<{
        popperRef: ComponentPublicInstance<{
          popperRef: HTMLElement;
        }>;
      }>
    ).popperRef.popperRef;

    // 获取鼠标点击和收起击的target
    const mouseUpTarget = mouseup.target as Node;
    const mouseDownTarget = mousedown?.target as Node;

    // 检测是否绑定了指令
    const isBound = !binding || !binding.instance;

    // 哪一个不存在，也就是点击在了文档外，或者移动到了文档外再释放
    const isTargetExists = !mouseUpTarget || !mouseDownTarget;

    // 检测鼠标点击和收起击是否发生在el内
    const isContainedByEl =
      el.contains(mouseUpTarget) || el.contains(mouseDownTarget);

    // 是否是自己
    const isSelf = el === mouseUpTarget;

    // 检测是否在排除列表内
    const isTargetExcluded =
      (excludes.length &&
        excludes.some((item) => item?.contains(mouseUpTarget))) ||
      (excludes.length && excludes.includes(mouseDownTarget as HTMLElement));

    const isContainedByPopper =
      popperRef &&
      (popperRef.contains(mouseUpTarget) ||
        popperRef.contains(mouseDownTarget));

    // console.log("isBound", isBound);
    // console.log("isTargetExists", isTargetExists);
    // console.log("isContainedByEl", isContainedByEl);
    // console.log("isSelf", isSelf);
    // console.log("isTargetExcluded", isTargetExcluded);
    // console.log("isContainedByPopper", isContainedByPopper);

    if (
      isBound ||
      isTargetExists ||
      isContainedByEl ||
      isSelf ||
      isTargetExcluded ||
      isContainedByPopper
    ) {
      return;
    }

    binding.value(mouseup, mousedown);
  };
}

const ClickOutside: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    // 如果没有该元素就加进去
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }

    // 添加事件
    nodeList.get(el)?.push({
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    });
  },

  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }

    const handlers = nodeList.get(el)!;

    const oldHandlerIndex = handlers.findIndex(
      (item) => item.bindingFn === binding.oldValue
    );

    const newHandler = {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    };

    if (oldHandlerIndex >= 0) {
      handlers.splice(oldHandlerIndex, 1, newHandler);
    } else {
      handlers.push(newHandler);
    }
  },

  unmounted(el: HTMLElement) {
    nodeList.delete(el);
  },
};

export default ClickOutside;
