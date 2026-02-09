<template>
  <VcTable
    :columns="columns"
    :items="data"
    :hide-default-footer="true"
    :description="$t('pages.regulator.dashboard.sector_spend_description')"
    mobile-breakpoint="lg"
  >
    <template #mobile-item="{ item }">
      <div class="grid grid-cols-2 gap-y-3 border-b border-neutral-200 p-5">
        <div class="flex flex-col">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.sector_label") }}
          </span>
          <span class="font-bold">{{ item.sectorLabel }}</span>
        </div>

        <div class="flex flex-col items-end">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.total_spend_label") }}
          </span>
          <span class="font-bold">{{ formatCurrency(item.totalSpend) }}</span>
        </div>

        <div class="flex flex-col">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.orders_label") }}
          </span>
          <span>{{ item.orderCount.toLocaleString() }}</span>
        </div>

        <div class="flex flex-col items-end">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.avg_order_value_label") }}
          </span>
          <span>{{ formatCurrency(item.averageOrderValue) }}</span>
        </div>

        <div class="col-span-2">
          <div class="flex items-center justify-between text-xs text-neutral-400">
            <span>{{ $t("pages.regulator.dashboard.pct_of_total_label") }}</span>
            <span class="font-medium text-neutral-700">{{ item.percentageOfTotal.toFixed(1) }}%</span>
          </div>
          <div class="mt-1 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              class="h-full rounded-full bg-primary-500 transition-all"
              :style="{ width: `${item.percentageOfTotal}%` }"
            />
          </div>
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
        <td class="px-4 py-3 text-right font-bold">
          {{ formatCurrency(item.totalSpend) }}
        </td>
        <td class="px-4 py-3 text-right">
          {{ item.orderCount.toLocaleString() }}
        </td>
        <td class="px-4 py-3 text-right">
          {{ item.supplierCount }}
        </td>
        <td class="px-4 py-3 text-right">
          {{ formatCurrency(item.averageOrderValue) }}
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-2">
            <div class="h-2 w-24 overflow-hidden rounded-full bg-neutral-100">
              <div
                class="h-full rounded-full bg-primary-500 transition-all"
                :style="{ width: `${item.percentageOfTotal}%` }"
              />
            </div>
            <span class="min-w-[3rem] text-right text-sm">{{ item.percentageOfTotal.toFixed(1) }}%</span>
          </div>
        </td>
      </tr>
    </template>
  </VcTable>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { SectorSpendType } from "../types";

interface IProps {
  data: SectorSpendType[];
}

defineProps<IProps>();

const { t } = useI18n();

const columns = computed<VcTableColumnType[]>(() => [
  { id: "sector", title: t("pages.regulator.dashboard.sector_label") },
  { id: "totalSpend", title: t("pages.regulator.dashboard.total_spend_label"), align: "right" },
  { id: "orders", title: t("pages.regulator.dashboard.orders_label"), align: "right" },
  { id: "suppliers", title: t("pages.regulator.dashboard.suppliers_label"), align: "right" },
  { id: "avgOrderValue", title: t("pages.regulator.dashboard.avg_order_value_label"), align: "right" },
  { id: "percentOfTotal", title: t("pages.regulator.dashboard.pct_of_total_label") },
]);

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${value.toLocaleString()}`;
}
</script>
