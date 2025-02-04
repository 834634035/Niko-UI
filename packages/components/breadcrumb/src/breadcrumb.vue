<template>
    <div :class="bem.b()">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>

import { createNamespace } from '@niko/utils/create'
import { breadcrumbProps } from './breadcrumb'

defineOptions({
    name: 'nk-breadcrumb'
})

const bem = createNamespace('breadcrumb')
const props = defineProps(breadcrumbProps)


</script>