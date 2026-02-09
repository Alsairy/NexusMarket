<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <caption :class="cn('mt-4 text-sm text-neutral-500', props.class)">
    <slot />
  </caption>
</template>
