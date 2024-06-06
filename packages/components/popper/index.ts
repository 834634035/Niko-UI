import _popper from './src/popper.vue';
import { withInstall } from "@niko/utils/with-install";

const Popper = withInstall(_popper);

export default Popper;

declare module 'vue' {
    export interface GlobalComponents {
        NkPopper: typeof Popper;
    }
}


export * from './src/popper'
