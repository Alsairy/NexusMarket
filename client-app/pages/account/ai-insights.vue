<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <VcTypography tag="h1">
        {{ $t("pages.account.ai_insights.title") }}
      </VcTypography>

      <VcButton
        variant="solid"
        size="sm"
        :loading="analysisRunning"
        @click="handleRunAnalysis"
      >
        {{ $t("pages.account.ai_insights.run_analysis_button") }}
      </VcButton>
    </div>

    <!-- Summary KPI Cards -->
    <AiSummaryCards
      :summary="summary"
      :analysis-running="analysisRunning"
      @run-analysis="handleRunAnalysis"
    />

    <!-- Price Monitoring Section -->
    <VcWidget :title="$t('pages.account.ai_insights.sections.price_monitoring')" size="lg">
      <template #default-container>
        <PriceOutlierTable :outliers="priceOutliers" />
      </template>
    </VcWidget>

    <!-- Supplier Risk Assessment Section -->
    <VcWidget :title="$t('pages.account.ai_insights.sections.supplier_risk')" size="lg">
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <RiskScoreGauge
          v-for="score in riskScores"
          :key="score.id"
          :risk-score="score"
        />
      </div>
    </VcWidget>

    <!-- Demand Forecasting Section -->
    <VcWidget :title="$t('pages.account.ai_insights.sections.demand_forecasting')" size="lg">
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <DemandForecastCard
          v-for="forecast in demandForecasts"
          :key="forecast.id"
          :forecast="forecast"
        />
      </div>
    </VcWidget>

    <!-- Catalog Health Section -->
    <VcWidget :title="$t('pages.account.ai_insights.sections.catalog_health')" size="lg">
      <template #default-container>
        <CatalogNormalizationTable
          :issues="catalogIssues"
          @accept="handleAcceptCatalog"
          @dismiss="handleDismissCatalog"
        />
      </template>
    </VcWidget>

    <!-- Procurement Insights Section -->
    <VcWidget :title="$t('pages.account.ai_insights.sections.procurement_insights')" size="lg">
      <div class="flex flex-col gap-4">
        <ProcurementInsightCard
          v-for="insight in insights"
          :key="insight.id"
          :insight="insight"
          @acknowledge="handleAcknowledge"
        />
      </div>
    </VcWidget>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { usePageHead } from "@/core/composables";
import {
  useAiAnalytics,
  AiSummaryCards,
  PriceOutlierTable,
  RiskScoreGauge,
  DemandForecastCard,
  CatalogNormalizationTable,
  ProcurementInsightCard,
} from "@/shared/account";

const { t } = useI18n();

usePageHead({
  title: t("pages.account.ai_insights.meta.title"),
});

const {
  analysisRunning,
  priceOutliers,
  riskScores,
  demandForecasts,
  catalogIssues,
  insights,
  summary,
  acknowledgeInsight,
  acceptCatalogSuggestion,
  dismissCatalogSuggestion,
  runAnalysis,
} = useAiAnalytics();

async function handleRunAnalysis(): Promise<void> {
  await runAnalysis();
}

function handleAcknowledge(id: string): void {
  acknowledgeInsight(id);
}

function handleAcceptCatalog(id: string): void {
  acceptCatalogSuggestion(id);
}

function handleDismissCatalog(id: string): void {
  dismissCatalogSuggestion(id);
}
</script>
