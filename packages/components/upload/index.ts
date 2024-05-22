import _upload from './src/upload.vue';
import { withInstall } from "@niko/utils/with-install";

const Upload = withInstall(_upload);

export default Upload;

declare module 'vue' {
    export interface GlobalComponents {
        NkUpload: typeof Upload;
    }
}


export * from './src/upload'
