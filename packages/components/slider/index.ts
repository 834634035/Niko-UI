import _slider from './src/slider.vue';
import { withInstall } from "@niko/utils/with-install";

const Slider = withInstall(_slider);

export default Slider;

declare module 'vue' {
    export interface GlobalComponents {
        NkSlider: typeof Slider;
    }
}


export * from './src/slider'
