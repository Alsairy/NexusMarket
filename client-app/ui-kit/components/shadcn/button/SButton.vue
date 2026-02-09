<script setup lang="ts">
import { Primitive } from "radix-vue";
import { cn } from "@/ui-kit/utilities/cn";
import { buttonVariants, type ButtonProps } from "./variants";

interface Props extends ButtonProps {
  as?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
  disabled: false,
  loading: false,
  asChild: false,
  as: "button",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :disabled="disabled || loading"
    :class="
      cn(
        buttonVariants({ variant, size }),
        { 'pointer-events-none relative': loading },
        ($attrs as Record<string, unknown>).class ?? '',
      )
    "
  >
    <!-- Loading spinner overlay -->
    <span
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <svg
        class="size-5 animate-spin text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>

    <!-- Button content -->
    <span :class="{ invisible: loading }">
      <slot />
    </span>
  </Primitive>
</template>
