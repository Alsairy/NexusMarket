<template>
  <DropdownMenuCheckboxItem
    v-bind="{ ...props, class: undefined }"
    :class="
      cn(
        'relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class,
      )
    "
    @update:checked="(val) => emit('update:checked', val)"
    @select="(event) => emit('select', event)"
  >
    <span class="absolute start-2 flex size-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </DropdownMenuItemIndicator>
    </span>

    <slot />
  </DropdownMenuCheckboxItem>
</template>

<script setup lang="ts">
import { DropdownMenuCheckboxItem, DropdownMenuItemIndicator } from "radix-vue";
import { cn } from "@/ui-kit/utilities/cn";
import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from "radix-vue";

const emit = defineEmits<DropdownMenuCheckboxItemEmits>();

const props = defineProps<
  DropdownMenuCheckboxItemProps & {
    class?: string;
  }
>();
</script>
