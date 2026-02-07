<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <tr :class="cn('border-b border-neutral-200 transition-colors hover:bg-neutral-50 data-[state=selected]:bg-neutral-100', props.class)">
    <slot />
  </tr>
</template>
