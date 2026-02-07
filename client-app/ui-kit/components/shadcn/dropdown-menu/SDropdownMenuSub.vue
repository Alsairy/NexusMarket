<script setup lang="ts">
import { DropdownMenuSub, type DropdownMenuSubEmits, type DropdownMenuSubProps } from "radix-vue";

const props = defineProps<DropdownMenuSubProps>();
const emit = defineEmits<DropdownMenuSubEmits>();
</script>

<template>
  <DropdownMenuSub v-bind="props" @update:open="(val) => emit('update:open', val)">
    <slot />
  </DropdownMenuSub>
</template>
