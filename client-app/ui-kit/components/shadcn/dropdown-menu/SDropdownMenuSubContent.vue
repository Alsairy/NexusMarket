<script setup lang="ts">
import {
  DropdownMenuSubContent,
  type DropdownMenuSubContentEmits,
  type DropdownMenuSubContentProps,
} from "radix-vue";
import { cn } from "@/ui-kit/utilities/cn";

const props = defineProps<
  DropdownMenuSubContentProps & {
    class?: string;
  }
>();

const emit = defineEmits<DropdownMenuSubContentEmits>();
</script>

<template>
  <DropdownMenuSubContent
    v-bind="{ ...props, class: undefined }"
    :class="
      cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-lg border border-neutral-200 bg-additional-50 p-1 text-neutral-900 shadow-lg',
        'data-[state=open]:animate-dropdown-in data-[state=closed]:animate-dropdown-out',
        props.class,
      )
    "
    @close-auto-focus="(event) => emit('closeAutoFocus', event)"
    @escape-key-down="(event) => emit('escapeKeyDown', event)"
    @pointer-down-outside="(event) => emit('pointerDownOutside', event)"
    @focus-outside="(event) => emit('focusOutside', event)"
    @interact-outside="(event) => emit('interactOutside', event)"
  >
    <slot />
  </DropdownMenuSubContent>
</template>
