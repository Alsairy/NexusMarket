<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { TabsTrigger, type TabsTriggerProps } from "radix-vue";

const props = defineProps<
  TabsTriggerProps & {
    class?: string;
  }
>();
</script>

<template>
  <TabsTrigger
    v-bind="{ ...props, class: undefined }"
    :class="
      cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-additional-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-additional-50 data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm',
        props.class,
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
