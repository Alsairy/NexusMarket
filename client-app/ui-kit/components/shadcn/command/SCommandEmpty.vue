<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { ComboboxEmpty, type ComboboxEmptyProps } from "radix-vue";

const props = defineProps<
  ComboboxEmptyProps & {
    class?: string;
  }
>();
</script>

<template>
  <ComboboxEmpty
    v-bind="{ ...props, class: undefined }"
    :class="cn('py-6 text-center text-sm text-neutral-500', props.class)"
  >
    <slot />
  </ComboboxEmpty>
</template>
