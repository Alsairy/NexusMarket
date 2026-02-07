<template>
  <VcContainer>
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <VcTypography tag="h1">
          {{ $t("pages.regulator.suppliers.title") }}
        </VcTypography>

        <VcButton variant="outline" :to="{ name: 'RegulatorDashboard' }">
          <VcIcon name="arrow-left" size="xs" />
          {{ $t("pages.regulator.suppliers.back_to_dashboard") }}
        </VcButton>
      </div>

      <!-- Extended Concentration Table -->
      <VcWidget :title="$t('pages.regulator.suppliers.concentration_by_sector_title')" size="lg">
        <template #default-container>
          <VcTable
            :columns="concentrationColumns"
            :items="dashboardData.supplierConcentration"
            :hide-default-footer="true"
            :description="$t('pages.regulator.suppliers.concentration_description')"
            mobile-breakpoint="lg"
          >
            <template #mobile-item="{ item }">
              <div class="grid grid-cols-2 gap-y-3 border-b border-neutral-200 p-5">
                <div class="col-span-2 flex items-center justify-between">
                  <span class="font-bold">{{ item.sectorLabel }}</span>
                  <VcChip :color="levelChipColor(item.concentrationLevel)" size="sm" variant="solid">
                    {{ levelLabel(item.concentrationLevel) }}
                  </VcChip>
                </div>

                <div class="flex flex-col">
                  <span class="text-xs text-neutral-400">
                    {{ $t("pages.regulator.suppliers.total_suppliers_label") }}
                  </span>
                  <span>{{ item.totalSuppliers }}</span>
                </div>

                <div class="flex flex-col items-end">
                  <span class="text-xs text-neutral-400">
                    {{ $t("pages.regulator.suppliers.top3_share_label") }}
                  </span>
                  <span>{{ item.top3Share.toFixed(1) }}%</span>
                </div>

                <div class="flex flex-col">
                  <span class="text-xs text-neutral-400">
                    {{ $t("pages.regulator.suppliers.hhi_label") }}
                  </span>
                  <span>{{ item.herfindahlIndex.toLocaleString() }}</span>
                </div>

                <div class="flex flex-col items-end">
                  <span class="text-xs text-neutral-400">
                    {{ $t("pages.regulator.suppliers.risk_assessment_label") }}
                  </span>
                  <span :class="riskClass(item.concentrationLevel)">
                    {{ riskLabel(item.concentrationLevel) }}
                  </span>
                </div>

                <!-- HHI Bar Visualization -->
                <div class="col-span-2">
                  <div class="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                    <div
                      class="h-full rounded-full transition-all"
                      :class="hhiBarClass(item.herfindahlIndex)"
                      :style="{ width: `${Math.min((item.herfindahlIndex / 10000) * 100, 100)}%` }"
                    />
                  </div>
                </div>
              </div>
            </template>

            <template #desktop-body>
              <tr
                v-for="item in dashboardData.supplierConcentration"
                :key="item.sector"
                class="even:bg-neutral-50"
              >
                <td class="px-4 py-3 font-medium">{{ item.sectorLabel }}</td>
                <td class="px-4 py-3 text-right">{{ item.totalSuppliers }}</td>
                <td class="px-4 py-3 text-right">
                  <span :class="{ 'font-bold text-danger-600': item.top3Share >= 60 }">
                    {{ item.top3Share.toFixed(1) }}%
                  </span>
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <div class="h-2 w-20 overflow-hidden rounded-full bg-neutral-100">
                      <div
                        class="h-full rounded-full transition-all"
                        :class="hhiBarClass(item.herfindahlIndex)"
                        :style="{ width: `${Math.min((item.herfindahlIndex / 10000) * 100, 100)}%` }"
                      />
                    </div>
                    <span class="text-sm">{{ item.herfindahlIndex.toLocaleString() }}</span>
                  </div>
                </td>
                <td class="px-4 py-3">
                  <VcChip :color="levelChipColor(item.concentrationLevel)" size="sm" variant="solid">
                    {{ levelLabel(item.concentrationLevel) }}
                  </VcChip>
                </td>
                <td class="px-4 py-3">
                  <span :class="riskClass(item.concentrationLevel)" class="text-sm font-medium">
                    {{ riskLabel(item.concentrationLevel) }}
                  </span>
                </td>
              </tr>
            </template>
          </VcTable>
        </template>
      </VcWidget>

      <!-- Two column layout -->
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Top Suppliers by Market Share -->
        <VcWidget :title="$t('pages.regulator.suppliers.top_suppliers_title')" size="lg">
          <template #default-container>
            <VcTable
              :columns="topSuppliersColumns"
              :items="topSuppliers"
              :hide-default-footer="true"
              :description="$t('pages.regulator.suppliers.top_suppliers_description')"
              mobile-breakpoint="lg"
            >
              <template #mobile-item="{ item }">
                <div class="flex items-center justify-between border-b border-neutral-200 p-5">
                  <div class="flex flex-col">
                    <span class="font-bold">{{ item.name }}</span>
                    <span class="text-xs text-neutral-400">{{ item.sector }}</span>
                  </div>
                  <div class="flex flex-col items-end">
                    <span class="font-bold">{{ item.marketShare.toFixed(1) }}%</span>
                    <span class="text-xs text-neutral-500">{{ formatCurrency(item.revenue) }}</span>
                  </div>
                </div>
              </template>

              <template #desktop-body>
                <tr
                  v-for="(item, index) in topSuppliers"
                  :key="item.id"
                  class="even:bg-neutral-50"
                >
                  <td class="px-4 py-3 text-center font-bold text-neutral-400">
                    {{ index + 1 }}
                  </td>
                  <td class="px-4 py-3 font-medium">{{ item.name }}</td>
                  <td class="px-4 py-3">{{ item.sector }}</td>
                  <td class="px-4 py-3 text-right font-bold">
                    {{ item.marketShare.toFixed(1) }}%
                  </td>
                  <td class="px-4 py-3 text-right">
                    {{ formatCurrency(item.revenue) }}
                  </td>
                </tr>
              </template>
            </VcTable>
          </template>
        </VcWidget>

        <!-- New Supplier Registrations Timeline -->
        <VcWidget :title="$t('pages.regulator.suppliers.new_registrations_title')" size="lg">
          <div class="flex flex-col gap-4">
            <div
              v-for="registration in newRegistrations"
              :key="registration.id"
              class="flex items-start gap-3 border-b border-neutral-100 pb-4 last:border-0"
            >
              <div class="mt-0.5 flex-none">
                <div class="flex size-8 items-center justify-center rounded-full bg-primary-50">
                  <VcIcon name="add-circle" size="xs" class="text-primary-500" />
                </div>
              </div>

              <div class="flex grow flex-col">
                <span class="font-bold text-neutral-900">{{ registration.name }}</span>
                <span class="text-sm text-neutral-500">{{ registration.sector }}</span>
                <span class="mt-1 text-xs text-neutral-400">{{ registration.date }}</span>
              </div>

              <VcChip :color="registrationStatusColor(registration.status)" size="sm" variant="outline-dark">
                {{ registration.status }}
              </VcChip>
            </div>
          </div>
        </VcWidget>
      </div>
    </div>
  </VcContainer>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { usePageHead } from "@/core/composables";
