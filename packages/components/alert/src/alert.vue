<template>
    <div :class="[bem.b(), bem.e(type), bem.e(effect)]" v-if="status">
        <div :class="bem.e('centent')">
            <span :class="[bem.e('title'), bem.is('center', center)]">{{ title }}</span>
            <span :class="[bem.e('description'), bem.is('center', center)]">{{ description }}</span>
        </div>
        <nk-icon v-if="closable" :class="bem.e('icon')" :color="color" :size="14" @click="close">
            <X></X>
        </nk-icon>
    </div>
</template>
<script lang="ts" setup>
import { createNamespace } from "@niko/utils/create";

import { alertEmits, alertProps } from './alert'

import X from "@niko/components/internal-icon/x";
import { computed, ref } from "vue";

defineOptions({
    name: 'nk-alert'
})

const bem = createNamespace('alert');


const prop = defineProps(alertProps);
const emit = defineEmits(alertEmits);

const color = computed(()=> prop.effect === 'dark' ? '#ffffff' : '#a8abb2')

const status = ref(true)

const close = () => {
    status.value = false
    emit('close')
}


</script>