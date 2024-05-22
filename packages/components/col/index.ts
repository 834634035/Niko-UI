import _col from './src/col.vue';
import { withInstall } from "@niko/utils/with-install";

const Col = withInstall(_col);

export default Col;

declare module 'vue' {
    export interface GlobalComponents {
        NkCol: typeof Col;
    }
}


export * from './src/col'
