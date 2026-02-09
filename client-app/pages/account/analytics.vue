<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <VcTypography tag="h1">
        {{ $t("pages.account.analytics.title") }}
      </VcTypography>

      <!-- Period selector -->
      <div class="flex gap-2">
        <VcButton
          v-for="period in periods"
          :key="period.value"
          :variant="selectedPeriod === period.value ? 'solid' : 'outline'"
          size="xs"
          @click="changePeriod(period.value)"
        >
          {{ period.label }}
        </VcButton>
      </div>
    </div>

    <!-- Metric Cards -->
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <MetricCard
        v-for="metric in dashboardData.metrics"
        :key="metric.id"
        :metric="metric"
      />
    </div>

    <!-- Sales Overview (wide) -->
    <VcWidget :title="$t('pages.account.analytics.sales_overview_title')" size="lg">
      <SalesOverview :data="dashboardData.salesData" />
    </VcWidget>

    <!-- Two-column: Top Products + Spend by Category -->
    <div class="grid gap-6 lg:grid-cols-2">
      <VcWidget :title="$t('pages.account.analytics.top_products_title')" size="lg">
        <template #default-container>
          <TopProductsList :products="dashboardData.topProducts" />
        </template>
      </VcWidget>

      <VcWidget :title="$t('pages.account.analytics.spend_by_category_title')" size="lg">
        <SpendByCategory :data="dashboardData.spendByCategory" />
      </VcWidget>
    </div>

    <!-- Two-column: Order Trends + Performance -->
    <div class="grid gap-6 lg:grid-cols-2">
      <VcWidget :title="$t('pages.account.analytics.order_trends_title')" size="lg">
        <template #default-container>
          <OrderTrendsTable :trends="dashboardData.orderTrends" />
        </template>
      </VcWidget>

      <VcWidget :title="$t('pages.account.analytics.performance_title')" size="lg">
        <PerformanceScorecard :scores="dashboardData.performanceScores" />
      </VcWidget>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { usePageHead } from "@/core/composables";
import {
  useAnalytics,
  MetricCard,
  SalesOverview,
  TopProductsList,
  SpendByCategory,
  OrderTrendsTable,
  PerformanceScorecard,
} from "@/shared/account";
import type { TimePeriodType } from "@/shared/account";

const { t } = useI18n();

usePageHead({
  title: t("pages.account.analytics.meta.title"),
});

const { selectedPeriod, dashboardData, fetchAnalytics } = useAnalytics();

const periods: { value: TimePeriodType; label: string }[] = [
  { value: "7d", label: t("pages.account.analytics.periods.7d") },
  { value: "30d", label: t("pages.account.analytics.periods.30d") },
  { value: "90d", label: t("pages.account.analytics.periods.90d") },
  { value: "12m", label: t("pages.account.analytics.periods.12m") },
];

async function changePeriod(period: TimePeriodType): Promise<void> {
  await fetchAnalytics(period);
}
</script>
