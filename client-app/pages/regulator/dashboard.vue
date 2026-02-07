<template>
  <VcContainer>
    <div class="flex flex-col gap-6">
      <VcTypography tag="h1">
        {{ $t("pages.regulator.dashboard.title") }}
      </VcTypography>

      <!-- KPI Cards -->
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          v-for="kpi in dashboardData.kpis"
          :key="kpi.id"
          :label="kpi.label"
          :value="kpi.value"
          :previous-value="kpi.previousValue"
          :unit="kpi.unit"
          :trend="kpi.trend"
          :trend-is-positive="kpi.trendIsPositive"
        />
      </div>

      <!-- Sector Spend -->
      <VcWidget :title="$t('pages.regulator.dashboard.sector_spend_title')" size="lg">
        <template #default-container>
          <SectorSpendTable :data="dashboardData.sectorSpend" />
        </template>
      </VcWidget>

      <!-- Two column layout -->
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Price Benchmarks -->
        <VcWidget :title="$t('pages.regulator.dashboard.price_benchmarks_title')" size="lg">
          <template #default-container>
            <PriceBenchmarkTable :data="dashboardData.priceBenchmarks" />
          </template>
        </VcWidget>

        <!-- Compliance Rates -->
        <VcWidget :title="$t('pages.regulator.dashboard.compliance_rates_title')" size="lg">
          <template #default-container>
            <ComplianceRateTable :data="dashboardData.complianceRates" />
          </template>
        </VcWidget>
      </div>

      <!-- Supplier Concentration -->
      <VcWidget :title="$t('pages.regulator.dashboard.supplier_concentration_title')" size="lg">
        <template #default-container>
          <SupplierConcentrationTable :data="dashboardData.supplierConcentration" />
        </template>
      </VcWidget>
    </div>
  </VcContainer>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { usePageHead } from "@/core/composables";
import { useRegulatorDashboard } from "@/shared/regulator";
import {
  KpiCard,
  SectorSpendTable,
  PriceBenchmarkTable,
  ComplianceRateTable,
  SupplierConcentrationTable,
} from "@/shared/regulator/components";

const { t } = useI18n();

usePageHead({
  title: t("pages.regulator.dashboard.meta.title"),
});

const { dashboardData, fetchDashboardData } = useRegulatorDashboard();

onMounted(() => {
  void fetchDashboardData();
});
</script>
