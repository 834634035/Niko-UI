import { ComponentInternalInstance, VNode, shallowReactive } from "vue";

export interface MessageQueueItem {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  handler: {
    close: () => void;
  };
}

// 通过id获取单项以及其前一项
export const getMessageQueueItem = (id: string) => {
  const idx = messageQueue.findIndex((item) => item.id === id);
  const current = messageQueue[idx];
  let prev: MessageQueueItem | undefined;
  if (idx > 0) {
    prev = messageQueue[idx - 1];
  }
  return { current, prev };
};

// 获取前一项的偏移量(底部的位置)
export const getLastOffset = (id: string): number => {
  const { prev } = getMessageQueueItem(id);
  if (!prev) return 0;
  return prev.vm.exposed!.bottom.value;
};

// 如果队列中有该项就返回偏移量，没有就返回传入的offset.
export const getOffsetOrSpace = (id: string, offset: number) => {
  const idx = messageQueue.findIndex((e) => e.id === id);
  return idx > 0 ? 16 : offset;
};

// 返回信息队列
export const messageQueue: MessageQueueItem[] = shallowReactive([]);
