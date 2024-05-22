import { ExtractPropTypes, PropType } from "vue";

export const checkboxProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
  },
  indeterminate: Boolean,
  disabled: Boolean,
  label:{
    type:String as PropType<string>,
    default:''
  }
} as const;


export type CheckboxProps = Partial<ExtractPropTypes<typeof checkboxProps>>;


export const checkboxEmits = {
    'update:modelValue':(value:boolean | string | number) => String(value) || Number(value) || Boolean(value),
    change:(value:boolean) => String(value) || Number(value) || Boolean(value),

}

export type CheckboxEmits = typeof checkboxEmits;