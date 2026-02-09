<script setup lang="ts">
import { cn } from "@/ui-kit/utilities/cn";
import { ComboboxInput, type ComboboxInputProps } from "radix-vue";

const props = defineProps<
  ComboboxInputProps & {
    class?: string;
  }
>();
</script>

<template>
  <div class="flex items-center border-b border-neutral-200 px-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="mr-2 shrink-0 opacity-50"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
    <ComboboxInput
      v-bind="{ ...props, class: undefined }"
      :class="
        cn(
          'flex h-11 w-full rounded-lg bg-transparent py-3 text-sm outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50',
          props.class,
        )
      "
    />
  </div>
</template>
