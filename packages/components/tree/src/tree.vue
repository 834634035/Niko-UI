<template>
  <div :class="bem.b()">
    <nk-virtual-list :items="flattenTree" :remain="8" :size="35">
      <template #default="{ node }">
        <nk-tree-node
          :key="node.key"
          :node="node"
          :expanded="isExpanded(node)"
          :selectedKeys="selectedKeysRef"
          :loadingKeys="loadingKeysRef"
          :showCheckbox="showCheckbox"
          :checked="isChecked(node)"
          :disabled="isDisabled(node)"
          :indeterminate="isIndeterminate(node)"
          @select="handleSelect"
          @toggle="toggleExpand"
          @check="toggleCheck"
        >
        </nk-tree-node>
      </template>
    </nk-virtual-list>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, toRef, provide, onMounted } from "vue";
import {
  treeProps,
  TreeNode,
  TreeOption,
  Key,
  treeEmitts,
  treeInjectKey,
} from "./tree";
import { computed } from "vue";
import { createNamespace } from "@niko/utils/create";
import NkTreeNode from "./treeNode.vue";
// import NkVirtualList from "../../viryual-list/index";
import NkVirtualList from "@niko/components/viryual-list";
import { useSlots } from "vue";

const bem = createNamespace("tree");

defineOptions({
  name: "nk-tree",
});

const props = defineProps(treeProps);

const tree = ref<TreeNode[]>([]);

function createOptions(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string;
    },
    getLabel(node: TreeOption) {
      return node[label] as string;
    },
    getChildren(node: TreeOption) {
      return (node[children] as TreeOption[]) || [];
    },
  };
}

const treeOptions = createOptions(
  props.keyField,
  props.labelField,
  props.childrenField
);
function createTree(data: TreeOption[], parent: TreeNode | null = null) {
  function traversal(data: TreeOption[], parent: TreeNode | null = null): any {
    return data.map((node) => {
      const children = treeOptions.getChildren(node) || [];

      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [],
        rawNode: node,
        disabled: !!node.disabled,
        level: parent ? (parent.level as number) + 1 : 0,
        isLeaf: node.isLeaf ?? children.length == 0,
        parentKey: parent?.key,
      };

      if (children.length) {
        treeNode.children = traversal(children, treeNode);
      }

      return treeNode;
    });
  }

  const result: TreeNode[] = traversal(data, parent);

  return result;
}

watch(
  () => props.data,
  (newValue: TreeOption[]) => {
    tree.value = createTree(newValue);
  },
  { immediate: true }
);

// 需要展开的节点
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys));

const flattenTree = computed(() => {
  const expandedKeys = expandedKeysSet.value;

  const flattenNodes: TreeNode[] = [];

  const nodes = tree.value || [];

  const stack: TreeNode[] = []; // 用于遍历树的栈

  for (let i = nodes.length; i >= 0; --i) {
    stack.push(nodes[i]);
  }

  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;
    flattenNodes.push(node);

    if (expandedKeys.has(node.key)) {
      const children = node.children || [];
      if (children.length) {
        for (let i = children.length - 1; i >= 0; --i) {
          stack.push(children[i]);
        }
      }
    }
  }

  return flattenNodes;
});

function isExpanded(node: TreeNode): boolean {
  return expandedKeysSet.value.has(node.key);
}

// 折叠功能
function collpase(node: TreeNode) {
  expandedKeysSet.value.delete(node.key);
}

const loadingKeysRef = ref(new Set<Key>());
function triggerLoading(node: TreeNode) {
  // 这个节点需要异步加载
  if (!node.children.length && !node.isLeaf) {
    // 如果没有加载过这个节点，就加载节点
    let loadingKeys = loadingKeysRef.value;
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key);

      const onLoad = props.onLoad;
      if (onLoad) {
        onLoad(node.rawNode).then((children) => {
          // 修改原来的节点
          node.rawNode.children = children;

          // 更新自定义的node
          node.children = createTree(children, node);
          loadingKeys.delete(node.key);
        });
      }
    }
  }
}
// 展开功能
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key);
  triggerLoading(node);
}
// 切换展开功能
function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeysSet.value;
  if (expandKeys.has(node.key) && !loadingKeysRef.value.has(node.key)) {
    collpase(node);
  } else {
    expand(node);
  }
}

// 实现选中节点
const emit = defineEmits(treeEmitts);

const selectedKeysRef = ref<Key[]>([]);

watch(
  //   toRef(props, "value"),
  () => props.value,
  (value) => {
    if (value) {
      selectedKeysRef.value = value;
    }
  },
  {
    immediate: true,
  }
);

// 处理选中的节点
function handleSelect(node: TreeNode) {
  let keys = Array.from(selectedKeysRef.value);
  if (!props.selectable) return;

  if (props.multiple) {
    let index = keys.findIndex((key) => key === node.key);
    if (index > -1) {
      keys.splice(index, 1);
    } else {
      keys.push(node.key);
    }
  } else {
    if (keys.includes(node.key)) {
      keys = [];
    } else {
      keys = [node.key];
    }
  }

  emit("update:value", keys);
}

provide(treeInjectKey, {
  slots: useSlots(),
});

// 默认选中的节点
const checkedKeysRefs = ref(new Set(props.defaultCheckedKeys));

function isChecked(node: TreeNode) {
  return checkedKeysRefs.value.has(node.key);
}

function isDisabled(node: TreeNode) {
  return node.disabled;
}

const indeterminateRefs = ref<Set<Key>>(new Set());
function isIndeterminate(node: TreeNode) {
  return indeterminateRefs.value.has(node.key);
}

// 自上而下的选中
function toggle(checked: boolean, node: TreeNode) {
  if(!node) return
  const checkKeys = checkedKeysRefs.value;

  if (checked) {
    // 去掉半选状态
    indeterminateRefs.value.delete(node.key);
  }
  // 维护当前key列表
  checkKeys[checked ? "add" : "delete"](node.key);

  const children = node.children;
  if (children) {
    children.forEach((childNode) => {
      if (!childNode.disabled) {
        toggle(checked, childNode);
      }
    });
  }
}

// 自下而上的处理
function updateCheckedKeys(node:TreeNode){
  if(!node) return
  if(node.parentKey){
    let parentNode = findNode(node.parentKey);


    // 如果父节点存在
    if(parentNode){
      let allChecked = true; // 默认儿子应该全选
      let hasChecked = false; // 儿子有没有被选中

      let nodes = parentNode.children;
      for(const node of nodes){
        if(checkedKeysRefs.value.has(node.key)){
          hasChecked = true
        }else if(indeterminateRefs.value.has(node.key)){
          allChecked = false;
          hasChecked = true;
        }else{
          allChecked = false;
        }
      }



      // 如果子节点都选中，父节点也选中
      if(allChecked){
        checkedKeysRefs.value.add(parentNode.key)
        indeterminateRefs.value.delete(parentNode.key)
      }else if(hasChecked){
        // 如果有一些选中，则是半选状态
        indeterminateRefs.value.add(parentNode.key)
        checkedKeysRefs.value.delete(parentNode.key)
      }else{
        indeterminateRefs.value.delete(parentNode.key)
      }



      updateCheckedKeys(parentNode)
    }


  }
}

function findNode(key:Key){
  return flattenTree.value.find(node => node.key === key);
}
function toggleCheck(checked: boolean, node: TreeNode) {
  toggle(checked, node);



  updateCheckedKeys(node);
}

onMounted(() => {
  checkedKeysRefs.value.forEach((key: Key) => {
    toggleCheck(true,findNode(key)!);
  });
});
</script>
