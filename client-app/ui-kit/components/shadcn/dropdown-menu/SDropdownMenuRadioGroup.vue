<script setup lang="ts">
import { DropdownMenuRadioGroup, type DropdownMenuRadioGroupEmits, type DropdownMenuRadioGroupProps } from "radix-vue";

const props = defineProps<DropdownMenuRadioGroupProps>();
const emit = defineEmits<DropdownMenuRadioGroupEmits>();
</script>

<template>
  <DropdownMenuRadioGroup v-bind="props" @update:model-value="(val) => emit('update:modelValue', val)">
    <slot />
  </DropdownMenuRadioGroup>
</template>
