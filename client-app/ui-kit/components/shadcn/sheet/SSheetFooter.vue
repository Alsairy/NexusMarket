<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";

defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2', $props.class)">
    <slot />
  </div>
</template>
