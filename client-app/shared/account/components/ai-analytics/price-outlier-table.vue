<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-neutral-200 text-xs font-bold uppercase text-neutral-500">
          <th class="px-4 py-3">{{ $t("pages.account.ai_insights.outlier_table.product") }}</th>
          <th class="px-4 py-3 text-right">{{ $t("pages.account.ai_insights.outlier_table.current_price") }}</th>
          <th class="px-4 py-3 text-right">{{ $t("pages.account.ai_insights.outlier_table.market_avg") }}</th>
          <th class="px-4 py-3 text-right">{{ $t("pages.account.ai_insights.outlier_table.deviation") }}</th>
          <th class="px-4 py-3 text-center">{{ $t("pages.account.ai_insights.outlier_table.direction") }}</th>
          <th class="px-4 py-3">{{ $t("pages.account.ai_insights.outlier_table.supplier") }}</th>
          <th class="px-4 py-3 text-center">{{ $t("pages.account.ai_insights.outlier_table.severity") }}</th>
          <th class="hidden px-4 py-3 lg:table-cell">{{ $t("pages.account.ai_insights.outlier_table.recommendation") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="outlier in outliers"
          :key="outlier.id"
          class="border-b border-neutral-100 transition-colors"
          :class="rowClass(outlier.severity)"
        >
          <td class="px-4 py-3">
            <div class="flex flex-col">
              <span class="font-semibold text-neutral-950">{{ outlier.productName }}</span>
              <span class="text-xs text-neutral-400">{{ outlier.productId }}</span>
            </div>
          </td>
          <td class="px-4 py-3 text-right font-semibold text-neutral-950">
            ${{ outlier.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
          </td>
          <td class="px-4 py-3 text-right text-neutral-600">
            ${{ outlier.marketAverage.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
          </td>
          <td class="px-4 py-3 text-right font-semibold" :class="deviationClass(outlier.direction)">
            {{ outlier.direction === "above" ? "+" : "" }}{{ outlier.deviation.toFixed(1) }}%
          </td>
          <td class="px-4 py-3 text-center">
            <span v-if="outlier.direction === 'above'" class="text-danger-500">&#9650;</span>
            <span v-else class="text-success-500">&#9660;</span>
          </td>
          <td class="px-4 py-3 text-neutral-700">
            {{ outlier.supplierName }}
          </td>
          <td class="px-4 py-3 text-center">
            <SeverityBadge :severity="outlier.severity" />
          </td>
          <td class="hidden px-4 py-3 text-xs text-neutral-500 lg:table-cell">
            {{ $t(outlier.recommendation) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { InsightSeverityType, PriceOutlierType } from "@/shared/account";
import SeverityBadge from "./severity-badge.vue";

interface IProps {
  outliers: PriceOutlierType[];
}

defineProps<IProps>();

useI18n();

function rowClass(severity: InsightSeverityType): string {
  const classMap: Record<InsightSeverityType, string> = {
    critical: "bg-danger-50/40",
    warning: "bg-warning-50/40",
    info: "",
  };
  return classMap[severity];
}

function deviationClass(direction: "above" | "below"): string {
  return direction === "above" ? "text-danger-600" : "text-success-600";
}
</script>
