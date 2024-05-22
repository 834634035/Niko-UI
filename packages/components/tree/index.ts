import _Tree from './src/tree.vue';
import { withInstall } from "@niko/utils/with-install";

const Tree = withInstall(_Tree);

export default Tree;

declare module 'vue' {
    export interface GlobalComponents {
        NkTree: typeof Tree;
    }
}


export * from './src/tree'