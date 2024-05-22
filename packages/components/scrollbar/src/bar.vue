<template>
  <div
    :class="[
      bem.b(),
      bem.is('right', type === 'right'),
      bem.is('bottom', type === 'bottom'),
    ]"
    ref="barboxRef"
    @mousedown="handleMousedown"
  >
    <div
      :class="[bem.e('content')]"
      :style="styles"
      @mousedown="handleMousedown"
      ref="barRef"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { computed, ref, inject, onMounted, watch } from "vue";

import { barProps } from "./bar";
import { scrollbarContextKey } from "./constants";

defineOptions({
  name: "NkBar",
});

const bem = createNamespace("bar");

const props = defineProps(barProps);
const barboxRef = ref<HTMLDivElement>();
const barRef = ref<HTMLDivElement>();

// 滚动条位置
const rateY = ref(0);
const rateX = ref(0);
// 滚动条高度,宽度
const height = ref(98);
const width = ref(98);
// 滚动条父元素高度,宽度
const barboxRefHeight = ref(0);
const barboxRefWidth = ref(0);
// 两者比值
const ratioY = computed(() => {
  return ((barboxRefHeight.value - height.value) / height.value) * 100;
});
const ratioX = computed(() => {
  return ((barboxRefWidth.value - width.value) / width.value) * 100;
});

type StyleType = {
  transform: string;
  height: string;
  width: string;
  display: string;
};
const styles = computed(() => {
  const style: StyleType = {
    transform: "",
    height: "",
    width: "",
    display: "",
  };
  if (props.type === "right") {
    style.transform = `translateY(${rateY.value}%)`;
    style.height = `${height.value}px`;
  } else if (props.type === "bottom") {
    style.transform = `translateX(${rateX.value}%)`;
    style.width = `${width.value}px`;
  } 

  style.display = props.always ? "block" : "none";
  return style;
});
/***
 * 1. 鼠标按下时，记录鼠标当前位置，以及bar的位置
 * 2. 鼠标移动时，计算鼠标移动距离，计算比例，更新bar的位置
 * 3. 如果鼠标移出范围，用document的鼠标移动事件得到鼠标位置
 */

// 按下时鼠标对于Barbox的位置
const mouseBarboxPosition = {
  downX: 0,
  downY: 0,
  rateY: 0,
  rateX: 0,
  moveX: 0,
  moveY: 0,
};

let originalOnSelectStart: any = null;
function handleMousedown(e) {
  // 阻止冒泡
  e.stopPropagation();
  // 如果有选择的文字，清除
  window.getSelection()?.removeAllRanges();

  // 滚动的时候，不让页面选择文字
  originalOnSelectStart = document.onselectstart;
  document.onselectstart = function () {
    return false;
  };

  mouseBarboxPosition.downY = e.clientY;
  mouseBarboxPosition.downX = e.clientX;

  // 把点击时的滚动条位置记录下来
  mouseBarboxPosition.rateY = rateY.value;
  mouseBarboxPosition.rateX = rateX.value;

  document.addEventListener("mousemove", mousemove);
  document.addEventListener("mouseup", handleMouseup);

  // 如果点进去，不在滚动条内，则将滚动条位置移动
  console.log("点击了", e);
  if (e.target === barboxRef.value) {
    if (props.type === "right") {
      let barRefHeight = (barRef.value as HTMLElement).offsetHeight;

      // 滚动条对于barboxRef的应该要的偏移值
      let val = e.offsetY - barRefHeight / 2;
      if (val <= 0) {
        rateY.value = 0;
      } else if (val >= ratioY.value) {
        rateY.value = ratioY.value;
      } else {
        rateY.value = Math.floor((val / barRefHeight) * 100);
      }
    } else if (props.type === "bottom") {
      let barRefWidth = (barRef.value as HTMLElement).offsetWidth;

      // 滚动条对于barboxRef的应该要的偏移值
      let val = e.offsetX - barRefWidth / 2;
      if (val <= 0) {
        rateX.value = 0;
      } else if (val >= ratioX.value) {
        rateX.value = ratioX.value;
      } else {
        rateX.value = Math.floor((val / barRefWidth) * 100);
      }
    }
  }
}

