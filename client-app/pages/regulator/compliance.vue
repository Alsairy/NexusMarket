<template>
  <VcContainer>
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <VcTypography tag="h1">
          {{ $t("pages.regulator.compliance.title") }}
        </VcTypography>

        <VcButton variant="outline" :to="{ name: 'RegulatorDashboard' }">
          <VcIcon name="arrow-left" size="xs" />
          {{ $t("pages.regulator.compliance.back_to_dashboard") }}
        </VcButton>
      </div>

      <!-- Sector Filter -->
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-sm font-medium text-neutral-600">
          {{ $t("pages.regulator.compliance.filter_by_sector") }}
        </span>
        <VcChip
          :color="selectedSector === null ? 'primary' : 'neutral'"
          :variant="selectedSector === null ? 'solid' : 'outline'"
          size="sm"
          clickable
          @click="selectedSector = null"
        >
          {{ $t("pages.regulator.compliance.all_sectors") }}
        </VcChip>
        <VcChip
          v-for="rate in dashboardData.complianceRates"
          :key="rate.sector"
          :color="selectedSector === rate.sector ? 'primary' : 'neutral'"
          :variant="selectedSector === rate.sector ? 'solid' : 'outline'"
          size="sm"
          clickable
          @click="selectedSector = rate.sector"
        >
          {{ rate.sectorLabel }}
        </VcChip>
      </div>

      <!-- Compliance Overview Grid -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <VcWidget
          v-for="rate in filteredComplianceRates"
          :key="rate.sector"
          :title="rate.sectorLabel"
          size="sm"
        >
          <div class="flex flex-col gap-3">
            <!-- Compliance Rate Indicator -->
            <div class="flex items-center justify-between">
              <span class="text-sm text-neutral-500">
                {{ $t("pages.regulator.compliance.compliance_rate") }}
              </span>
              <span
                class="text-xl font-black"
                :class="rateColorClass(rate.complianceRate)"
              >
                {{ rate.complianceRate.toFixed(1) }}%
              </span>
            </div>

            <!-- Progress Bar -->
            <div class="h-3 w-full overflow-hidden rounded-full bg-neutral-100">
              <div
                class="h-full rounded-full transition-all"
                :class="rateBarClass(rate.complianceRate)"
                :style="{ width: `${rate.complianceRate}%` }"
              />
            </div>

            <!-- Stats Row -->
            <div class="grid grid-cols-3 gap-2 text-center">
              <div class="flex flex-col">
                <span class="text-lg font-bold">{{ rate.compliantCount }}</span>
                <span class="text-xs text-neutral-400">
                  {{ $t("pages.regulator.compliance.compliant") }}
                </span>
              </div>
              <div class="flex flex-col">
                <span class="text-lg font-bold" :class="{ 'text-warning-600': rate.expiringLicenses > 0 }">
                  {{ rate.expiringLicenses }}
                </span>
                <span class="text-xs text-neutral-400">
                  {{ $t("pages.regulator.compliance.expiring") }}
                </span>
              </div>
              <div class="flex flex-col">
                <span class="text-lg font-bold" :class="{ 'text-danger-600': rate.violationCount > 0 }">
                  {{ rate.violationCount }}
                </span>
                <span class="text-xs text-neutral-400">
                  {{ $t("pages.regulator.compliance.violations") }}
                </span>
              </div>
            </div>
          </div>
        </VcWidget>
      </div>

      <!-- Non-Compliant Entities -->
      <VcWidget :title="$t('pages.regulator.compliance.non_compliant_title')" size="lg">
        <template #default-container>
          <VcTable
            :columns="nonCompliantColumns"
            :items="nonCompliantEntities"
            :hide-default-footer="true"
            :description="$t('pages.regulator.compliance.non_compliant_description')"
            mobile-breakpoint="lg"
          >
            <template #mobile-item="{ item }">
              <div class="grid grid-cols-2 gap-y-3 border-b border-neutral-200 p-5">
                <div class="col-span-2 flex items-center justify-between">
                  <span class="font-bold">{{ item.entityName }}</span>
                  <VcChip :color="issueTypeColor(item.issueType)" size="sm" variant="solid">
                    {{ item.issueType }}
                  </VcChip>
                </div>

                <div class="flex flex-col">
                  <span class="text-xs text-neutral-400">
                    {{ $t("pages.regulator.compliance.sector_label") }}
                  </span>
                  <span>{{ item.sectorLabel }}</span>
                </div>

                <div class="flex flex-col items-end">
                  <span class="text-xs text-neutral-400">
                    {{ $t("pages.regulator.compliance.days_overdue_label") }}
                  </span>
                  <span class="font-bold text-danger-600">{{ item.daysOverdue }}</span>
                </div>

                <div class="col-span-2 flex flex-col">
                  <span class="text-xs text-neutral-400">
                    {{ $t("pages.regulator.compliance.description_label") }}
                  </span>
                  <span class="text-sm">{{ item.description }}</span>
                </div>
              </div>
            </template>

            <template #desktop-body>
              <tr
                v-for="item in nonCompliantEntities"
                :key="item.id"
                class="even:bg-neutral-50"
              >
                <td class="px-4 py-3 font-medium">{{ item.entityName }}</td>
                <td class="px-4 py-3">{{ item.sectorLabel }}</td>
                <td class="px-4 py-3">
                  <VcChip :color="issueTypeColor(item.issueType)" size="sm" variant="solid">
                    {{ item.issueType }}
                  </VcChip>
                </td>
                <td class="px-4 py-3">{{ item.description }}</td>
                <td class="px-4 py-3 text-right font-bold text-danger-600">{{ item.daysOverdue }}</td>
              </tr>
            </template>
          </VcTable>
        </template>
      </VcWidget>
    </div>
  </VcContainer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { usePageHead } from "@/core/composables";
