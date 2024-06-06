import _option from './src/option.vue'
import _optionList from './src/optionList.vue'
import { withInstall } from '@niko/utils/with-install'

const Option = withInstall(_option);
export default Option;

const OptionList = withInstall(_optionList);

declare module 'vue' {
    export interface GlobalComponents {
        Nkoption: typeof Option,
        NkoptionList: typeof OptionList,
    }
}

export * from './src/option'
