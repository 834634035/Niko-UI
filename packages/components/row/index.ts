import _row from './src/row.vue';
import { withInstall } from "@niko/utils/with-install";

const Row = withInstall(_row);

export default Row;

declare module 'vue' {
    export interface GlobalComponents {
        NkRow: typeof Row;
    }
}


export * from './src/row'
