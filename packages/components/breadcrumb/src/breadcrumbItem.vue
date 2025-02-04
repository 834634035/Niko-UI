<template>
    <div :class="bem.b()">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '@niko/utils/create';

import { breadcrumbItemProps } from './breadcrumbItem'

const bem = createNamespace('breadcrumb-item');

const props = defineProps(breadcrumbItemProps)

</script>