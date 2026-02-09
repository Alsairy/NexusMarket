<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps } from "radix-vue";
import { cn } from "@/ui-kit/utilities/cn";

const props = defineProps<
  DropdownMenuTriggerProps & {
    class?: string;
  }
>();
</script>

<template>
  <DropdownMenuTrigger v-bind="{ ...props, class: undefined }" :class="cn(props.class)">
    <slot />
  </DropdownMenuTrigger>
</template>
