<template>
  <DialogPortal>
    <DialogOverlay class="s-sheet-overlay fixed inset-0 z-50 bg-additional-950/80" />

    <DialogContent
      v-bind="{ ...props, class: undefined, side: undefined }"
      :class="cn(sheetVariants({ side: props.side }), props.class)"
      :data-side="props.side"
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
import { cva } from "class-variance-authority";
import { DialogClose, DialogContent, DialogOverlay, DialogPortal } from "radix-vue";
import { cn } from "@/ui-kit/utilities/cn";
import type { VariantProps } from "class-variance-authority";
import type { DialogContentEmits, DialogContentProps } from "radix-vue";

const emit = defineEmits<DialogContentEmits>();

const props = withDefaults(defineProps<Props>(), {
  side: "right",
});

const sheetVariants = cva(
  "s-sheet-content fixed z-50 gap-4 bg-additional-50 p-6 shadow-lg transition-transform duration-300",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        right: "inset-y-0 end-0 h-full w-3/4 max-w-sm border-s",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 start-0 h-full w-3/4 max-w-sm border-e",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

type SheetVariantProps = VariantProps<typeof sheetVariants>;

interface Props extends DialogContentProps {
  class?: string;
  side?: NonNullable<SheetVariantProps["side"]>;
}
</script>

<style scoped>
.s-sheet-overlay {
  animation: sheet-overlay-hide 150ms ease-in forwards;
}

.s-sheet-overlay[data-state="open"] {
  animation: sheet-overlay-show 150ms ease-out forwards;
}

.s-sheet-content {
  animation-duration: 300ms;
  animation-fill-mode: forwards;
}

/* Right side animations */
.s-sheet-content[data-side="right"] {
  animation-name: sheet-slide-out-right;
}

.s-sheet-content[data-side="right"][data-state="open"] {
  animation-name: sheet-slide-in-right;
}

/* Left side animations */
.s-sheet-content[data-side="left"] {
  animation-name: sheet-slide-out-left;
}

.s-sheet-content[data-side="left"][data-state="open"] {
  animation-name: sheet-slide-in-left;
}

/* Top side animations */
.s-sheet-content[data-side="top"] {
  animation-name: sheet-slide-out-top;
}

.s-sheet-content[data-side="top"][data-state="open"] {
  animation-name: sheet-slide-in-top;
}

/* Bottom side animations */
.s-sheet-content[data-side="bottom"] {
  animation-name: sheet-slide-out-bottom;
}

.s-sheet-content[data-side="bottom"][data-state="open"] {
  animation-name: sheet-slide-in-bottom;
}

@keyframes sheet-overlay-show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes sheet-overlay-hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes sheet-slide-in-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes sheet-slide-out-right {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

@keyframes sheet-slide-in-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes sheet-slide-out-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes sheet-slide-in-top {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes sheet-slide-out-top {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

@keyframes sheet-slide-in-bottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes sheet-slide-out-bottom {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
</style>
