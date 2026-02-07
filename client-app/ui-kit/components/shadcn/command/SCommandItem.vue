<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { ComboboxItem, type ComboboxItemEmits, type ComboboxItemProps } from "radix-vue";

const props = defineProps<
  ComboboxItemProps & {
    class?: string;
  }
>();

const emit = defineEmits<ComboboxItemEmits>();
</script>

<template>
  <ComboboxItem
    v-bind="{ ...props, class: undefined }"
    :class="
      cn(
        'relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-neutral-100 data-[highlighted]:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class,
      )
    "
    @select="emit('select', $event)"
  >
    <slot />
  </ComboboxItem>
</template>
