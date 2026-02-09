import { computed } from "vue";

export function useRtl() {
  const isRtl = computed(() => document.documentElement.getAttribute("dir") === "rtl");
  return { isRtl };
}
