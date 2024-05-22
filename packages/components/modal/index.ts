import _modal from './src/modal.vue';
import { withInstall } from "@niko/utils/with-install";

const Modal = withInstall(_modal);

export default Modal;

declare module 'vue' {
    export interface GlobalComponents {
        NkModal: typeof Modal;
    }
}


export * from './src/modal'
