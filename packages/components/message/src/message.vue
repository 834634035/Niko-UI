<template>
    <Transition name="nk-fade" @before-leave="onClose" @after-leave="$emit('destroy')">
        <div v-show="visible" :class="[bem.b(), bem.e(type)]" :style="style" :id="id" ref="messageRef">
            <div :class="[bem.e('content')]">
                {{ content }}
            </div>
            <template v-if="showClose">
                <nk-icon :class="[bem.e('close')]" @click="close">
                    <X></X>
                </nk-icon>
            </template>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { createNamespace } from "@niko/utils/create";
import { computed, onMounted, ref } from 'vue'
import { getLastOffset, getOffsetOrSpace } from './queue'
import { messageProps, messageEmits } from './message'
import NkIcon from "@niko/components/icon";
import X from "@niko/components/internal-icon/x";

const bem = createNamespace("message");

defineOptions({
    name: 'NkMessage'
})

const props = defineProps(messageProps)
const emits = defineEmits(messageEmits)

const visible = ref(false);

const messageRef = ref<HTMLDivElement | null>(null);

const height = ref(0)
const lastOffset = computed(() => getLastOffset(props.id))
const offset = computed(() => {
    return getOffsetOrSpace(props.id, props.offset) + lastOffset.value
})

const bottom = computed(() => height.value + offset.value);

onMounted(() => {
    visible.value = true;
    setTimeout(() => {
        if (visible.value) {
            close()
        }
    }, 3000)

    // 创建一个ResizeObserver对象，监听messageRef的大小变化
    const myObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
            height.value = entry.borderBoxSize[0].blockSize
        });
    });
    myObserver.observe(messageRef.value as HTMLDivElement);
})




const style = computed(() => {
    return {
        top: `${offset.value}px`
    }
})


const close = () => {
    visible.value = false
}


defineExpose({
    visible,
    bottom,
    close
})

</script>