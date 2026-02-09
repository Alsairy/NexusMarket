<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { DialogTitle, type DialogTitleProps } from "radix-vue";

defineProps<
  DialogTitleProps & {
    class?: string;
  }
>();
</script>

<template>
  <DialogTitle :class="cn('text-lg font-semibold leading-none tracking-tight', $props.class)">
    <slot />
  </DialogTitle>
</template>
