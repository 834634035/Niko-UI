<template>
    <div ref="watermarkRef" :style="styleObj">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue';

import { watermarkProps } from './watermark'
defineOptions({
    name: "NkWatermark",
});
const props = defineProps(watermarkProps);

const styleObj = computed(() => {
    return {
        position: 'relative',
        width: 'fit-content'
    }
})
const watermarkRef = ref<HTMLElement>()
const mutationsList = ref<MutationObserver[]>([])
const mutation = ref<MutationObserver>()
const divRef = ref<HTMLElement | null>()

const gap = computed<[number, number]>(() => {
    if (Array.isArray(props.gap)) {
        if (props.gap.length < 1) {
            return [100, 100]
        } else {
            return [Number(props.gap[0]), Number(props.gap[1])]
        }
    } else {
        return [100, 100]
    }
})
const rotate = computed(() => {
    return props.rotate ?? -22
})
const content = computed(() => {
    return props.content ?? 'Niko-UI'
})
const color = computed(() => {
    return props.color ?? 'rgba(0,0,0,.15)'
})
const fontsize = computed(() => {
    return props.fontSize ?? 16
})



onMounted(() => {
    createWatermark()

    mutation.value = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                if (divRef.value) {
                    divRef.value.remove();
                    divRef.value = null;
                }
                createWatermark();
            }
            if (mutation.removedNodes && mutation.removedNodes.length > 0) {
                if (divRef.value && Array.from(mutation.removedNodes).includes(divRef.value)) {
                    createWatermark();
                }

            }
        }
    });

    // 安装监听
    mutation.value.observe(watermarkRef.value as HTMLElement, {
        childList: true,
        attributes: true,
        subtree: true,
    });
})
onBeforeUnmount(() => {
    mutation.value!.disconnect()
})


const createWatermark = () => {

    const canvasElement = document.createElement('canvas')
    const ctx = canvasElement.getContext('2d')


    let fontSize = fontsize.value

    let text = content.value
    ctx!.font = `${fontSize}px sans-serif`
    let textWidth = ctx!.measureText(text).width

    let width = textWidth * 2 + gap.value[0]
    let height = textWidth * 2 + gap.value[1]
    canvasElement.width = width
    canvasElement.height = height


    ctx!.fillStyle = color.value;
    ctx!.font = `${fontSize}px sans-serif`

    ctx!.translate(width / 2, height / 2);

    ctx!.rotate(rotate.value * Math.PI / 180);

    // 用户设置的宽高正中间
    // ctx!.fillText(text, textWidth / 2, (textWidth + 40) / 2)
    ctx!.fillText(text, -textWidth / 2, fontSize / 2)

    // ctx!.fillRect(-5, -5, 10, 10);


    const dataURL = canvasElement.toDataURL('image/png');

    watermarkRef.value!.appendChild(renderMarkDiv(dataURL))

}
// 创建水印元素
const renderMarkDiv = (dataURL) => {
    const div = document.createElement('div')
    div.style.position = "absolute"
    div.style.left = "0"
    div.style.top = "0"
    div.style.width = "100%"
    div.style.height = "100%"
    div.style.backgroundImage = `url(${dataURL})`
    div.style.zIndex = props.zIndex.toString()
    div.style.pointerEvents = 'none'

    divRef.value = div
    return div
}

</script>