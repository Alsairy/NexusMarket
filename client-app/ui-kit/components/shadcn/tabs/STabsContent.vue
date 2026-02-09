<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { TabsContent, type TabsContentProps } from "radix-vue";

const props = defineProps<
  TabsContentProps & {
    class?: string;
  }
>();
</script>

<template>
  <TabsContent
    v-bind="{ ...props, class: undefined }"
    :class="
      cn(
        'mt-2 ring-offset-additional-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200',
        props.class,
      )
    "
  >
    <slot />
  </TabsContent>
</template>
