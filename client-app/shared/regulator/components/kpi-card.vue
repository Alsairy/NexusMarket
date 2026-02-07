<template>
  <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
    <span class="text-xs font-medium text-neutral-500">{{ label }}</span>
    <span class="text-2xl font-black text-neutral-900">{{ formattedValue }}</span>
    <div class="flex items-center gap-1">
      <VcIcon
        :name="trendIconName"
        size="xs"
        :class="trendColorClass"
      />
      <span class="text-xs font-medium" :class="trendColorClass">
        {{ formattedChange }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface IProps {
  label: string;
  value: number;
  previousValue?: number;
  unit: string;
  trend: "up" | "down" | "stable";
  trendIsPositive: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  previousValue: undefined,
});

const trendIconName = computed(() => {
  if (props.trend === "up") {
    return "arrow-up";
  }
  if (props.trend === "down") {
    return "arrow-down";
  }
  return "minus";
});

const trendColorClass = computed(() => {
  if (props.trend === "stable") {
    return "text-neutral-500";
  }

  const isPositiveDirection =
    (props.trend === "up" && props.trendIsPositive) ||
    (props.trend === "down" && props.trendIsPositive);

  return isPositiveDirection ? "text-success-600" : "text-danger-600";
});

const formattedValue = computed(() => {
  if (props.unit === "currency") {
    if (props.value >= 1000000) {
      return `$${(props.value / 1000000).toFixed(1)}M`;
    }
    if (props.value >= 1000) {
      return `$${props.value.toLocaleString()}`;
    }
    return `$${props.value.toLocaleString()}`;
  }

  if (props.unit === "percentage") {
    return `${props.value.toFixed(1)}%`;
  }

  // count
  return props.value.toLocaleString();
});

const formattedChange = computed(() => {
  if (props.previousValue === undefined || props.previousValue === 0) {
    return "";
  }

  const changePercent = Math.abs(((props.value - props.previousValue) / props.previousValue) * 100);

  const direction = props.trend === "up" ? "+" : props.trend === "down" ? "-" : "";
  return `${direction}${changePercent.toFixed(1)}%`;
});
</script>
