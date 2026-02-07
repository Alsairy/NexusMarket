<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <tfoot :class="cn('border-t bg-neutral-100/50 font-medium [&>tr]:last:border-b-0', props.class)">
    <slot />
  </tfoot>
</template>
