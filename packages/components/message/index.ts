import _message from "./src/message.vue";

export * from "./src/message";

import { createVNode, render, VNode, nextTick, watch, computed } from "vue";

import { messageQueue, MessageQueueItem } from "./src/queue";

const typeList = ["success", "info", "warning", "error"];

let id = 1;

const GAP_SIZE = 16;
const NkMessage = (options) => {
  id++;

  const uid = `message_${id}`;
  const obj = {
    id: uid,
    onClose: () => {
      close(uid);
    },
  };

  const vnode = createVNode(_message, Object.assign(options, obj));

  const div = document.createElement("div");

  // 塞个方法，如果动画结束，把dom删除，非常巧妙
  vnode.props!.onDestroy = () => {
    render(null, div);
  };

  // 在这个时候，组件才会去走setup，才会彻底的去走生命周期
  render(vnode, div);

  document.body.appendChild(div.firstElementChild!);



  const vm = vnode.component!
  const handler = {
    close: () => {
      vm.exposed!.visible.value = false
    },
  };

  const messageQueueItem: MessageQueueItem = {
    id: uid,
    vnode,
    vm,
    handler
  };

  // 创建的同时把vm塞到队列里
  messageQueue.push(messageQueueItem);
};

// 给NkMessage加上各种状态调用方法
typeList.forEach((e) => {
  NkMessage[e] = (options) => {
    NkMessage({
      ...options,
      type: e,
    });
  };
});

// 关闭方法
const close = (id) => {

  const idx = messageQueue.findIndex(e=>e.id === id)
  const { handler } = messageQueue[idx]
  if (idx === -1) return

  messageQueue.splice(idx, 1)

  handler.close()
};

export default NkMessage;