<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { TabsList, type TabsListProps } from "radix-vue";

const props = defineProps<
  TabsListProps & {
    class?: string;
  }
>();
</script>

<template>
  <TabsList
    v-bind="{ ...props, class: undefined }"
    :class="
      cn(
        'inline-flex h-10 items-center justify-center rounded-lg bg-neutral-100 p-1 text-neutral-500',
        props.class,
      )
    "
  >
    <slot />
  </TabsList>
</template>
