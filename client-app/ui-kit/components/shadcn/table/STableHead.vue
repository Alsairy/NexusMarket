<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <th :class="cn('h-12 px-4 text-left align-middle font-medium text-neutral-500 [&:has([role=checkbox])]:pr-0', props.class)">
    <slot />
  </th>
</template>
