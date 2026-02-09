<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { ComboboxRoot, type ComboboxRootEmits, type ComboboxRootProps } from "radix-vue";

const props = defineProps<
  ComboboxRootProps & {
    class?: string;
  }
>();

const emit = defineEmits<ComboboxRootEmits>();
</script>

<template>
  <ComboboxRoot
    v-bind="{ ...props, class: undefined }"
    :class="
      cn(
        'flex h-full w-full flex-col overflow-hidden rounded-xl bg-additional-50 text-neutral-900',
        props.class,
      )
    "
    @update:model-value="emit('update:modelValue', $event)"
    @update:open="emit('update:open', $event)"
    @update:search-term="emit('update:searchTerm', $event)"
  >
    <slot />
  </ComboboxRoot>
</template>
