import _backtop from './src/backtop.vue';
import { withInstall } from "@niko/utils/with-install";

const Backtop = withInstall(_backtop);

export default Backtop;

declare module 'vue' {
    export interface GlobalComponents {
        NkBacktop: typeof _backtop;
    }
}

export * from './src/backtop'
