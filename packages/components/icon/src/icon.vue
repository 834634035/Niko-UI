<template>
    <i :class="bem.b()" :style="style">
        <slot></slot>
    </i>
</template>

<script setup lang="ts">
import { createNamespace } from '@niko/utils/create'
import { iconProps } from './icon'
import { computed,defineOptions } from 'vue';
defineOptions({
    name: 'nk-icon'
})
const bem = createNamespace('icon')


const props = defineProps(iconProps)
// 计算属性，计算样式处理


const style = computed(() => {
    if (!props.size && !props.color) return {};
    return {
        ...props.size ? { 'font-size': props.size + 'px' } : {},
        ...props.color ? { 'color': props.color } : {},
    }
})


</script>
