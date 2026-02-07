<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { ComboboxSeparator, type ComboboxSeparatorProps } from "radix-vue";

const props = defineProps<
  ComboboxSeparatorProps & {
    class?: string;
  }
>();
</script>

<template>
  <ComboboxSeparator
    v-bind="{ ...props, class: undefined }"
    :class="cn('-mx-1 h-px bg-neutral-200', props.class)"
  />
</template>
