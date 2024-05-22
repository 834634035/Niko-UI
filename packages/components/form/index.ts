import _formItem from "./src/form-item.vue";
import _form from "./src/form.vue";
import { withInstall } from "@niko/utils/with-install";

const FormItem = withInstall(_formItem);
const Form = withInstall(_form);

export { Form, FormItem };

export type FormInstance = InstanceType<typeof _form>

declare module "vue" {
  export interface GlobalComponents {
    NkFormItem: typeof FormItem;
    NkForm: typeof Form;
  }
}

export * from "./src/form-item";


