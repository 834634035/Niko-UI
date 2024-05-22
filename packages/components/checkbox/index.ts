import _Checkbox from './src/checkbox.vue';
import { withInstall } from "@niko/utils/with-install";

const Checkbox = withInstall(_Checkbox);

export default Checkbox;

declare module 'vue' {
    export interface GlobalComponents {
        NkCheckbox: typeof _Checkbox;
    }
}

export * from './src/checkbox'
