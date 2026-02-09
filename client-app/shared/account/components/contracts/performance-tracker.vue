<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="metric in metrics"
      :key="metric.metric"
      class="flex flex-col gap-3 rounded-lg border p-4"
      :class="cardBorderClass(metric.status)"
    >
      <!-- Header -->
      <div class="flex items-start justify-between">
        <span class="text-sm font-black text-neutral-700">{{ metric.metric }}</span>
        <VcBadge
          :color="statusBadgeColor(metric.status)"
          variant="solid-light"
          size="xs"
          rounded
        >
          {{ $t(`pages.account.contracts.performance_status_${metric.status}`) }}
        </VcBadge>
      </div>

      <!-- Visual progress indicator -->
      <div class="flex flex-col gap-1">
        <div class="flex items-end justify-between">
          <span
            class="text-2xl font-black"
            :class="valueTextClass(metric.status)"
          >
            {{ metric.actual }}{{ metric.unit === '%' ? '%' : '' }}
          </span>
          <span class="text-xs text-neutral-400">
            {{ $t("pages.account.contracts.performance_target_label") }}: {{ metric.target }}{{ metric.unit === '%' ? '%' : '' }}
          </span>
        </div>

        <!-- Progress bar -->
        <div class="mt-1 h-2 overflow-hidden rounded-full bg-neutral-100">
          <div
            class="h-full rounded-full transition-all"
            :class="progressBarClass(metric.status)"
            :style="{ width: `${getProgressWidth(metric)}%` }"
          />
        </div>
      </div>

      <!-- Unit info (for non-percentage metrics) -->
      <div v-if="metric.unit !== '%'" class="text-xs text-neutral-400">
        {{ $t("pages.account.contracts.performance_unit_label") }}: {{ metric.unit }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PerformanceMetricType } from "@/shared/account";

interface IProps {
  metrics: PerformanceMetricType[];
}

defineProps<IProps>();

function cardBorderClass(status: PerformanceMetricType["status"]): string {
  const map: Record<PerformanceMetricType["status"], string> = {
    met: "border-success-200",
    at_risk: "border-warning-200",
    breached: "border-danger-200",
  };
  return map[status] ?? "border-neutral-200";
}

function statusBadgeColor(status: PerformanceMetricType["status"]): VcBadgeColorType {
  const map: Record<PerformanceMetricType["status"], VcBadgeColorType> = {
    met: "success",
    at_risk: "warning",
    breached: "danger",
  };
  return map[status] ?? "neutral";
}

function valueTextClass(status: PerformanceMetricType["status"]): string {
  const map: Record<PerformanceMetricType["status"], string> = {
    met: "text-success-600",
    at_risk: "text-warning-600",
    breached: "text-danger-600",
  };
  return map[status] ?? "text-neutral-700";
}

function progressBarClass(status: PerformanceMetricType["status"]): string {
  const map: Record<PerformanceMetricType["status"], string> = {
    met: "bg-success-500",
    at_risk: "bg-warning-500",
    breached: "bg-danger-500",
  };
  return map[status] ?? "bg-neutral-400";
}

function getProgressWidth(metric: PerformanceMetricType): number {
  if (metric.target === 0) {
    return 0;
  }
  const ratio = (metric.actual / metric.target) * 100;
  return Math.min(ratio, 100);
}
</script>