function mousemove(e) {
  if (e.target === barRef.value) {
    // 记录移动时鼠标对于Barbox的位置
    mouseBarboxPosition.moveX = e.clientX;
    mouseBarboxPosition.moveY = e.clientY;
    if (props.type === "right") {
      // 这次移动，对于点击位置的偏移量
      let offsetY = mouseBarboxPosition.moveY - mouseBarboxPosition.downY;

      // 把移动的距离换算成滚动条的百分比比例
      let val = calculateScale(offsetY);

      // 原来的位置 + 移动的距离
      let zhi = mouseBarboxPosition.rateY + val;

      // 如果在范围内，任意移动，如果超过边界值，取边界值
      if (zhi >= 0 && zhi <= ratioY.value) {
        rateY.value = zhi;
      } else if (zhi < 0) {
        rateY.value = 0;
      } else if (zhi > ratioY.value) {
        rateY.value = ratioY.value;
      }
    } else if (props.type === "bottom") {
      // 偏移量
      let offsetX = mouseBarboxPosition.moveX - mouseBarboxPosition.downX;

      let val = calculateScale(offsetX);

      let zhi = mouseBarboxPosition.rateX + val;
      if (zhi >= 0 && zhi <= ratioX.value) {
        rateX.value = zhi;
      } else if (zhi < 0) {
        rateX.value = 0;
      } else if (zhi > ratioX.value) {
        rateX.value = ratioX.value;
      }
    }
  } else if (e.target === barboxRef.value) {
    console.log("barboxRef内");
  } else {
    // 落点在barboxRef之外的，记录位置
    mouseBarboxPosition.moveX = e.clientX;
    mouseBarboxPosition.moveY = e.clientY;

    if (props.type === "right") {
      // 滚动条盒子的位置信息
      let barboxRefPosition = (
        barboxRef.value as HTMLElement
      ).getBoundingClientRect();

      if (e.clientY <= barboxRefPosition.top + 2 + height.value / 2) {
        // 超过滚动条最上面时的中心点
        rateY.value = 0;
      } else if (
        e.clientY >=
        barboxRefPosition.top + barboxRefPosition.height - height.value / 2
      ) {
        // 超过滚动条在最下面时的中心点
        rateY.value = ratioY.value;
      } else {
        // 在可接受的范围内移动时

        let offsetY = mouseBarboxPosition.moveY - mouseBarboxPosition.downY;
        let val = calculateScale(offsetY);
        let zhi = mouseBarboxPosition.rateY + val;

        // 如果在范围内，任意移动，如果超过边界值，取边界值
        if (zhi >= 0 && zhi <= ratioY.value) {
          rateY.value = zhi;
        } else if (zhi < 0) {
          rateY.value = 0;
        } else if (zhi > ratioY.value) {
          rateY.value = ratioY.value;
        }
      }
    } else if (props.type === "bottom") {
      let barboxRefPosition = (
        barboxRef.value as HTMLElement
      ).getBoundingClientRect();

      if (e.clientX <= barboxRefPosition.left + 2 + width.value / 2) {
        // 没有超过滚动条的中心点
        rateX.value = 0;
      } else if (
        e.clientX >=
        barboxRefPosition.left + barboxRefPosition.width - width.value / 2
      ) {
        // 超过滚动条在最下面时的中心点
        rateX.value = ratioX.value;
      } else {
        // 在可接受的范围内移动时
        let offsetX = mouseBarboxPosition.moveX - mouseBarboxPosition.downX;
        let val = calculateScale(offsetX);

        let zhi = mouseBarboxPosition.rateX + val;
        if (zhi >= 0 && zhi <= ratioX.value) {
          rateX.value = zhi;
        } else if (zhi < 0) {
          rateX.value = 0;
        } else if (zhi > ratioX.value) {
          rateX.value = ratioX.value;
        }
      }
    }
  }
}

function handleMouseup(e) {
  document.removeEventListener("mousemove", mousemove);
  document.removeEventListener("mouseup", handleMouseup);

  if (document.onselectstart !== originalOnSelectStart) {
    document.onselectstart = originalOnSelectStart;
  }
}

// 传入偏移量，计算比例
function calculateScale(offsetVal: number): number {
  if (props.type === "right") {
    // 滚动的百分比，偏移量除以滚动条的高度
    let val: number = (offsetVal / height.value) * 100;
    return val;
  } else if (props.type === "bottom") {
    let val: number = (offsetVal / width.value) * 100;
    return val;
  }
  return 0;
}

// 父元素传过来的父元素上下文
let scrollbar, childrenHeight, parentHeight, childrenWidth, parentWidth;
onMounted(() => {
  scrollbar = inject(scrollbarContextKey);

  barboxRefHeight.value = Number(barboxRef.value?.offsetHeight);
  barboxRefWidth.value = Number(barboxRef.value?.offsetWidth);

  childrenHeight = scrollbar?.wrapElement.children[0].offsetHeight;
  parentHeight = scrollbar?.wrapElement.offsetHeight;

  childrenWidth = scrollbar?.wrapElement.children[0].scrollWidth;
  parentWidth = scrollbar?.wrapElement.offsetWidth;

  // 滚动条高度
  height.value = (parentHeight * (parentHeight - 4)) / childrenHeight;
  // 滚动条宽度
  width.value = (parentWidth * (parentWidth - 4)) / childrenWidth;
});

watch(
  () => rateY.value,
  (newVal) => {
    if (newVal <= 0) {
      (scrollbar?.wrapElement as HTMLDivElement).scrollTop = 0;
      return;
    }
    if (scrollbar) {
      (scrollbar?.wrapElement as HTMLDivElement).scrollTop =
        (parentHeight * rateY.value) / 100;
    }
  }
);

watch(
  () => rateX.value,
  (newVal) => {
    if (newVal <= 0) {
      (scrollbar?.wrapElement as HTMLDivElement).scrollLeft = 0;
      return;
    }
    if (scrollbar) {
      (scrollbar?.wrapElement as HTMLDivElement).scrollLeft =
        (parentWidth * rateX.value) / 100;
    }
  }
);

watch(
  () => props.scrollTop,
  (newVal) => {
    if (newVal <= 0) {
      rateY.value = 0;
      return;
    }
    if (scrollbar) {
      rateY.value = (newVal / parentHeight) * 100;
    }
  }
);

watch(
  () => props.scrollLeft,
  (newVal) => {
    if (newVal <= 0) {
      rateX.value = 0;
      return;
    }
    if (scrollbar) {
      rateX.value = (newVal / parentWidth) * 100;
    }
  }
);
</script>
