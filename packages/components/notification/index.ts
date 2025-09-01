import { h, Ref, ref, render, VNode, watch } from "vue";
import notification from "./src/notification.vue";
import { NotificationProps } from "./src/notification";

type NotificationItem = {
  id: string;
  vm: VNode;
  destroy: () => void;
  renderDiv: HTMLElement;
  offsetTop?: number;
  prev: NotificationItem | null;
};
// 通知队列
const NotificationQueue: NotificationItem[] = [];

// 间隔
const interval = 16;

// 通知Id
let NotificationId = 0;

// 修改指定索引后的所有数据的offsetTop
const updataTop = (index: number = 0, offsetTop = 20) => {
  if (!NotificationQueue.length) return;

  for (let i = NotificationQueue.length - 1; i >= index; i--) {
    const item = NotificationQueue[i];
    if (item.prev) {
      // 如果是当前项，则不需要再计算了
      if (i === index) {
        item.offsetTop = offsetTop;
        item.vm.component!.props.offsetTop = offsetTop;
      } else {
        item.offsetTop = item.prev.offsetTop;
        item.vm.component!.props.offsetTop = item.offsetTop;
      }
    } else {
      // 说明是第一个
      item.offsetTop = offsetTop;
      item.vm.component!.props.offsetTop = offsetTop;
    }
  }
};
// 根据id删除通知
const destroy = (id: string) => {
  let index = NotificationQueue.findIndex((e) => {
    return e.id === id;
  });
  // console.log("NotificationQueue", NotificationQueue);

  if (index !== -1) {
    let delItem = NotificationQueue[index];
    delItem.destroy();
    let offsetTop = delItem.offsetTop;

    // 删除当前项
    NotificationQueue.splice(index, 1);

    // 如果是最后一个，不做处理
    if (!NotificationQueue[index]) return;

    // 把链表结构调整，删除数据后面的所有项都需要改动
    if (NotificationQueue[index - 1]) {
      NotificationQueue[index].prev = NotificationQueue[index - 1];
      // NotificationQueue[index].offsetTop = offsetTop;
    } else {
      NotificationQueue[index].prev = null;
    }
    // 如果某个数据销毁了，能不能触发其他数据的重新计算高度呢
    updataTop(index, offsetTop);
  }
};

const NkNotification = (options: NotificationProps) => {
  let div = document.createElement("div");

  // 当前项距离顶部的高度
  let offsetTop = ref<number>(20);

  if (NotificationQueue.length) {
    offsetTop.value =
      NotificationQueue.at(-1)!.renderDiv!.offsetHeight +
      NotificationQueue.at(-1)!.renderDiv!.offsetTop +
      interval;
  }

  let vm: VNode = h(notification, {
    ...options,
    id: `notification-${NotificationId}`,
    onDestroy: destroy,
    offsetTop: offsetTop.value,
  });
  // console.log("vm", vm);

  render(vm, div);

  const notificationDiv = div.firstChild as HTMLElement;

  const prevNotificationItem = NotificationQueue.length
    ? NotificationQueue.at(-1)
    : null;

  const notificationItem: NotificationItem = {
    id: `notification-${NotificationId}`,
    vm: vm,
    destroy: () => {
      render(null, div);
    },
    renderDiv: notificationDiv,
    offsetTop: offsetTop.value,
    prev: prevNotificationItem as NotificationItem | null,
  };
  NotificationQueue.push(notificationItem);

  NotificationId++;
  document.body.appendChild(notificationDiv);
};

export default NkNotification;
