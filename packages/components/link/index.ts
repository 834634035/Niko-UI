import _link from './src/link.vue';
import { withInstall } from "@niko/utils/with-install";

const Link = withInstall(_link);

export default Link;

declare module 'vue' {
    export interface GlobalComponents {
        NkLink: typeof Link;
    }
}


export * from './src/link'
