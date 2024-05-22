<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSelected ? true : false),
      bem.is('disabled', node.disabled),
    ]"
  >
    <div
      :class="[bem.e('content')]"
      :style="{ paddingLeft: `${node.level * 16}px` }"
    >
      <span
        :class="[
          bem.e('expand-icon'),
          { expanded: expanded && !node.isLeaf },
          bem.is('leaf', node.isLeaf),
        ]"
        @click="handleExpand"
      >
        <nk-icon size="24">
          <Switcher v-if="!isLoading"></Switcher>
          <Loading v-else></Loading>
        </nk-icon>
      </span>
      <nk-checkbox
        v-if="showCheckbox"
        :model-value="checked"
        :disabled="node.disabled"
        :indeterminate="indeterminate"
        @change="handleCheckChange"
      >
      </nk-checkbox>
      <span @click="handleSeleted" :class="[bem.e('label')]">
        <NKTreeNodeContent :node="node"></NKTreeNodeContent>
        <!-- {{ node?.label }} -->
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { treeNodeProps, treeNodeEmitts } from "./tree";
import { createNamespace } from "@niko/utils/create";
import Switcher from '@niko/components/internal-icon/Switcher';
import Loading from "@niko/components/internal-icon/Loading";
import NkIcon from "@niko/components/icon/src/icon.vue";
import { computed } from "vue";
import NKTreeNodeContent from "./tree-node-content";
import NKCheckbox from "@niko/components/checkbox/src/checkbox.vue";
const bem = createNamespace("tree-node");
const props = defineProps(treeNodeProps);

const emit = defineEmits(treeNodeEmitts);
function handleExpand() {
  emit("toggle", props.node);
}

const isLoading = computed(() => {
  return props.loadingKeys.has(props.node.key);
});

const isSelected = computed(() => {
  return props.selectedKeys?.includes(props.node.key);
});

function handleSeleted() {
  if (props.node.disabled) return;
  emit("select", props.node);
}

function handleCheckChange(val: boolean) {
  emit("check", val, props.node);
}
</script>
