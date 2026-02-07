<script setup lang="ts">
import { DropdownMenuSubTrigger, type DropdownMenuSubTriggerProps } from "radix-vue";
import { cn } from "@/ui-kit/utilities/cn";

const props = defineProps<
  DropdownMenuSubTriggerProps & {
    class?: string;
    inset?: boolean;
  }
>();
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="{ ...props, class: undefined }"
    :class="
      cn(
        'flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none focus:bg-neutral-100 data-[state=open]:bg-neutral-100',
        inset && 'pl-8',
        props.class,
      )
    "
  >
    <slot />
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
      class="ml-auto"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  </DropdownMenuSubTrigger>
</template>
