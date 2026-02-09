<template>
  <VcTable
    :columns="columns"
    :items="data"
    :hide-default-footer="true"
    :description="$t('pages.regulator.dashboard.compliance_rates_description')"
    mobile-breakpoint="lg"
  >
    <template #mobile-item="{ item }">
      <div class="grid grid-cols-2 gap-y-3 border-b border-neutral-200 p-5">
        <div class="col-span-2 flex items-center justify-between">
          <span class="font-bold">{{ item.sectorLabel }}</span>
          <VcChip :color="rateChipColor(item.complianceRate)" size="sm" variant="solid">
            {{ item.complianceRate.toFixed(1) }}%
          </VcChip>
        </div>

        <div class="flex flex-col">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.entities_label") }}
          </span>
          <span>{{ item.totalEntities }}</span>
        </div>

        <div class="flex flex-col items-end">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.compliant_label") }}
          </span>
          <span>{{ item.compliantCount }}</span>
        </div>

        <div class="flex flex-col">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.expiring_licenses_label") }}
          </span>
          <span :class="{ 'font-bold text-warning-600': item.expiringLicenses > 0 }">
            {{ item.expiringLicenses }}
          </span>
        </div>

        <div class="flex flex-col items-end">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.violations_label") }}
          </span>
          <span :class="{ 'font-bold text-danger-600': item.violationCount > 0 }">
            {{ item.violationCount }}
          </span>
        </div>
      </div>
    </template>

    <template #desktop-body>
      <tr
        v-for="item in data"
        :key="item.sector"
        class="even:bg-neutral-50"
      >
        <td class="px-4 py-3 font-medium">
          {{ item.sectorLabel }}
        </td>
        <td class="px-4 py-3 text-right">
          {{ item.totalEntities }}
        </td>
        <td class="px-4 py-3 text-right">
          {{ item.compliantCount }}
        </td>
        <td class="px-4 py-3">
          <VcChip :color="rateChipColor(item.complianceRate)" size="sm" variant="solid">
            {{ item.complianceRate.toFixed(1) }}%
          </VcChip>
        </td>
        <td class="px-4 py-3 text-right">
          <span :class="{ 'font-bold text-warning-600': item.expiringLicenses > 0 }">
            {{ item.expiringLicenses }}
          </span>
        </td>
        <td class="px-4 py-3 text-right">
          <span :class="{ 'font-bold text-danger-600': item.violationCount > 0 }">
            {{ item.violationCount }}
          </span>
        </td>
      </tr>
    </template>
  </VcTable>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { ComplianceRateType } from "../types";

interface IProps {
  data: ComplianceRateType[];
}

defineProps<IProps>();

const { t } = useI18n();

const columns = computed<VcTableColumnType[]>(() => [
  { id: "sector", title: t("pages.regulator.dashboard.sector_label") },
  { id: "entities", title: t("pages.regulator.dashboard.entities_label"), align: "right" },
  { id: "compliant", title: t("pages.regulator.dashboard.compliant_label"), align: "right" },
  { id: "rate", title: t("pages.regulator.dashboard.rate_label") },
  { id: "expiringLicenses", title: t("pages.regulator.dashboard.expiring_licenses_label"), align: "right" },
  { id: "violations", title: t("pages.regulator.dashboard.violations_label"), align: "right" },
]);

function rateChipColor(rate: number): VcMainColorType {
  if (rate >= 95) {
    return "success";
  }
  if (rate >= 85) {
    return "warning";
  }
  return "danger";
}
</script>
