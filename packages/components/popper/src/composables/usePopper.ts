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
  resizeObserverRefparams?: Ref
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
  
  console.log("posi", posi);
  console.log("minWidth", minWidth);
  console.log("resizeObserverRef", resizeObserverRef);
  console.log("调用了吗");
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
}

function test() {
  const POPPER_CONTENT = inject(POPPER_CONTENT_KEY);
  console.log("POPPER_CONTENT", POPPER_CONTENT);
}
export { updata, test };
