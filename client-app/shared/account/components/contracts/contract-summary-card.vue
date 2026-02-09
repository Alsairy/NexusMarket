<template>
  <VcWidget :title="$t('pages.account.contracts.summary_title')" size="lg">
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Total Value -->
      <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 p-4">
        <span class="text-xs font-bold text-neutral-500">
          {{ $t("pages.account.contracts.total_value_label") }}
        </span>
        <span class="text-2xl font-black text-neutral-900">
          {{ formatCurrency(contract.totalValue) }}
        </span>
        <span class="text-xs text-neutral-400">{{ contract.currency }}</span>
      </div>

      <!-- Consumed Percentage -->
      <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 p-4">
        <span class="text-xs font-bold text-neutral-500">
          {{ $t("pages.account.contracts.consumed_label") }}
        </span>
        <div class="flex items-baseline gap-2">
          <span
            class="text-2xl font-black"
            :class="consumptionPercent > 90 ? 'text-danger-600' : consumptionPercent > 70 ? 'text-warning-600' : 'text-success-600'"
          >
            {{ consumptionPercent }}%
          </span>
          <span class="text-sm text-neutral-400">
            {{ formatCurrency(contract.consumedValue) }}
          </span>
        </div>
        <div class="mt-1 h-2 overflow-hidden rounded-full bg-neutral-100">
          <div
            class="h-full rounded-full transition-all"
            :class="consumptionPercent > 90 ? 'bg-danger-500' : consumptionPercent > 70 ? 'bg-warning-500' : 'bg-success-500'"
            :style="{ width: `${consumptionPercent}%` }"
          />
        </div>
      </div>

      <!-- Line Items Count -->
      <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 p-4">
        <span class="text-xs font-bold text-neutral-500">
          {{ $t("pages.account.contracts.line_items_count_label") }}
        </span>
        <span class="text-2xl font-black text-neutral-900">
          {{ contract.lineItems.length }}
        </span>
        <span class="text-xs text-neutral-400">
          {{ $t("pages.account.contracts.products_covered_label") }}
        </span>
      </div>

      <!-- Remaining Days -->
      <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 p-4">
        <span class="text-xs font-bold text-neutral-500">
          {{ $t("pages.account.contracts.remaining_days_label") }}
        </span>
        <span
          class="text-2xl font-black"
          :class="remainingDays <= 0 ? 'text-danger-600' : remainingDays <= 30 ? 'text-warning-600' : 'text-neutral-900'"
        >
          {{ remainingDays > 0 ? remainingDays : 0 }}
        </span>
        <span class="text-xs text-neutral-400">
          {{ contract.autoRenewal ? $t("pages.account.contracts.auto_renewal_enabled") : $t("pages.account.contracts.auto_renewal_disabled") }}
        </span>
      </div>
    </div>

    <!-- Performance Summary -->
    <div v-if="contract.performanceMetrics.length" class="mt-4 border-t border-neutral-100 pt-4">
      <span class="mb-3 block text-sm font-black text-neutral-700">
        {{ $t("pages.account.contracts.performance_summary_label") }}
      </span>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="metric in contract.performanceMetrics"
          :key="metric.metric"
          class="flex items-center gap-2 rounded-full border px-3 py-1"
          :class="metricBorderClass(metric.status)"
        >
          <span
            class="size-2 rounded-full"
            :class="metricDotClass(metric.status)"
          />
          <span class="text-xs font-bold text-neutral-600">
            {{ metric.metric }}
          </span>
          <span class="text-xs text-neutral-400">
            {{ metric.actual }}{{ metric.unit === '%' ? '%' : ` ${metric.unit}` }}
          </span>
        </div>
      </div>
    </div>
  </VcWidget>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { FrameworkContractType, PerformanceMetricType } from "@/shared/account";

interface IProps {
  contract: FrameworkContractType;
}

const props = defineProps<IProps>();

const consumptionPercent = computed(() => {
  if (props.contract.totalValue === 0) {
    return 0;
  }
  return Math.round((props.contract.consumedValue / props.contract.totalValue) * 100);
});

const remainingDays = computed(() => {
  const now = new Date();
  const end = new Date(props.contract.endDate);
  const diff = end.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

function formatCurrency(value: number): string {
  return `$${value.toLocaleString()}`;
}

function metricBorderClass(status: PerformanceMetricType["status"]): string {
  const map: Record<PerformanceMetricType["status"], string> = {
    met: "border-success-200 bg-success-50",
    at_risk: "border-warning-200 bg-warning-50",
    breached: "border-danger-200 bg-danger-50",
  };
  return map[status] ?? "border-neutral-200";
}

function metricDotClass(status: PerformanceMetricType["status"]): string {
  const map: Record<PerformanceMetricType["status"], string> = {
    met: "bg-success-500",
    at_risk: "bg-warning-500",
    breached: "bg-danger-500",
  };
  return map[status] ?? "bg-neutral-400";
}
</script>
