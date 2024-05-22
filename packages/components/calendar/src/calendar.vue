<template>
  <div :class="[bem.b()]">
    <div :class="[bem.e('header')]">
      <div :class="[bem.e('title')]">{{ currentDate }}</div>
      <div :class="[bem.e('button-group')]">
        <nk-button @click="($event) => seleDate('prev-year')">前一年</nk-button>
        <nk-button @click="($event) => seleDate('prev-month')"
          >上个月</nk-button
        >
        <nk-button @click="($event) => seleDate('today')">今天</nk-button>
        <nk-button @click="($event) => seleDate('next-month')"
          >下个月</nk-button
        >
        <nk-button @click="($event) => seleDate('next-year')">后一年</nk-button>
      </div>
    </div>
    <div :class="[bem.e('body')]">
      <table :class="[bemTable.b()]" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th v-for="day in weekDays">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rid) in rows" :key="rid">
            <td
              v-for="(cell, cellid) in row"
              :key="cellid"
              :class="[bemDay.b(), getCellClass(cell)]"
              @click="handlePick(cell)"
            >
              <slot name="date-cell" :data="getSlotData(cell)">
                {{ cell.text }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import NkButton from "@niko/components/button";
import { createNamespace } from "@niko/utils/create.js";
import {
  CalendarDateCell,
  calendarEmit,
  calendarProps,
  CalendarDateType,
  CalendarDateCellType,
} from "./calendar";
import { computed, ref } from "vue";
const bem = createNamespace("calendar");
const bemTable = createNamespace("calendar-table");
const bemDay = createNamespace("calendar-day");

const props = defineProps(calendarProps);
const emit = defineEmits(calendarEmit);
const now = dayjs();
const date = computed(() => {
  if (!props.modelValue) {
    return now;
  } else {
    return dayjs(props.modelValue);
  }
});

defineOptions({
  name: "nk-calendar",
});

dayjs.locale("zh-cn");
// 0 - 6  0周日   6周六
const firstDayofWeek = dayjs().startOf("week").day();

// 日历表头
const weekMaping = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

const weekDays = computed(() => {
  return [
    ...weekMaping.slice(firstDayofWeek),
    ...weekMaping.slice(0, firstDayofWeek),
  ];
});

// 日历面板
const rows = computed(() => {
  let list: CalendarDateCell[] = [];
  // 获取本月第一天是星期几
  const firstDay = date.value.startOf("month").day();

  const lastDay = date.value.subtract(1, "month").endOf("month").date();

  const count = firstDay - firstDayofWeek; // 前面有6天

  // 获取上个月份的显示数据
  const prewMonthDay: CalendarDateCell[] = Array.from({ length: count })
    .map((e, i) => lastDay - (count - i - 1))
    .map((_) => {
      return {
        text: _,
        type: "prev",
      };
    });

  // 获取当前月份有多少天
  const days = date.value.daysInMonth();

  // 当前月天数
  const currentMonthDays: CalendarDateCell[] = Array.from({ length: days }).map(
    (_, i) => {
      return {
        text: i + 1,
        type: "current",
      };
    }
  );

  list = [...prewMonthDay, ...currentMonthDays];

  let remaning = 42 - list.length;

  // 下个月天数
  const nextMonthDays: CalendarDateCell[] = Array.from({
    length: remaning,
  }).map((_, i) => {
    return {
      text: i + 1,
      type: "next",
    };
  });

  list = [...list, ...nextMonthDays];

  return Array.from({ length: 6 }).map((_, i) => {
    const start = i * 7;
    const end = (i + 1) * 7;
    return list.slice(start, end);
  });
});

const prevMonthDay = computed(() => date.value.subtract(1, "month").date(1));
const prevYearDay = computed(() => date.value.subtract(1, "year").date(1));
const nextYearDay = computed(() => date.value.add(1, "year").date(1));
const nextMonthDay = computed(() => date.value.add(1, "month").date(1));

function pickDay(day: Dayjs) {
  selectDay.value = day; // 触发父组件更新
  emit("update:modelValue", day.toDate());
}
// 快捷按钮
function seleDate(type: CalendarDateType) {
  const dateMap: Record<CalendarDateType, Dayjs> = {
    "prev-year": prevYearDay.value,
    "next-year": nextYearDay.value,
    "prev-month": prevMonthDay.value,
    "next-month": nextMonthDay.value,
    today: now,
  };

  const day = dateMap[type];

  pickDay(day);
}

function formatter(text: number, type: CalendarDateCellType): Dayjs {
  switch (type) {
    case "prev":
      return date.value.startOf("month").subtract(1, "month").date(text);
    case "current":
      return date.value.date(text);
    case "next":
      console.log(date.value);
      return date.value.startOf("month").add(1, "month").date(text);
  }
}
const selectDay = ref<Dayjs>(); // 当前用户选中的日期
  // 点击日期
function handlePick({ text, type }: CalendarDateCell) {
  // 根据type判断是点击了日历的日期还是上下月按钮
  let day = formatter(text, type);
  console.log(dayjs(day).format("YYYY-MM-DD"));
  // 保存选中的日期
  selectDay.value = day;
  pickDay(day);
}

function getCellClass({ text, type }: CalendarDateCell) {
  const className: string[] = [type];

  const date = formatter(text, type);
  // 如果选中日期相同，则添加选中样式
  if (date.isSame(selectDay.value, "day")) {
    className.push(bemDay.is("selected", true));
  }

  return className;
}

const currentDate = computed(() => {
  return `${date.value.year()}年${
    date.value.month() + 1
  }月${date.value.date()}日`;
});

function getSlotData({ type, text }:CalendarDateCell){
  const date = formatter(text, type);

  return {
    isSelected: date.isSame(selectDay.value),
    day: date.format("YYYY-MM-DD"),
    date: date.toDate(),
  };


    // date: date.value.format("YYYY-MM-DD"),
    // type: type.value,
    // isToday: date.value.isSame(dayjs(), "day"),
    // isDisabled: isDisabled(date.value.format("YYYY-MM-DD"), type.value),
    // isStart: isStart()
}
</script>
