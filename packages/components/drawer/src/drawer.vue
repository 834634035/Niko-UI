<template>
    <Transition :name="`nk-drawer-fade-${direction}`" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
        <div :class="[bem.b()]" :style="drawerStyle" ref="drawerRef" v-show="modelValue">
            <div :class="[bem.e('content'), direction]" ref="contentRef" :style="contentStyle">
                <div :class="[bem.e('header')]" v-if="withHeader">
                    <div :class="[bem.e('title')]">
                        {{ title }}
                    </div>
                    <div :class="[bem.e('close')]" v-if="showClose">
                        <nk-icon :class="bem.e('icon')" :size="20" @click="close">
                            <X></X>
                        </nk-icon>
                    </div>
                </div>
                <div :class="[bem.e('body')]">
                    <slot></slot>
                </div>
            </div>
        </div>
    </Transition>

</template>
<script lang="ts" setup>

import { createNamespace } from "@niko/utils/create";
import { drawerProps, drawerEmits } from './drawer'
import X from "@niko/components/internal-icon/x";
import { computed, onMounted, ref, watch } from "vue";

defineOptions({
    name: "NkDrawer"
})

const bem = createNamespace("drawer");

const props = defineProps(drawerProps)
const emit = defineEmits(drawerEmits)


const drawerRef = ref<HTMLDivElement | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);
onMounted(() => {
    (drawerRef.value as HTMLDivElement).addEventListener('click', (event: FocusEvent) => {
        console.log(event)
        if (!props.closeOnClickModal) {
            return
        }
        if (event.target !== contentRef.value) {
            close()
        }
    })
})

const drawerStyle = computed(() => {
    const style: any = {}

    if (!props.modal) {
        style.backgroundColor = 'transparent'
    }

    if (props.zIndex) {
        style.zIndex = props.zIndex
    }

    return style
})

const contentStyle = computed(() => {
    const style: any = {}
    let str = 'width'
    if (props.direction) {
        switch (props.direction) {
            case 'rtl':
                break;
            case 'ltr':
                break;
            case 'ttb':
                str = 'height'
                break;
            case 'btt':
                str = 'height'
                break;
        }
    }

    if (props.size) {
        if (typeof props.size === 'number') {
            style[str] = props.size + 'px'
        } else if (typeof props.size === 'string') {
            style[str] = props.size.includes('%') ? props.size : Number(props.size) + 'px'
        }
    }

    return style

})

const close = () => {
    emit("close")
}

const onAfterEnter = () => {
    emit("opened")
}
const onAfterLeave = () => {
    emit("closed")

}

watch(() => props.modelValue, (newValue) => {
    if (newValue) {
        emit("open")
        if (props.lockScroll) {
            document.body.style.overflow = 'hidden'
        }
    } else{
        if (props.lockScroll) {
            document.body.style.overflow = ''
        }
    }
})



defineExpose({
    handleClose: close
})


</script>