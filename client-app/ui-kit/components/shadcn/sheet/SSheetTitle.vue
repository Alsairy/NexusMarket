<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { DialogTitle, type DialogTitleProps } from "radix-vue";

const props = defineProps<
  DialogTitleProps & {
    class?: string;
  }
>();
</script>

<template>
  <DialogTitle
    v-bind="{ ...props, class: undefined }"
    :class="cn('text-lg font-semibold text-neutral-900', props.class)"
  >
    <slot />
  </DialogTitle>
</template>
