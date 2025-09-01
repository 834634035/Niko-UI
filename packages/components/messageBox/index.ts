import { h, render } from "vue";
import _messageBox from "./src/messageBox.vue";
// import { withInstall } from "@niko/utils/with-install";

// const MessageBox = withInstall(_messageBox);

// export default MessageBox;

// declare module 'vue' {
//     export interface GlobalComponents {
//         NkMessageBox: typeof MessageBox;
//     }
// }

export * from "./src/messageBox";

// 做函数式组件，返回一个函数
const MessageBox = (options) => {
  console.log(options);

  // 创建一个虚拟dom
  const vnode = h(_messageBox, options);
  
  // 添加一个destroy事件，把dom删除
  vnode.props!.onDestroy = () => {
    render(null, div);
  };
  const div = document.createElement("div");

  render(vnode, div);

  document.body.appendChild(div.children[0])
};

export default MessageBox;