import { useRegulatorDashboard } from "@/shared/regulator";
import type { SupplierConcentrationType } from "@/shared/regulator";

const { t } = useI18n();

usePageHead({
  title: t("pages.regulator.suppliers.meta.title"),
});

const { dashboardData, fetchDashboardData } = useRegulatorDashboard();

// Concentration table columns (extended)
const concentrationColumns = computed<VcTableColumnType[]>(() => [
  { id: "sector", title: t("pages.regulator.suppliers.sector_label") },
  { id: "suppliers", title: t("pages.regulator.suppliers.total_suppliers_label"), align: "right" },
  { id: "top3Share", title: t("pages.regulator.suppliers.top3_share_label"), align: "right" },
  { id: "hhi", title: t("pages.regulator.suppliers.hhi_label") },
  { id: "level", title: t("pages.regulator.suppliers.level_label") },
  { id: "risk", title: t("pages.regulator.suppliers.risk_assessment_label") },
]);

// Top suppliers mock data
type TopSupplier = {
  id: string;
  name: string;
  sector: string;
  marketShare: number;
  revenue: number;
};

const topSuppliers: TopSupplier[] = [
  { id: "ts-1", name: "Global Manufacturing Ltd", sector: "Manufacturing", marketShare: 12.4, revenue: 1536000 },
  { id: "ts-2", name: "MedTech Solutions", sector: "Healthcare", marketShare: 9.8, revenue: 1215000 },
  { id: "ts-3", name: "BuildMaster Corp", sector: "Construction", marketShare: 8.5, revenue: 1053000 },
  { id: "ts-4", name: "TechPro Industries", sector: "Technology", marketShare: 7.9, revenue: 979000 },
  { id: "ts-5", name: "FreshSource Distributors", sector: "Food & Beverage", marketShare: 7.2, revenue: 892000 },
  { id: "ts-6", name: "EnergyFirst Corp", sector: "Energy", marketShare: 6.8, revenue: 843000 },
  { id: "ts-7", name: "RetailPro Wholesale", sector: "Retail", marketShare: 5.5, revenue: 682000 },
  { id: "ts-8", name: "Precision Parts Inc", sector: "Manufacturing", marketShare: 5.1, revenue: 632000 },
  { id: "ts-9", name: "SafetyNet Equipment", sector: "Construction", marketShare: 4.7, revenue: 583000 },
  { id: "ts-10", name: "AgriSupply Co", sector: "Agriculture", marketShare: 4.3, revenue: 533000 },
];

