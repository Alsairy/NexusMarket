<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";

defineProps<{
  class?: string;
}>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <button
    :class="
      cn(
        'inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-transparent px-3 text-xs font-medium transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        $props.class,
      )
    "
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
