<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { ComboboxLabel, type ComboboxLabelProps } from "radix-vue";

const props = defineProps<
  ComboboxLabelProps & {
    class?: string;
  }
>();
</script>

<template>
  <ComboboxLabel
    v-bind="{ ...props, class: undefined }"
    :class="cn('px-2 py-1.5 text-xs font-medium text-neutral-500', props.class)"
  >
    <slot />
  </ComboboxLabel>
</template>
