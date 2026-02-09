<script setup lang="ts">
import { DropdownMenuItem, type DropdownMenuItemEmits, type DropdownMenuItemProps } from "radix-vue";
import { cn } from "@/ui-kit/utilities/cn";

const props = defineProps<
  DropdownMenuItemProps & {
    class?: string;
    inset?: boolean;
  }
>();

const emit = defineEmits<DropdownMenuItemEmits>();
</script>

<template>
  <DropdownMenuItem
    v-bind="{ ...props, class: undefined }"
    :class="
      cn(
        'relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        props.class,
      )
    "
    @select="(event) => emit('select', event)"
  >
    <slot />
  </DropdownMenuItem>
</template>
