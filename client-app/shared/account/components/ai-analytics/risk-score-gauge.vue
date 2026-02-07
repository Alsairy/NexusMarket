<template>
  <div class="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-additional-50 p-5 shadow-sm">
    <!-- Header: Supplier name + trend -->
    <div class="flex items-center justify-between">
      <span class="text-sm font-black text-neutral-950">{{ riskScore.supplierName }}</span>
      <div class="flex items-center gap-2">
        <VcBadge :color="riskLevelColor" variant="solid-light" size="sm" rounded>
          {{ $t(`pages.account.ai_insights.risk_levels.${riskScore.riskLevel}`) }}
        </VcBadge>
        <span class="text-xs" :class="trendClass">
          <span v-if="riskScore.trend === 'improving'">&#9650;</span>
          <span v-else-if="riskScore.trend === 'declining'">&#9660;</span>
          <span v-else>&#9654;</span>
        </span>
      </div>
    </div>

    <!-- Circular gauge -->
    <div class="flex items-center justify-center py-2">
      <div class="relative flex size-28 items-center justify-center">
        <svg class="absolute inset-0 -rotate-90" viewBox="0 0 112 112">
          <!-- Background circle -->
          <circle
            cx="56"
            cy="56"
            r="48"
            fill="none"
            stroke="currentColor"
            stroke-width="10"
            class="text-neutral-100"
          />
          <!-- Score arc -->
          <circle
            cx="56"
            cy="56"
            r="48"
            fill="none"
            :stroke="gaugeStrokeColor"
            stroke-width="10"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset"
            class="transition-all duration-700 ease-out"
          />
        </svg>
        <div class="flex flex-col items-center">
          <span class="text-2xl font-black" :class="scoreTextClass">
            {{ riskScore.overallScore }}
          </span>
          <span class="text-xxs font-bold text-neutral-400">
            {{ $t("pages.account.ai_insights.risk_gauge.out_of_100") }}
          </span>
        </div>
      </div>
    </div>

    <!-- Factor breakdown (horizontal bars) -->
    <div class="flex flex-col gap-2">
      <div
        v-for="(value, factor) in riskScore.factors"
        :key="factor"
        class="flex flex-col gap-0.5"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs text-neutral-500">
            {{ $t(`pages.account.ai_insights.risk_factors.${factor}`) }}
          </span>
          <span class="text-xs font-semibold text-neutral-700">{{ value }}</span>
        </div>
        <div class="h-1.5 w-full rounded-full bg-neutral-100">
          <div
            class="h-full rounded-full transition-all"
            :class="factorBarClass(value)"
            :style="{ width: `${value}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Alerts -->
    <div v-if="riskScore.alerts.length" class="flex flex-col gap-1.5 border-t border-neutral-100 pt-3">
      <span class="text-xs font-bold text-neutral-500">
        {{ $t("pages.account.ai_insights.risk_gauge.alerts") }} ({{ riskScore.alerts.length }})
      </span>
      <div
        v-for="(alert, index) in riskScore.alerts"
        :key="index"
        class="flex items-center gap-1.5 text-xs text-danger-600"
      >
        <span class="inline-block size-1.5 shrink-0 rounded-full bg-danger-500"></span>
        {{ $t(alert) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { SupplierRiskScoreType } from "@/shared/account";

interface IProps {
  riskScore: SupplierRiskScoreType;
}

const props = defineProps<IProps>();

useI18n();

const circumference = 2 * Math.PI * 48;

const dashOffset = computed(() => {
  const offset = circumference - (props.riskScore.overallScore / 100) * circumference;
  return `${offset}`;
});

const gaugeStrokeColor = computed(() => {
  const score = props.riskScore.overallScore;
  if (score >= 75) {
    return "var(--color-success-500)";
  }
  if (score >= 50) {
    return "var(--color-warning-500)";
  }
  if (score >= 25) {
    return "var(--color-danger-400)";
  }
  return "var(--color-danger-600)";
});

const scoreTextClass = computed(() => {
  const score = props.riskScore.overallScore;
  if (score >= 75) {
    return "text-success-600";
  }
  if (score >= 50) {
    return "text-warning-600";
  }
  return "text-danger-600";
});

const riskLevelColor = computed<VcBadgeColorType>(() => {
  const colorMap: Record<string, VcBadgeColorType> = {
    low: "success",
    medium: "warning",
    high: "danger",
    critical: "danger",
  };
  return colorMap[props.riskScore.riskLevel] ?? "neutral";
});

const trendClass = computed(() => {
  switch (props.riskScore.trend) {
    case "improving":
      return "text-success-600";
    case "declining":
      return "text-danger-600";
    case "stable":
    default:
      return "text-neutral-500";
  }
});

function factorBarClass(value: number): string {
  if (value >= 75) {
    return "bg-success-500";
  }
  if (value >= 50) {
    return "bg-warning-500";
  }
  if (value >= 25) {
    return "bg-danger-400";
  }
  return "bg-danger-600";
}
</script>