const topSuppliersColumns = computed<VcTableColumnType[]>(() => [
  { id: "rank", title: "#", align: "center", classes: "w-12" },
  { id: "name", title: t("pages.regulator.suppliers.supplier_name_label") },
  { id: "sector", title: t("pages.regulator.suppliers.sector_label") },
  { id: "marketShare", title: t("pages.regulator.suppliers.market_share_label"), align: "right" },
  { id: "revenue", title: t("pages.regulator.suppliers.revenue_label"), align: "right" },
]);

// New registrations timeline mock data
type NewRegistration = {
  id: string;
  name: string;
  sector: string;
  date: string;
  status: string;
};

const newRegistrations: NewRegistration[] = [
  { id: "nr-1", name: "NovaTech Solutions", sector: "Technology", date: "Feb 7, 2026", status: "Approved" },
  { id: "nr-2", name: "GreenBuild Materials", sector: "Construction", date: "Feb 6, 2026", status: "Pending" },
  { id: "nr-3", name: "FreshHarvest Foods", sector: "Food & Beverage", date: "Feb 5, 2026", status: "Approved" },
  { id: "nr-4", name: "MedCare Instruments", sector: "Healthcare", date: "Feb 4, 2026", status: "Under Review" },
  { id: "nr-5", name: "SolarEdge Energy", sector: "Energy", date: "Feb 3, 2026", status: "Approved" },
  { id: "nr-6", name: "PrecisionCraft Mfg", sector: "Manufacturing", date: "Feb 2, 2026", status: "Pending" },
  { id: "nr-7", name: "AgriGrowth Partners", sector: "Agriculture", date: "Feb 1, 2026", status: "Approved" },
  { id: "nr-8", name: "UrbanRetail Group", sector: "Retail", date: "Jan 31, 2026", status: "Under Review" },
];

function levelChipColor(level: SupplierConcentrationType["concentrationLevel"]): VcMainColorType {
  switch (level) {
    case "low":
      return "success";
    case "moderate":
      return "info";
    case "high":
      return "warning";
    case "very_high":
      return "danger";
    default:
      return "neutral";
  }
}

function levelLabel(level: SupplierConcentrationType["concentrationLevel"]): string {
  switch (level) {
    case "low":
      return t("pages.regulator.suppliers.concentration_low");
    case "moderate":
      return t("pages.regulator.suppliers.concentration_moderate");
    case "high":
      return t("pages.regulator.suppliers.concentration_high");
    case "very_high":
      return t("pages.regulator.suppliers.concentration_very_high");
    default:
      return level;
  }
}

function riskClass(level: SupplierConcentrationType["concentrationLevel"]): string {
  switch (level) {
    case "low":
      return "text-success-600";
    case "moderate":
      return "text-info-600";
    case "high":
      return "text-warning-600";
    case "very_high":
      return "text-danger-600";
    default:
      return "text-neutral-600";
  }
}

function riskLabel(level: SupplierConcentrationType["concentrationLevel"]): string {
  switch (level) {
    case "low":
      return t("pages.regulator.suppliers.risk_low");
    case "moderate":
      return t("pages.regulator.suppliers.risk_moderate");
    case "high":
      return t("pages.regulator.suppliers.risk_elevated");
    case "very_high":
      return t("pages.regulator.suppliers.risk_critical");
    default:
      return level;
  }
}

function hhiBarClass(hhi: number): string {
  if (hhi < 1500) {
    return "bg-success-500";
  }
  if (hhi < 2500) {
    return "bg-warning-500";
  }
  return "bg-danger-500";
}

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${value.toLocaleString()}`;
}

function registrationStatusColor(status: string): VcMainColorType {
  switch (status) {
    case "Approved":
      return "success";
    case "Pending":
      return "warning";
    case "Under Review":
      return "info";
    default:
      return "neutral";
  }
}

onMounted(() => {
  if (!dashboardData.value.supplierConcentration.length) {
    void fetchDashboardData();
  }
});
</script>
