import { ExtractPropTypes, PropType } from "vue";

export const calendarProps = {
  modelValue: {
    type: Date,
  },
  range: {
    type: Array as unknown as PropType<[Date, Date]>,
  },
} as const;

export type CalendarProps = ExtractPropTypes<typeof calendarProps>;

export const calendarEmit = {
  "update:modelValue": (val: Date) => val instanceof Date,
};

export type CalendarEmits = typeof calendarEmit;

export type CalendarDateCellType = "prev" | "current" | "next";
export type CalendarDateCell = {
  text: number;
  type: CalendarDateCellType;
};

export type CalendarDateType = "prev-year" | "prev-month" | "today" | "next-month" | "next-year";
