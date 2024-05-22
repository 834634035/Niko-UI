declare module '*.vue'{
    import type { DefineConponent } from "vue"

    const component: DefineConponent<{},{},any>

    export default component
}