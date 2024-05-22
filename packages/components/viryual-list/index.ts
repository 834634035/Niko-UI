import _Virtaul from './src/virtaul';
import { withInstall } from "@niko/utils/with-install";

const Virtaul = withInstall(_Virtaul);

export default Virtaul;

declare module 'vue' {
    export interface GlobalComponents {
        NkVirtaulList: typeof _Virtaul;
    }
}


// export * from './src/virtaul'