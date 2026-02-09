<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { badgeVariants, type BadgeProps } from "./variants";

const props = withDefaults(defineProps<BadgeProps & { class?: string }>(), {
  variant: "default",
});
</script>

<template>
  <div :class="cn(badgeVariants({ variant: props.variant }), props.class)">
    <slot />
  </div>
</template>
