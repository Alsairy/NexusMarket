<template>
  <button
    :class="
      cn(
        'absolute end-2 top-2 rounded-md p-1 text-neutral-400 opacity-0 transition-opacity hover:text-neutral-900 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 group-hover:opacity-100',
        $props.class,
      )
    "
    aria-label="Close"
    @click="emit('click', $event)"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
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
  </button>
</template>

<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

defineProps<{
  class?: string;
}>();
</script>
