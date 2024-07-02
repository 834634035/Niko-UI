import _rate from './src/rate.vue';
import { withInstall } from "@niko/utils/with-install";

const Rate = withInstall(_rate);

export default Rate;

declare module 'vue' {
    export interface GlobalComponents {
        NkRate: typeof Rate;
    }
}


export * from './src/rate'
