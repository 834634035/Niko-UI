import { ExtractPropTypes, InjectionKey, PropType, SetupContext } from "vue";

export type Key = string | number;

export interface TreeOption {
  label?: Key;
  key?: Key;
  children?: TreeNode[] | [];
  isLeaf: boolean;
  disabled: boolean;
  [key: string]: unknown;
}

export interface TreeNode extends Required<TreeOption> {
  level: number;
  rawNode: TreeOption;
  children: TreeNode[];
  isLeaf: boolean;
  parentKey:Key | undefined
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => [],
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  labelField: {
    type: String,
    default: "label",
  },
  keyField: {
    type: String,
    default: "key",
  },
  childrenField: {
    type: String,
    default: "children",
  },
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  value: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  selectable: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  showCheckbox:{
    type: Boolean,
    default: false,
  },
  defaultCheckedKeys:{
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  checked:{
    type: Boolean,
    default: false,
  },
  disabled:{
    type: Boolean,
    default: false,
  },
  indeterminate:{
    type: Boolean,
    default: false,
  }
} as const;

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>,
    required: true,
  },
  selectedKeys:{
    type:Array,
  },
  showCheckbox:{
    type: Boolean,
    default: false,
  },
  checked:{
    type: Boolean,
    default: false,
  },
  indeterminate:{
    type: Boolean,
    default: false,
  }
} as const;

export const treeNodeEmitts = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node,
  check: (val: boolean,node:TreeNode) => typeof val === 'boolean',
} as const;

export const treeEmitts = {
  // 内部发射的事件用来同步响应式数据
  "update:value": (keys: Key[]) => keys
};

export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>;

export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;


export interface TreeContext{
  slots: SetupContext["slots"];
  // emit: SetupContext<typeof treeEmitts>["emit"];
}

// 此变量作为提供出去的属性
export const treeInjectKey: InjectionKey<TreeContext> = Symbol()
export const treeNodeContentProps = {
  node:{
    type:Object as PropType<TreeNode>,
    required:true
  }
}
