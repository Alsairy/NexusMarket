<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { toastVariants, toastIndicatorVariants, type ToastProps } from "./variants";
import SToastTitle from "./SToastTitle.vue";
import SToastDescription from "./SToastDescription.vue";
import SToastAction from "./SToastAction.vue";
import SToastClose from "./SToastClose.vue";

const props = withDefaults(
  defineProps<
    ToastProps & {
      title?: string;
      description?: string;
      action?: {
        label: string;
        onClick: () => void;
      };
    }
  >(),
  {
    variant: "default",
  },
);

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div :class="cn(toastVariants({ variant: props.variant }), props.class)">
    <!-- Accent indicator bar -->
    <div :class="toastIndicatorVariants({ variant: props.variant })" />

    <!-- Icon per variant -->
    <div class="mt-0.5 flex shrink-0 pl-1">
      <!-- Default: flame/fire icon -->
      <svg
        v-if="props.variant === 'default'"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ff6037"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 12c0-3 2.5-6 2.5-6S17 9 17 12a5 5 0 1 1-10 0c0-3 2.5-6 2.5-6S12 9 12 12Z" />
      </svg>

      <!-- Success: check circle -->
      <svg
        v-else-if="props.variant === 'success'"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-success-500"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>

      <!-- Error: x circle -->
      <svg
        v-else-if="props.variant === 'error'"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-danger-500"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>

      <!-- Warning: alert triangle -->
      <svg
        v-else-if="props.variant === 'warning'"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-warning-500"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>

      <!-- Info: info circle -->
      <svg
        v-else-if="props.variant === 'info'"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-blue-500"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    </div>

    <!-- Content -->
    <div class="flex-1 space-y-1">
      <SToastTitle v-if="props.title">
        {{ props.title }}
      </SToastTitle>

      <slot name="title" />

      <SToastDescription v-if="props.description">
        {{ props.description }}
      </SToastDescription>

      <slot name="description" />

      <slot />

      <div v-if="props.action" class="mt-2">
        <SToastAction @click="props.action.onClick()">
          {{ props.action.label }}
        </SToastAction>
      </div>

      <slot name="action" />
    </div>

    <!-- Close button -->
    <SToastClose @click="emit('close')" />
  </div>
</template>
