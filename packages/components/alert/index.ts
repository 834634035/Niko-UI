import _alert from "./src/alert.vue";
import { withInstall } from "@niko/utils/with-install";
const Alert = withInstall(_alert);

export default Alert;

declare module "vue" {
  export interface GlobalComponents {
    NkAlert: typeof Alert;
  }
}

export * from "./src/alert";