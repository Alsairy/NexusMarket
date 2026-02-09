<template>
  <DropdownMenuRadioItem
    v-bind="{ ...props, class: undefined }"
    :class="
      cn(
        'relative flex cursor-pointer select-none items-center rounded-md py-1.5 ps-8 pe-2 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class,
      )
    "
    @select="(event) => emit('select', event)"
  >
    <span class="absolute start-2 flex size-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </DropdownMenuItemIndicator>
    </span>

    <slot />
  </DropdownMenuRadioItem>
</template>

<script setup lang="ts">
import { DropdownMenuItemIndicator, DropdownMenuRadioItem } from "radix-vue";
import { cn } from "@/ui-kit/utilities/cn";
import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemProps } from "radix-vue";

const emit = defineEmits<DropdownMenuRadioItemEmits>();

const props = defineProps<
  DropdownMenuRadioItemProps & {
    class?: string;
  }
>();
</script>
