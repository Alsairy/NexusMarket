<template>
  <div class="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-additional-50 p-5 shadow-sm">
    <!-- Category header -->
    <div class="flex items-center justify-between">
      <span class="text-sm font-black text-neutral-950">
        {{ $t(forecast.productCategory) }}
      </span>
      <span class="text-xs font-medium text-neutral-400">{{ forecast.period }}</span>
    </div>

    <!-- Current vs Forecasted demand -->
    <div class="flex items-center gap-6">
      <div class="flex flex-col">
        <span class="text-xs text-neutral-500">
          {{ $t("pages.account.ai_insights.demand.current") }}
        </span>
        <span class="text-lg font-black text-neutral-950">
          {{ forecast.currentDemand.toLocaleString() }}
        </span>
      </div>

      <div class="flex items-center text-neutral-300">
        &#10132;
      </div>

      <div class="flex flex-col">
        <span class="text-xs text-neutral-500">
          {{ $t("pages.account.ai_insights.demand.forecasted") }}
        </span>
        <span class="text-lg font-black text-neutral-950">
          {{ forecast.forecastedDemand.toLocaleString() }}
        </span>
      </div>
    </div>

    <!-- Change percentage -->
    <div class="flex items-center gap-2">
      <span class="text-sm font-bold" :class="changeClass">
        <span v-if="forecast.changePercentage > 0">&#9650;</span>
        <span v-else>&#9660;</span>
        {{ forecast.changePercentage > 0 ? "+" : "" }}{{ forecast.changePercentage.toFixed(1) }}%
      </span>
      <span class="text-xs text-neutral-400">
        {{ $t("pages.account.ai_insights.demand.change_label") }}
      </span>
    </div>

    <!-- Confidence bar -->
    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-between">
        <span class="text-xs text-neutral-500">
          {{ $t("pages.account.ai_insights.demand.confidence") }}
        </span>
        <span class="text-xs font-semibold text-neutral-700">{{ forecast.confidence }}%</span>
      </div>
      <div class="h-2 w-full rounded-full bg-neutral-100">
        <div
          class="h-full rounded-full transition-all"
          :class="confidenceBarClass"
          :style="{ width: `${forecast.confidence}%` }"
        ></div>
      </div>
    </div>

    <!-- Seasonal factor -->
    <div class="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-2">
      <span class="text-xs font-bold text-neutral-500">
        {{ $t("pages.account.ai_insights.demand.seasonal_factor") }}:
      </span>
      <span class="text-xs text-neutral-700">{{ $t(forecast.seasonalFactor) }}</span>
    </div>

    <!-- Recommendation -->
    <div class="border-t border-neutral-100 pt-3">
      <span class="text-xs text-neutral-500">
        {{ $t(forecast.recommendation) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { DemandForecastType } from "@/shared/account";

interface IProps {
  forecast: DemandForecastType;
}

const props = defineProps<IProps>();

useI18n();

const changeClass = computed(() => {
  return props.forecast.changePercentage >= 0 ? "text-success-600" : "text-danger-600";
});

const confidenceBarClass = computed(() => {
  if (props.forecast.confidence >= 85) {
    return "bg-success-500";
  }
  if (props.forecast.confidence >= 70) {
    return "bg-primary-500";
  }
  return "bg-warning-500";
});
</script>
