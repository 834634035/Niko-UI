import { createNamespace } from "@niko/utils/create";
import { transform } from "typescript";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";

export default defineComponent({
  name: "NkVirtaulList",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    remain: {
      type: Number,
      default: 8,
    },
    size: {
      type: Number,
      default: 35,
    },
  },
  setup(props, { slots }) {
    const bem = createNamespace("vl");
    const wrapperRef = ref<HTMLElement>();
    const barRef = ref<HTMLElement>();
    const state = reactive({
      start: 0,
      end: props.remain,
    });

    const prev = computed(() => {
      return Math.min(state.start, props.remain);
    });

    const next = computed(() => {
      return Math.min(props.remain, props.items.length - state.end);
    });

    const visibleData = computed(() => {
      return props.items.slice(state.start - prev.value, state.end + next.value);
    });
    onMounted(() => {
      wrapperRef.value!.style.height = props.remain * props.size + "px";
      barRef.value!.style.height = props.items.length * props.size + "px";
    });

    watch(
      () => props.items,
      () => {
        wrapperRef.value!.style.height = props.remain * props.size + "px";
        barRef.value!.style.height = props.items.length * props.size + "px";
      }
    );

    // 偏移量
    const offset = ref(0);

    function handleScroll() {
      const scrollTop = wrapperRef.value!.scrollTop;
      state.start = Math.floor(scrollTop / props.size); // 划过去多少个
      state.end = state.start + props.remain;

      offset.value = state.start * props.size - props.size * prev.value;
    }
    return () => {
      return (
        <div class={bem.b()} ref={wrapperRef} onScroll={handleScroll}>
          <div class={bem.e("scroll-bar")} ref={barRef}></div>
          <div
            class={bem.e("scroll-list")}
            style={{ transform: `translate3d(0,${offset.value}px,0)` }}
          >
            {visibleData.value.map((node, idx) => {
              return slots.default!({ node });
            })}
          </div>
        </div>
      );
    };
  },
});
