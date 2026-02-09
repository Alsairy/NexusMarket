<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { DialogDescription, type DialogDescriptionProps } from "radix-vue";

const props = defineProps<
  DialogDescriptionProps & {
    class?: string;
  }
>();
</script>

<template>
  <DialogDescription
    v-bind="{ ...props, class: undefined }"
    :class="cn('text-sm text-neutral-500', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
