import { createApp, DirectiveBinding, ref } from "vue";

export const createDiv = (
  str: string = "",
  background: string = "rgba(255,255,255,.8)"
) => {
  // 创建的loading盒子，
  let div = document.createElement("div");
  div.style.position = "fixed";
  div.style.zIndex = "1000";
  div.style.width = "100%";
  div.style.height = "100%";

  div.style.top = "0";
  div.style.bottom = "0";
  div.style.left = "0";
  div.style.right = "0";
  div.style.backgroundColor = background;
  div.style.display = "flex";
  div.style.justifyContent = "center";
  div.style.alignItems = "center";
  div.style.flexDirection = "column";

  // 其中的等待动画
  let svgdiv = document.createElement("div");
  svgdiv.style.width = "24px";
  svgdiv.style.height = "24px";
  svgdiv.className = "nk-loading";
  svgdiv.innerHTML = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1731581446418" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5526" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M876.864 782.592c3.264 0 6.272-3.2 6.272-6.656 0-3.456-3.008-6.592-6.272-6.592-3.264 0-6.272 3.2-6.272 6.592 0 3.456 3.008 6.656 6.272 6.656z m-140.544 153.344c2.304 2.432 5.568 3.84 8.768 3.84a12.16 12.16 0 0 0 8.832-3.84 13.76 13.76 0 0 0 0-18.56 12.224 12.224 0 0 0-8.832-3.84 12.16 12.16 0 0 0-8.768 3.84 13.696 13.696 0 0 0 0 18.56zM552.32 1018.24c3.456 3.648 8.32 5.76 13.184 5.76a18.368 18.368 0 0 0 13.184-5.76 20.608 20.608 0 0 0 0-27.968 18.368 18.368 0 0 0-13.184-5.824 18.368 18.368 0 0 0-13.184 5.76 20.608 20.608 0 0 0 0 28.032z m-198.336-5.76c4.608 4.8 11.072 7.68 17.6 7.68a24.448 24.448 0 0 0 17.536-7.68 27.456 27.456 0 0 0 0-37.248 24.448 24.448 0 0 0-17.536-7.68 24.448 24.448 0 0 0-17.6 7.68 27.52 27.52 0 0 0 0 37.184z m-175.68-91.84c5.76 6.08 13.824 9.6 21.952 9.6a30.592 30.592 0 0 0 22.016-9.6 34.368 34.368 0 0 0 0-46.592 30.592 30.592 0 0 0-22.016-9.6 30.592 30.592 0 0 0-21.952 9.6 34.368 34.368 0 0 0 0 46.592z m-121.152-159.36c6.912 7.36 16.64 11.648 26.368 11.648a36.736 36.736 0 0 0 26.432-11.584 41.28 41.28 0 0 0 0-55.936 36.736 36.736 0 0 0-26.432-11.584 36.8 36.8 0 0 0-26.368 11.52 41.28 41.28 0 0 0 0 56zM12.736 564.672a42.88 42.88 0 0 0 30.784 13.44 42.88 42.88 0 0 0 30.784-13.44 48.128 48.128 0 0 0 0-65.216 42.88 42.88 0 0 0-30.72-13.44 42.88 42.88 0 0 0-30.848 13.44 48.128 48.128 0 0 0 0 65.216z m39.808-195.392a48.96 48.96 0 0 0 35.2 15.36 48.96 48.96 0 0 0 35.2-15.36 54.976 54.976 0 0 0 0-74.56 48.96 48.96 0 0 0-35.2-15.424 48.96 48.96 0 0 0-35.2 15.424 54.976 54.976 0 0 0 0 74.56zM168.32 212.48c10.368 11.008 24.96 17.408 39.68 17.408 14.592 0 29.184-6.4 39.552-17.408a61.888 61.888 0 0 0 0-83.84 55.104 55.104 0 0 0-39.616-17.408c-14.656 0-29.248 6.4-39.616 17.408a61.888 61.888 0 0 0 0 83.84zM337.344 124.8c11.52 12.16 27.712 19.264 43.968 19.264 16.256 0 32.448-7.04 43.968-19.264a68.672 68.672 0 0 0 0-93.184 61.248 61.248 0 0 0-43.968-19.264 61.248 61.248 0 0 0-43.968 19.264 68.736 68.736 0 0 0 0 93.184z m189.632-1.088c12.672 13.44 30.528 21.248 48.448 21.248s35.712-7.808 48.384-21.248a75.584 75.584 0 0 0 0-102.464A67.392 67.392 0 0 0 575.36 0c-17.92 0-35.776 7.808-48.448 21.248a75.584 75.584 0 0 0 0 102.464z m173.824 86.592c13.824 14.592 33.28 23.104 52.736 23.104 19.584 0 39.04-8.512 52.8-23.104a82.432 82.432 0 0 0 0-111.744 73.472 73.472 0 0 0-52.8-23.168c-19.52 0-38.912 8.512-52.736 23.168a82.432 82.432 0 0 0 0 111.744z m124.032 158.528c14.976 15.872 36.032 25.088 57.216 25.088 21.12 0 42.24-9.216 57.152-25.088a89.344 89.344 0 0 0 0-121.088 79.616 79.616 0 0 0-57.152-25.088c-21.184 0-42.24 9.216-57.216 25.088a89.344 89.344 0 0 0 0 121.088z m50.432 204.032c16.128 17.088 38.784 27.008 61.632 27.008 22.784 0 45.44-9.92 61.568-27.008a96.256 96.256 0 0 0 0-130.432 85.76 85.76 0 0 0-61.568-27.072c-22.848 0-45.44 9.984-61.632 27.072a96.192 96.192 0 0 0 0 130.432z" fill="#409EFF" p-id="5527"></path></svg>`;

  // 加载的提示文字，默认没有提示文字
  let text = document.createElement("span");
  text.style.color = "#409EFF";
  text.style.marginTop = "6px";
  text.innerText = str;

  div.appendChild(svgdiv);
  div.appendChild(text);

  return div;
};

