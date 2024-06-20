import _radio from './src/radio.vue';
import _radioGroup from './src/radio-group.vue';
import { withInstall } from "@niko/utils/with-install";

export const Radio = withInstall(_radio);
export const RadioGroup = withInstall(_radioGroup);


declare module 'vue' {
    export interface GlobalComponents {
        NkRadio: typeof Radio;
        NkRadioGroup: typeof RadioGroup;
    }
}


export * from './src/radio'
