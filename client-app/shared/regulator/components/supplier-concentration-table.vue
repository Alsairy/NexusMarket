<template>
  <VcTable
    :columns="columns"
    :items="data"
    :hide-default-footer="true"
    :description="$t('pages.regulator.dashboard.supplier_concentration_description')"
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
            {{ $t("pages.regulator.dashboard.total_suppliers_label") }}
          </span>
          <span>{{ item.totalSuppliers }}</span>
        </div>

        <div class="flex flex-col items-end">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.top3_share_label") }}
          </span>
          <span :class="{ 'font-bold text-danger-600': item.top3Share >= 60 }">
            {{ item.top3Share.toFixed(1) }}%
          </span>
        </div>

        <div class="col-span-2 flex flex-col">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.hhi_label") }}
          </span>
          <span>{{ item.herfindahlIndex.toLocaleString() }}</span>
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
          {{ item.totalSuppliers }}
        </td>
        <td class="px-4 py-3 text-right">
          <span :class="{ 'font-bold text-danger-600': item.top3Share >= 60 }">
            {{ item.top3Share.toFixed(1) }}%
          </span>
        </td>
        <td class="px-4 py-3 text-right">
          {{ item.herfindahlIndex.toLocaleString() }}
        </td>
        <td class="px-4 py-3">
          <VcChip :color="levelChipColor(item.concentrationLevel)" size="sm" variant="solid">
            {{ levelLabel(item.concentrationLevel) }}
          </VcChip>
        </td>
      </tr>
    </template>
  </VcTable>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { SupplierConcentrationType } from "../types";

interface IProps {
  data: SupplierConcentrationType[];
}

defineProps<IProps>();

const { t } = useI18n();

const columns = computed<VcTableColumnType[]>(() => [
  { id: "sector", title: t("pages.regulator.dashboard.sector_label") },
  { id: "suppliers", title: t("pages.regulator.dashboard.total_suppliers_label"), align: "right" },
  { id: "top3Share", title: t("pages.regulator.dashboard.top3_share_label"), align: "right" },
  { id: "hhi", title: t("pages.regulator.dashboard.hhi_label"), align: "right" },
  { id: "level", title: t("pages.regulator.dashboard.level_label") },
]);

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
      return t("pages.regulator.dashboard.concentration_low");
    case "moderate":
      return t("pages.regulator.dashboard.concentration_moderate");
    case "high":
      return t("pages.regulator.dashboard.concentration_high");
    case "very_high":
      return t("pages.regulator.dashboard.concentration_very_high");
    default:
      return level;
  }
}
</script>