const bodyOverflow = ref("");
const divOverflow = ref("");

// 唯一标识符
let id: number = 0;
// 存放每一个使用自定义指令的元素，都会对应一个loading盒子
const stack = {};

// 每一个使用自定义指令的组件，都应该有一个自己的loading状态，
const Loading = {
  mounted(el, binding, vnode) {
    // 添加一个唯一标识符
    el.setAttribute("loading-id", id);
    id++;
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value || binding.oldValue === undefined) {
      // 缓存当前的loading-div, 下次更新时删除
      let loadingId = el.getAttribute("loading-id");
      if (!loadingId) return;
      // 如果原来的loading不存在，就创建一个，存在的话直接不管，下一步
      if (!stack[loadingId]) {
        //创建一个loading-div，并挂载到元素上使用
        let div = createDiv();
        stack[loadingId] = div;
        installDiv(binding.modifiers.fullscreen, el, div);
      }

      if (binding.modifiers.lock) {
        // 把之前的数据缓存住
        if (binding.modifiers.fullscreen) {
          bodyOverflow.value = document.body.style.overflow;
          document.body.style.overflow = "hidden";
        } else {
          divOverflow.value = el.style.overflow;
          el.style.overflow = "hidden";
        }
      }
    } else {
      // 如果是关闭的时候，把div删除，恢复之前的状态

      let loadingId = el.getAttribute("loading-id");
      if (!loadingId) return;

      unInstallDiv(binding.modifiers.fullscreen, el, stack[loadingId]);
      delete stack[loadingId];

      if (binding.modifiers.lock) {
        document.body.style.overflow = bodyOverflow.value;
        el.style.overflow = divOverflow.value;
      }
    }
  },
};

function installDiv(fullscreen: Boolean, el: HTMLElement, div: HTMLElement) {
  if (fullscreen) {
    // 全屏 黏连在屏幕上
    console.log("全屏", fullscreen);
    div.style.position = "fixed";
    document.body.appendChild(div);
  } else {
    div.style.position = "absolute";
    el.appendChild(div);
  }
}

function unInstallDiv(fullscreen: Boolean, el: HTMLElement, div: HTMLElement) {
  if (fullscreen) {
    if (document.body.contains(div)) {
      document.body.removeChild(div);
    }
  } else {
    if (el.contains(div)) {
      el.removeChild(div);
    }
  }
}

export default Loading;
