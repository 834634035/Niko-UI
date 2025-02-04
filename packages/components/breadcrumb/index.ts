import _breadcrumb from './src/breadcrumb.vue';
import { withInstall } from "@niko/utils/with-install";

const Breadcrumb = withInstall(_breadcrumb);

export default Breadcrumb;

declare module 'vue' {
    export interface GlobalComponents {
        NkBreadcrumb: typeof _breadcrumb;
    }
}

export * from './src/breadcrumb'
