/**
 * 试着创建一个对象，返回一系列的方法，供大家调用，比如updata，destroy等
 */
import { inject, nextTick, type Ref } from "vue";
import { POPPER_CONTENT_KEY } from "../constants";
type Position = {
  top: number;
  left: number;
};
// 获取一个dom的对于body的offsetLeft和offsetTop
function getOffset(domElement: HTMLElement, posObj: Position) {
  if (domElement.offsetParent === document.body) {
    posObj.left += domElement.offsetLeft;
    posObj.top += domElement.offsetTop;
    return;
  } else {
    posObj.left += domElement.offsetLeft;
    posObj.top += domElement.offsetTop;

    getOffset(domElement.offsetParent as HTMLElement, posObj);
  }
}
function updata(
  dom: HTMLElement,
  posiparams?,
  minWidthparams?: Ref<number>,
  resizeObserverRefparams?: Ref,
  mutationObserver?: Ref<MutationObserver | null>
) {
  // 自己组件调用
  let posi, minWidth, resizeObserverRef;
  if (posiparams) posi = posiparams;
  if (minWidthparams) minWidth = minWidthparams;
  if (resizeObserverRefparams) resizeObserverRef = resizeObserverRefparams;

  // 子组件调用
  const obj = inject(POPPER_CONTENT_KEY);
  if (obj) {
    posi = obj.posi;
    minWidth = obj.minWidth;
    resizeObserverRef = obj.resizeObserverRef;
  }

  const offsetObj: Position = {
    top: 0,
    left: 0,
  };
  getOffset(dom as HTMLElement, offsetObj);
  let width = dom?.offsetWidth;
  minWidth.value = width ? width : 0;
  posi.left = offsetObj.left - minWidth.value / 2;

  // 创建一个ResizeObserver对象，监听parentDom的大小变化
  const myObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      // 高度不是时刻发生变化的，不用做节流
      posi.top = offsetObj.top + entry.borderBoxSize[0].blockSize / 2 + 10;
    });
  });
  myObserver.observe(dom as HTMLElement);
  resizeObserverRef.value = myObserver;

  if (mutationObserver) {
    // 监听父元素变化，主要是左右移动，子元素位置随之发生变化
    mutationObserver.value = new MutationObserver(() => {
      updateParentDomLeft();
    });
    const updateParentDomLeft = () => {
      if (dom) {
        const rect = dom.getBoundingClientRect();
        posi.left = rect.left;
      } else {
        posi.left = 0;
      }
    };
    // 监听属性变化
    mutationObserver.value.observe(dom, {
      attributes: true,
      attributeFilter: ["style"], // 如果位置变化是通过 style 属性引起的
      subtree: true,
    });
  }
}

function test() {
  const POPPER_CONTENT = inject(POPPER_CONTENT_KEY);
  console.log("POPPER_CONTENT", POPPER_CONTENT);
}
export { updata, test };
function ref(arg0: null): Ref<MutationObserver> {
  throw new Error("Function not implemented.");
}
