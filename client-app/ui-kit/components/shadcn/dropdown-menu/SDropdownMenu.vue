<script setup lang="ts">
import { DropdownMenuRoot, type DropdownMenuRootEmits, type DropdownMenuRootProps } from "radix-vue";

const props = defineProps<DropdownMenuRootProps>();
const emit = defineEmits<DropdownMenuRootEmits>();
</script>

<template>
  <DropdownMenuRoot v-bind="props" @update:open="(val) => emit('update:open', val)">
    <slot />
  </DropdownMenuRoot>
</template>
