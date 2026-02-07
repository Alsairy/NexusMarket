<script setup lang="ts">
import { DropdownMenuContent, type DropdownMenuContentEmits, type DropdownMenuContentProps, DropdownMenuPortal } from "radix-vue";
import { cn } from "@/ui-kit/utilities/cn";

const props = withDefaults(
  defineProps<
    DropdownMenuContentProps & {
      class?: string;
    }
  >(),
  {
    sideOffset: 4,
    align: "center",
  },
);

const emit = defineEmits<DropdownMenuContentEmits>();
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
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
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>

<style>
@keyframes dropdown-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes dropdown-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

.animate-dropdown-in {
  animation: dropdown-in 0.15s ease-out;
}

.animate-dropdown-out {
  animation: dropdown-out 0.1s ease-in;
}
</style>
