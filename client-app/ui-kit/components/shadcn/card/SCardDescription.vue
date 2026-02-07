<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <p :class="cn('text-sm text-neutral-500', props.class)">
    <slot />
  </p>
</template>
