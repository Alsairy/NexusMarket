<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";

defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('text-sm font-semibold leading-tight', $props.class)">
    <slot />
  </div>
</template>
