import _drawer from "./src/drawer.vue";
import { withInstall } from "@niko/utils/with-install";

const Drawer = withInstall(_drawer);

export default Drawer;

declare module "vue" {
  export interface GlobalComponents {
    NkDrawer: typeof Drawer;
  }
}

export * from './src/drawer.vue'
