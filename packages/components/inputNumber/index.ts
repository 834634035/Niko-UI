import _inputNumber from './src/inputNumber.vue';
import { withInstall } from "@niko/utils/with-install";

const InputNumber = withInstall(_inputNumber);

export default InputNumber;

declare module 'vue' {
    export interface GlobalComponents {
        NkInputNumber: typeof InputNumber;
    }
}


export * from './src/inputNumber'
