<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <!-- Price Outliers -->
      <div
        class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm"
        :class="summary.totalOutliers > 0 ? 'border-l-4 border-l-warning-500' : ''"
      >
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.ai_insights.summary.price_outliers") }}
        </span>
        <span class="text-2xl font-black text-neutral-950">
          {{ summary.totalOutliers }}
        </span>
        <span class="text-xs text-neutral-400">
          {{ $t("pages.account.ai_insights.summary.detected_anomalies") }}
        </span>
      </div>

      <!-- Critical Risks -->
      <div
        class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm"
        :class="summary.criticalRisks > 0 ? 'border-l-4 border-l-danger-500' : ''"
      >
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.ai_insights.summary.critical_risks") }}
        </span>
        <span class="text-2xl font-black" :class="summary.criticalRisks > 0 ? 'text-danger-600' : 'text-neutral-950'">
          {{ summary.criticalRisks }}
        </span>
        <span class="text-xs text-neutral-400">
          {{ $t("pages.account.ai_insights.summary.suppliers_at_risk") }}
        </span>
      </div>

      <!-- Demand Changes -->
      <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.ai_insights.summary.demand_changes") }}
        </span>
        <span class="text-2xl font-black text-neutral-950">
          {{ summary.demandChanges }}
        </span>
        <span class="text-xs text-neutral-400">
          {{ $t("pages.account.ai_insights.summary.significant_shifts") }}
        </span>
      </div>

      <!-- Catalog Issues -->
      <div
        class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm"
        :class="summary.catalogIssues > 0 ? 'border-l-4 border-l-info-500' : ''"
      >
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.ai_insights.summary.catalog_issues") }}
        </span>
        <span class="text-2xl font-black text-neutral-950">
          {{ summary.catalogIssues }}
        </span>
        <span class="text-xs text-neutral-400">
          {{ $t("pages.account.ai_insights.summary.pending_resolution") }}
        </span>
      </div>

      <!-- Unacknowledged Insights -->
      <div
        class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm"
        :class="summary.unacknowledgedInsights > 0 ? 'border-l-4 border-l-primary-500' : ''"
      >
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.ai_insights.summary.unread_insights") }}
        </span>
        <span
          class="text-2xl font-black"
          :class="summary.unacknowledgedInsights > 0 ? 'text-primary-600' : 'text-neutral-950'"
        >
          {{ summary.unacknowledgedInsights }}
        </span>
        <span class="text-xs text-neutral-400">
          {{ $t("pages.account.ai_insights.summary.require_attention") }}
        </span>
      </div>

      <!-- Last Analysis -->
      <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.ai_insights.summary.last_analysis") }}
        </span>
        <span class="text-lg font-black text-neutral-950">
          {{ formattedLastRun }}
        </span>
        <div class="mt-1">
          <VcButton
            size="xs"
            variant="outline"
            :loading="analysisRunning"
            @click="$emit('runAnalysis')"
          >
            {{ $t("pages.account.ai_insights.summary.run_analysis") }}
          </VcButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { AiAnalyticsSummaryType } from "@/shared/account";

interface IProps {
  summary: AiAnalyticsSummaryType;
  analysisRunning?: boolean;
}

interface IEmits {
  (event: "runAnalysis"): void;
}

const props = defineProps<IProps>();
defineEmits<IEmits>();

useI18n();

const formattedLastRun = computed(() => {
  if (!props.summary.lastAnalysisRun) {
    return "---";
  }
  const date = new Date(props.summary.lastAnalysisRun);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});
</script>
