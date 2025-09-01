import { createDiv } from "./index";

type optionsType = {
  target?: string | HTMLElement | null;
  fullscreen?: boolean;
  lock?: boolean;
  text?: string;
  background?: string;
};

type singletonObj = {
  close: () => boolean;
};

type NkLoadingType = {
  service: (options: optionsType) => singletonObj;
};

const singleton: singletonObj = {
  close: () => false,
};

let bodyOverflow, divOverflow;

const NkLoading = {
  service: (options: optionsType) => {
    const {
      target = document.body,
      fullscreen = true,
      lock = false,
      text,
      background,
    } = options;

    const div = createDiv(text,background);
    // console.log('调用了吧')

    let dom: HTMLElement = document.body;
    if (!target) {
    } else if (target instanceof HTMLElement) {
      dom = target;
    } else if (typeof target === "string") {
      dom = document.querySelector(target) || document.body;
    }

    // 是否全屏
    if (fullscreen) {
      document.body.appendChild(div);
    } else {
      dom.style.position = "relative";
      div.style.position = "absolute";
      dom.appendChild(div);
    }

    // 是否锁定
    if (lock) {
      if (fullscreen) {
        bodyOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
      } else {
        divOverflow = dom.style.overflow;
        dom.style.overflow = "hidden";
      }
    }

    singleton.close = () => {
      if (fullscreen) {
        document.body.style.overflow = bodyOverflow;
        document.body.removeChild(div);
      } else {
        console.log("调用了?", div);
        dom.style.overflow = divOverflow;
        dom.removeChild(div);
      }
      return true;
    };

    return singleton;
  },
};

export { NkLoadingType };
export default NkLoading;
