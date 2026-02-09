<template>
  <DialogPortal>
    <DialogOverlay class="s-dialog-overlay fixed inset-0 z-50 bg-additional-950/80" />

    <DialogContent
      v-bind="{ ...props, class: undefined }"
      :class="
        cn(
          's-dialog-content fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-additional-50 p-6 shadow-xl',
          props.class,
        )
      "
      @escape-key-down="emit('escapeKeyDown', $event)"
      @pointer-down-outside="emit('pointerDownOutside', $event)"
      @focus-outside="emit('focusOutside', $event)"
      @interact-outside="emit('interactOutside', $event)"
      @open-auto-focus="emit('openAutoFocus', $event)"
      @close-auto-focus="emit('closeAutoFocus', $event)"
    >
      <slot />

      <DialogClose
        class="absolute end-4 top-4 rounded-sm opacity-70 ring-offset-additional-50 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:pointer-events-none"
      >
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
          <path d="M18 6 6 18" />

          <path d="m6 6 12 12" />
        </svg>

        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

<script setup lang="ts">
import { DialogClose, DialogContent, DialogOverlay, DialogPortal } from "radix-vue";
import { cn } from "@/ui-kit/utilities/cn";
import type { DialogContentEmits, DialogContentProps } from "radix-vue";

const emit = defineEmits<DialogContentEmits>();

const props = defineProps<
  DialogContentProps & {
    class?: string;
  }
>();
</script>

<style scoped>
.s-dialog-overlay {
  animation: dialog-overlay-hide 150ms ease-in forwards;
}

.s-dialog-overlay[data-state="open"] {
  animation: dialog-overlay-show 150ms ease-out forwards;
}

.s-dialog-content {
  animation: dialog-content-hide 150ms ease-in forwards;
}

.s-dialog-content[data-state="open"] {
  animation: dialog-content-show 150ms ease-out forwards;
}

@keyframes dialog-overlay-show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes dialog-overlay-hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes dialog-content-show {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes dialog-content-hide {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
}
</style>
