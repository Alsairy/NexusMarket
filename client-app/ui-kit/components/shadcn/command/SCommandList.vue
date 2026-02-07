<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { ComboboxContent, type ComboboxContentProps } from "radix-vue";

const props = defineProps<
  ComboboxContentProps & {
    class?: string;
  }
>();
</script>

<template>
  <ComboboxContent
    v-bind="{ ...props, class: undefined }"
    :class="cn('max-h-[300px] overflow-y-auto overflow-x-hidden', props.class)"
  >
    <slot />
  </ComboboxContent>
</template>