import { useRegulatorDashboard } from "@/shared/regulator";
import type { SectorType } from "@/shared/regulator";

const { t } = useI18n();

usePageHead({
  title: t("pages.regulator.compliance.meta.title"),
});

const { dashboardData, fetchDashboardData } = useRegulatorDashboard();

const selectedSector = ref<SectorType | null>(null);

const filteredComplianceRates = computed(() => {
  if (!selectedSector.value) {
    return dashboardData.value.complianceRates;
  }
  return dashboardData.value.complianceRates.filter((rate) => rate.sector === selectedSector.value);
});

type NonCompliantEntity = {
  id: string;
  entityName: string;
  sector: SectorType;
  sectorLabel: string;
  issueType: string;
  description: string;
  daysOverdue: number;
};

const allNonCompliantEntities: NonCompliantEntity[] = [
  {
    id: "nc-1",
    entityName: "BuildRight Construction Co.",
    sector: "construction",
    sectorLabel: "Construction",
    issueType: "Expired License",
    description: "Business operating license expired, renewal pending review",
    daysOverdue: 15,
  },
  {
    id: "nc-2",
    entityName: "Metro Steel Works",
    sector: "manufacturing",
    sectorLabel: "Manufacturing",
    issueType: "Safety Violation",
    description: "Failed workplace safety inspection on 2 critical items",
    daysOverdue: 8,
  },
  {
    id: "nc-3",
    entityName: "GreenField Farms",
    sector: "construction",
    sectorLabel: "Construction",
    issueType: "Documentation",
    description: "Missing required environmental compliance certificates",
    daysOverdue: 22,
  },
  {
    id: "nc-4",
    entityName: "PowerGrid Solutions",
    sector: "energy",
    sectorLabel: "Energy",
    issueType: "Expired License",
    description: "Hazardous materials handling permit expired",
    daysOverdue: 5,
  },
  {
    id: "nc-5",
    entityName: "QuickShip Logistics",
    sector: "retail",
    sectorLabel: "Retail",
    issueType: "Safety Violation",
    description: "Non-compliant storage facility, pending remediation",
    daysOverdue: 12,
  },
  {
    id: "nc-6",
    entityName: "Apex Energy Corp",
    sector: "energy",
    sectorLabel: "Energy",
    issueType: "Documentation",
    description: "Incomplete annual compliance report submission",
    daysOverdue: 30,
  },
  {
    id: "nc-7",
    entityName: "TechVault Systems",
    sector: "construction",
    sectorLabel: "Construction",
    issueType: "Expired License",
    description: "Electrical contractor license renewal overdue",
    daysOverdue: 18,
  },
  {
    id: "nc-8",
    entityName: "CityMart Retail Group",
    sector: "retail",
    sectorLabel: "Retail",
    issueType: "Documentation",
    description: "Missing product safety certification documents",
    daysOverdue: 7,
  },
  {
    id: "nc-9",
    entityName: "Ironclad Manufacturing",
    sector: "manufacturing",
    sectorLabel: "Manufacturing",
    issueType: "Safety Violation",
    description: "Emissions exceeding permitted levels by 12%",
    daysOverdue: 3,
  },
  {
    id: "nc-10",
    entityName: "SolidBase Construction",
    sector: "construction",
    sectorLabel: "Construction",
    issueType: "Expired License",
    description: "General contractor insurance certificate lapsed",
    daysOverdue: 10,
  },
];

const nonCompliantEntities = computed(() => {
  if (!selectedSector.value) {
    return allNonCompliantEntities;
  }
  return allNonCompliantEntities.filter((entity) => entity.sector === selectedSector.value);
});

const nonCompliantColumns = computed<VcTableColumnType[]>(() => [
  { id: "entity", title: t("pages.regulator.compliance.entity_name_label") },
  { id: "sector", title: t("pages.regulator.compliance.sector_label") },
  { id: "issueType", title: t("pages.regulator.compliance.issue_type_label") },
  { id: "description", title: t("pages.regulator.compliance.description_label") },
  { id: "daysOverdue", title: t("pages.regulator.compliance.days_overdue_label"), align: "right" },
]);

function rateColorClass(rate: number): string {
  if (rate >= 95) {
    return "text-success-600";
  }
  if (rate >= 85) {
    return "text-warning-600";
  }
  return "text-danger-600";
}

function rateBarClass(rate: number): string {
  if (rate >= 95) {
    return "bg-success-500";
  }
  if (rate >= 85) {
    return "bg-warning-500";
  }
  return "bg-danger-500";
}

function issueTypeColor(issueType: string): VcMainColorType {
  switch (issueType) {
    case "Expired License":
      return "danger";
    case "Safety Violation":
      return "warning";
    case "Documentation":
      return "info";
    default:
      return "neutral";
  }
}

onMounted(() => {
  if (!dashboardData.value.complianceRates.length) {
    void fetchDashboardData();
  }
});
</script>
