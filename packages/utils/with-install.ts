
import { App, Component, Plugin } from "vue";


export type SFCWithInstall<T> = T & Plugin
export function withInstall<T>(component:Component) {
  (component as SFCWithInstall<T>).install = function (app:App) {
    const { name } = component as { name: string };
    app.component(name, component);
  };
  return component as SFCWithInstall<T>;
}


