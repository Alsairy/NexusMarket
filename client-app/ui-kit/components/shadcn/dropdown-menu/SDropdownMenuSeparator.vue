<script setup lang="ts">
import { DropdownMenuSeparator, type DropdownMenuSeparatorProps } from "radix-vue";
import { cn } from "@/ui-kit/utilities/cn";

const props = defineProps<
  DropdownMenuSeparatorProps & {
    class?: string;
  }
>();
</script>

<template>
  <DropdownMenuSeparator v-bind="{ ...props, class: undefined }" :class="cn('-mx-1 my-1 h-px bg-neutral-200', props.class)" />
</template>
