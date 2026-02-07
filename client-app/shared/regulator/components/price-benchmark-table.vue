<template>
  <VcTable
    :columns="columns"
    :items="data"
    :hide-default-footer="true"
    :description="$t('pages.regulator.dashboard.price_benchmarks_description')"
    mobile-breakpoint="lg"
  >
    <template #mobile-item="{ item }">
      <div class="grid grid-cols-2 gap-y-3 border-b border-neutral-200 p-5">
        <div class="col-span-2 flex flex-col">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.category_label") }}
          </span>
          <span class="font-bold">{{ item.productCategory }}</span>
        </div>

        <div class="flex flex-col">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.avg_price_label") }}
          </span>
          <span>{{ formatPrice(item.averagePrice) }}</span>
        </div>

        <div class="flex flex-col items-end">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.median_label") }}
          </span>
          <span>{{ formatPrice(item.medianPrice) }}</span>
        </div>

        <div class="flex flex-col">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.range_label") }}
          </span>
          <span>{{ formatPrice(item.lowestPrice) }} - {{ formatPrice(item.highestPrice) }}</span>
        </div>

        <div class="flex flex-col items-end">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.regulator.dashboard.variance_label") }}
          </span>
          <span :class="varianceClass(item.priceVariance)">{{ item.priceVariance.toFixed(1) }}%</span>
        </div>

        <div v-if="item.outlierCount > 0" class="col-span-2">
          <VcChip color="warning" size="sm" variant="outline-dark">
            {{ item.outlierCount }} {{ $t("pages.regulator.dashboard.outliers_label") }}
          </VcChip>
        </div>
      </div>
    </template>

    <template #desktop-body>
      <tr
        v-for="item in data"
        :key="item.id"
        :class="[
          'even:bg-neutral-50',
          { 'bg-warning-50 even:bg-warning-50': isHighlighted(item) },
        ]"
      >
        <td class="px-4 py-3 font-medium">
          {{ item.productCategory }}
        </td>
        <td class="px-4 py-3 text-right">
          {{ formatPrice(item.averagePrice) }}
        </td>
        <td class="px-4 py-3 text-right">
          {{ formatPrice(item.medianPrice) }}
        </td>
        <td class="px-4 py-3 text-right">
          {{ formatPrice(item.lowestPrice) }}
        </td>
        <td class="px-4 py-3 text-right">
          {{ formatPrice(item.highestPrice) }}
        </td>
        <td class="px-4 py-3 text-right">
          <span :class="varianceClass(item.priceVariance)">
            {{ item.priceVariance.toFixed(1) }}%
          </span>
        </td>
        <td class="px-4 py-3 text-center">
          <span v-if="item.outlierCount > 0" class="inline-flex items-center">
            <VcChip
              color="warning"
              size="sm"
              :variant="item.outlierCount >= 4 ? 'solid' : 'outline-dark'"
            >
              {{ item.outlierCount }}
            </VcChip>
          </span>
          <span v-else class="text-neutral-400">0</span>
        </td>
      </tr>
    </template>
  </VcTable>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { PriceBenchmarkType } from "../types";

interface IProps {
  data: PriceBenchmarkType[];
}

defineProps<IProps>();

const { t } = useI18n();

const columns = computed<VcTableColumnType[]>(() => [
  { id: "category", title: t("pages.regulator.dashboard.category_label") },
  { id: "avgPrice", title: t("pages.regulator.dashboard.avg_price_label"), align: "right" },
  { id: "median", title: t("pages.regulator.dashboard.median_label"), align: "right" },
  { id: "low", title: t("pages.regulator.dashboard.low_label"), align: "right" },
  { id: "high", title: t("pages.regulator.dashboard.high_label"), align: "right" },
  { id: "variance", title: t("pages.regulator.dashboard.variance_label"), align: "right" },
  { id: "outliers", title: t("pages.regulator.dashboard.outliers_label"), align: "center" },
]);

function formatPrice(value: number): string {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function varianceClass(variance: number): string {
  if (variance >= 50) {
    return "font-bold text-danger-600";
  }
  if (variance >= 40) {
    return "font-medium text-warning-600";
  }
  return "text-neutral-700";
}

function isHighlighted(item: PriceBenchmarkType): boolean {
  return item.priceVariance >= 50 || item.outlierCount >= 4;
}
</script>
