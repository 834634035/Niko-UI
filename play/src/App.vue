<script setup lang="ts">
import dayjs from "dayjs";
import { reactive, ref, triggerRef } from "vue";
import { TreeOption, Key } from "@niko/components/tree/src/tree";
import Switcher from "@niko/components/internal-icon/Switcher";
import { FormInstance } from "@niko/components/form/index";
import { UploadRawFile } from "@niko/components/upload";

function createData(level = 4, baseKey = ""): any {
  if (!level) return undefined;
  const arr = new Array(6 - level).fill(0);
  return arr.map((_, index: number) => {
    const key = "" + baseKey + level + index;
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key),
    };
  });
}

function createLabel(level: number): string {
  if (level === 4) return "道生一";
  if (level === 3) return "一生二";
  if (level === 2) return "二生三";
  if (level === 1) return "三生万物";
  return "";
}

const data = ref(createData());

function createData1() {
  return [
    {
      label: nextLabel(),
      key: 1,
      isLeaf: false,
    },
    {
      label: nextLabel(),
      key: 2,
      isLeaf: false,
    },
  ];
}

const data1 = ref(createData1());

function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) return "1111111111111";
  if (currentLabel === "1111111111111") return "2222222222222";
  if (currentLabel === "2222222222222") return "3333333333333";
  if (currentLabel === "3333333333333") return "4444444444444";
  if (currentLabel === "4444444444444") return "5555555555555";
  if (currentLabel === "5555555555555") return "6666666666666";
  return "";
}

const handleLoad = (node: TreeOption) => {
  return new Promise<TreeOption[]>((resolve) => {
    setTimeout(() => {
      resolve([
        // 动态加载进去
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false,
        },
      ]);
    }, 1000);
  });
};

const data2 = ref<any[]>([
  {
    key: "0",
    label: "0",
    children: [
      {
        key: "0-0",
        label: "0-0",
      },

      {
        disabled: true,
        key: "0-1",
        label: "0-1",
        children: [
          {
            label: "0-1-0",
            key: "0-1-0",
          },
          {
            label: "0-1-0",
            key: "0-1-0",
          },
        ],
      },
    ],
  },
]);

const value = ref<Key[]>([]);

const check = ref(true);

const handleClick = (e: any) => {
  console.log(e);
};

const inputValue = ref("hello");

const handleFocus = (e: FocusEvent) => {
  console.log("focus");
  console.log((e.target as HTMLInputElement).value);
};

const handleBlur = (e: FocusEvent) => {
  console.log("blur");
  console.log((e.target as HTMLInputElement).value);
};

const formData = reactive({
  name: "",
  pswd: "",
});

const formRef = ref<FormInstance>();

const submit = () => {
  formRef.value?.validate((res, rej) => {
    console.log(res);
    console.log(rej);
  });
};

const calendarDate = ref(new Date());

const handleBuforeUpload = (file: UploadRawFile) => {
  // console.log('这是父组件')
  // return false;
};

const modalShow = ref(false);
const close = () => {
  modalShow.value = false;
  console.log("关闭");
};
</script>

<template>
  <!-- <nk-icon :color="'red'" :size="100">
    <Switcher></Switcher>
  </nk-icon> -->

  <!-- 传递一个树形结构数据 -->
  <!-- <nk-tree :data="data" label-field="label" key-field="key" children-field="children"
    :default-expanded-keys="['40', '41']">
  </nk-tree> -->

  <!-- {{ value }} -->
  <!-- <nk-tree
    :data="data"
    v-model:value="value"
    selectable
    show-checkbox
    :default-checked-keys="['40', '41']"
  >
    <template #default="{ node }">
      {{ node.key }}
      {{ node.label }}
    </template>
  </nk-tree> -->

  <!-- <nk-checkbox
    v-model="check"
    :disabled="false"
    :indeterminate="true"
    :label="'节点'"
    @change="(e) => console.log(e)"
  >
    节点2
  </nk-checkbox> -->

  <!-- <nk-button
    size="medium"
    type="danger"
    :round="true"
    icon-placement="left"
    @click="handleClick"
  >
    按钮
    <template #icon>
      <nk-icon>
        <Switcher></Switcher>
      </nk-icon>
    </template>
  </nk-button> -->

  <!-- <nk-input
    v-model="inputValue"
    :placeholder="'请输入'"
    @blur="handleBlur"
    @focus="handleFocus"
    :show-password="true"
    :clearable="true"
  >
    <template #prepend> 前置 </template>
    <template #prefix>
      <nk-icon>
        <Switcher></Switcher>
      </nk-icon>
    </template>
    <template #suffix>
      <nk-icon>
        <Switcher></Switcher>
      </nk-icon>
    </template>
    <template #append> 后置 </template>
  </nk-input> -->

  <!-- <nk-form
    ref="formRef"
    :model="formData"
    :rules="{
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        {
          min: 3,
          max: 5,
          message: '长度在 3 到 5 个字符',
          trigger: ['blur', 'change'],
        },
      ],
      age: [{ type: 'number', message: '年龄必须为数字值' }],
      pswd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    }"
  >
    <nk-form-item label="姓名" :label-width="100" prop="name">
      <template #label>姓名</template>
      <nk-input v-model="formData.name" :placeholder="'请输入'"></nk-input>
    </nk-form-item>

    <nk-form-item label="密码" :label-width="100" prop="pswd">
      <template #label>密码</template>
      <nk-input
        v-model="formData.pswd"
        type="password"
        :placeholder="'请输入密码'"
      ></nk-input>
    </nk-form-item>
  </nk-form>
  <nk-button a="1" b="2" size="medium" @click="submit"> 提交 </nk-button> -->

  <!-- <nk-upload :before-upload="handleBuforeUpload" drag>
    <nk-button>点击上传</nk-button>
  </nk-upload> -->

  <!-- <nk-calendar v-model="calendarDate">
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '√' : '' }}
      </p>
    </template>
  </nk-calendar> -->

  <!-- <nk-button @click="modalShow = true">展开</nk-button> -->
  <nk-modal
    v-model="modalShow"
    :modal="false"
    width="1000"
    :close-on-click-modal="false"
    title="这是标题"
    @close="close"
    :show-close="false"
  >
    哈哈哈哈哈哈
    <!-- <template #header>
      我这是头部测试的
    </template> -->
    <!-- <template #footer>
      我这是底部测试的
    </template> -->
  </nk-modal>

  <!-- <nk-row :gutter="30">
    <nk-col :span="1">1</nk-col>
    <nk-col :span="2">2</nk-col>
    <nk-col :span="3">3</nk-col>
    <nk-col :span="4">4</nk-col>
    <nk-col :span="5">5</nk-col>
  </nk-row> -->

  <nk-link type="danger"> 这是测试链接 </nk-link>

  <nk-scrollbar height="200">
    <!-- <div v-for="item in 20" :key="item" style="height:80px;width:1000px; background-color: aqua;">这是测试{{ item }}</div> -->
    <div class="scrollbar-flex-content">
      <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </nk-scrollbar>
</template>
<style scoped>
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: #e0e;
  color: #cdc;
}
</style>
