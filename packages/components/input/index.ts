import _input from './src/input.vue';
import { withInstall } from "@niko/utils/with-install";

const Input = withInstall(_input);

export default Input;

declare module 'vue' {
    export interface GlobalComponents {
        NkInput: typeof Input;
    }
}


export * from './src/input'