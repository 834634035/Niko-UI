<template>
    <div :class="[rem.b()]" :style="styleObj" ref="backtopRef" @click="handleClick" v-show="show">

        <template v-if="!$slots.default">
            <div :class="rem.e('icon')">
            </div>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";
import { backtopProps, backtopEmits } from './backtop'
import { computed, ref } from "vue";


defineOptions({
    name: 'NkBacktop'
})
const rem = createNamespace('backtop')

const props = defineProps(backtopProps)
const emit = defineEmits(backtopEmits)


const backtopRef = ref<HTMLElement>()

const styleObj = computed(() => {
    return {
        // position: 'fixed',
        bottom: props.bottom + 'px',
        right: props.right + 'px',
    }
})

const show = ref(false)

window.addEventListener('scroll', () => {
    if (window.scrollY > props.visibilityHeight) {
        show.value = true
    } else {
        show.value = false
    }
})

const handleClick = (evt: MouseEvent) => {
    evt.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
    emit('click', evt)
}

</script>