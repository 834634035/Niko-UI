import { ExtractPropTypes } from "vue";


export const optionProps = {
    label:{
        type:String,
        default:''
    },
    value:{
        type:String,
        default:''
    },
    disabled:{
        type:Boolean,
        default:false
    }
}

export type optionProps = ExtractPropTypes<typeof optionProps>;



