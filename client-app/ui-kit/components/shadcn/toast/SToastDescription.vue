<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";

defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('text-sm text-neutral-500', $props.class)">
    <slot />
  </div>
</template>
