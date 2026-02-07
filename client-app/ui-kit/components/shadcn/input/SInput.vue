<script setup lang="ts">
import { useAttrs } from "vue";
import { cn } from "@/ui-kit/utilities/cn";

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const model = defineModel<string | number>();

withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    class?: string;
  }>(),
  {
    type: "text",
  },
);

const emit = defineEmits<{
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();
</script>

<template>
  <input
    v-model="model"
    v-bind="attrs"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :class="
      cn(
        'flex h-11 w-full rounded-lg border border-neutral-300 bg-additional-50 px-3 py-2 text-base',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:border-primary-500',
        'placeholder:text-neutral-400',
        'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        $props.class,
      )
    "
    @blur="emit('blur', $event)"
    @focus="emit('focus', $event)"
  />
</template>
