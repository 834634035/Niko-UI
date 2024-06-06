// @ts-nocheck
import { computed, inject, toRaw, watch } from "vue";
import {
  propsContextKey,
  selectContextKey,
} from "@niko/components/select/src/constants";
export function useOption() {
    const propsContext = inject(propsContextKey);

    console.log('123123',propsContext)
    
}
