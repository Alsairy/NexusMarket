<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { ComboboxGroup, type ComboboxGroupProps } from "radix-vue";

const props = defineProps<
  ComboboxGroupProps & {
    class?: string;
  }
>();
</script>

<template>
  <ComboboxGroup
    v-bind="{ ...props, class: undefined }"
    :class="
      cn(
        'overflow-hidden p-1 text-neutral-900 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-neutral-500',
        props.class,
      )
    "
  >
    <slot />
  </ComboboxGroup>
</template>
