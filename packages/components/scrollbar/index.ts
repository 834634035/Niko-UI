import _scrollbar from './src/scrollbar.vue';
import { withInstall } from "@niko/utils/with-install";

const Scrollbar = withInstall(_scrollbar);

export default Scrollbar;

declare module 'vue' {
    export interface GlobalComponents {
        NkScrollbar: typeof Scrollbar;
    }
}


export * from './src/scrollbar'
