<template>
    <transition name="nk-notification-fade" @enter="onEnter" @after-leave="onAfterLeave">
        <div :class="[bem.b(), bem.e(type)]" ref="notificationRef" v-show="showStatus" :style="styleObj">
            <div :class="[bem.e('title')]">
                {{ title }}
            </div>
            <div :class="[bem.e('close')]">
                <nk-icon v-if="showClose" :class="bem.e('icon')" :color="color" :size="16" @click="close">
                    <X></X>
                </nk-icon>
            </div>
            <div :class="[bem.e('content')]">
                {{ message }}
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import X from "@niko/components/internal-icon/x";
import { computed, onMounted, ref, watch } from "vue";
import { NotificationEmits, notificationPropsType } from './notification'
import nkIcon from '../../icon'
const bem = createNamespace("notification");

const props = defineProps(notificationPropsType)
const emits = defineEmits(NotificationEmits)

const showStatus = ref<boolean>(false)
const color = ref<string>('#a8abb2')

const notificationRef = ref<HTMLDivElement>()

// const styleObj = ref<any>({
//     top: '20px'
// })
// watch(() => props.offsetTop, () => {
//     // console.log('触发通知组件的监听')
//     styleObj.value.top = `${props.offsetTop}px`

//     // styleObj.value.willChange = 'opacity, transform'
// }, { immediate: true })

const styleObj = computed(() => {
    return {
        top: `${props.offsetTop}px`
    }
})


onMounted(() => {
    showStatus.value = true
})
const close = () => {
    showStatus.value = false
    // console.log('这个不走吗')
    emits('close')
}
const onEnter = () => {
    if (props.duration === 0) {
        return
    } else {
        setTimeout(() => {
            close()
        }, props.duration)
    }
}
const onAfterLeave = () => {
    // console.log('这时候关闭了')
    props.onDestroy(notificationRef.value?.getAttribute('id'))
}
</script>