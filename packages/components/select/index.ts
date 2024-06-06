import _select from './src/select.vue';
import { withInstall } from "@niko/utils/with-install";

const Select = withInstall(_select);

export default Select;

declare module 'vue' {
    export interface GlobalComponents {
        NkSelect: typeof Select;
    }
}


export * from './src/select'
