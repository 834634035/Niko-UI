import _button from './src/button.vue';
import { withInstall } from "@niko/utils/with-install";

const Button = withInstall(_button);

export default Button;

declare module 'vue' {
    export interface GlobalComponents {
        NkButton: typeof _button;
    }
}

export * from './src/button'
