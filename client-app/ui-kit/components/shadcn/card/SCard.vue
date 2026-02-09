<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('rounded-xl border border-neutral-200 bg-additional-50 text-neutral-900 shadow-sm', props.class)">
    <slot />
  </div>
</template>
