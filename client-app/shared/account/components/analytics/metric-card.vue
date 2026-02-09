<template>
  <div class="flex items-center gap-4 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
    <div
      class="flex size-12 shrink-0 items-center justify-center rounded-full"
      :class="iconBgClass"
    >
      <VcIcon :name="metric.icon" class="size-5" :class="iconFillClass" />
    </div>

    <div class="flex min-w-0 flex-col">
      <span class="truncate text-xs font-medium text-neutral-500">
        {{ $t(metric.label) }}
      </span>

      <span class="text-2xl font-black text-neutral-950">
        {{ formattedValue }}
      </span>

      <span class="text-xs font-semibold" :class="changeColorClass">
        <span v-if="changePercent > 0">&#9650;</span>
        <span v-else-if="changePercent < 0">&#9660;</span>
        <span v-else>&#9654;</span>
        {{ formattedChange }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { MetricCardType } from "@/shared/account";

interface IProps {
  metric: MetricCardType;
}

const props = defineProps<IProps>();

useI18n();

const changePercent = computed(() => {
  if (props.metric.previousValue === 0) {
    return 0;
  }
  return ((props.metric.value - props.metric.previousValue) / props.metric.previousValue) * 100;
});

const formattedValue = computed(() => {
  switch (props.metric.format) {
    case "currency":
      return `$${props.metric.value.toLocaleString()}`;
    case "percentage":
      return `${props.metric.value}%`;
    case "number":
    default:
      return props.metric.value.toLocaleString();
  }
});

const formattedChange = computed(() => {
  const sign = changePercent.value > 0 ? "+" : "";
  return `${sign}${changePercent.value.toFixed(1)}%`;
});

const changeColorClass = computed(() => {
  if (changePercent.value > 0) {
    return "text-success-600";
  }
  if (changePercent.value < 0) {
    return "text-danger-600";
  }
  return "text-neutral-500";
});

const iconBgClass = computed(() => {
  const map: Record<string, string> = {
    primary: "bg-primary-100",
    success: "bg-success-100",
    info: "bg-info-100",
    warning: "bg-warning-100",
  };
  return map[props.metric.color] || "bg-primary-100";
});

const iconFillClass = computed(() => {
  const map: Record<string, string> = {
    primary: "fill-primary-600",
    success: "fill-success-600",
    info: "fill-info-600",
    warning: "fill-warning-600",
  };
  return map[props.metric.color] || "fill-primary-600";
});
</script>
