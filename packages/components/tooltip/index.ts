import _tooltip from './src/tooltip.vue';
import { withInstall } from "@niko/utils/with-install";

const Tooltip = withInstall(_tooltip);

export default Tooltip;

declare module 'vue' {
    export interface GlobalComponents {
        NkTooltip: typeof Tooltip;
    }
}


// export * from './src/tooltip-content'
export * from './src/tooltip'

