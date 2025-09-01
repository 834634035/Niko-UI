import _watermark from './src/watermark.vue';
import { withInstall } from "@niko/utils/with-install";

const Watermark = withInstall(_watermark);

export default Watermark;

declare module 'vue' {
    export interface GlobalComponents {
        NkWatermark: typeof Watermark;
    }
}


export * from './src/watermark'

