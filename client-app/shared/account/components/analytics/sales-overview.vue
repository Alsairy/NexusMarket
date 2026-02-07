<template>
  <div class="flex flex-col gap-4">
    <!-- Summary -->
    <div class="flex gap-6">
      <div class="flex flex-col">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.analytics.sales_overview.total_revenue") }}
        </span>
        <span class="text-xl font-black text-neutral-950">${{ totalRevenue.toLocaleString() }}</span>
      </div>

      <div class="flex flex-col">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.analytics.sales_overview.total_orders") }}
        </span>
        <span class="text-xl font-black text-neutral-950">{{ totalOrders.toLocaleString() }}</span>
      </div>

      <div class="flex flex-col">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.analytics.sales_overview.avg_daily_revenue") }}
        </span>
        <span class="text-xl font-black text-neutral-950">${{ avgDailyRevenue.toLocaleString() }}</span>
      </div>
    </div>

    <!-- Bar chart -->
    <div class="flex flex-col gap-1.5 overflow-x-auto">
      <div
        v-for="(point, index) in visibleData"
        :key="index"
        class="flex items-center gap-2"
      >
        <span class="w-20 shrink-0 text-right text-xs text-neutral-500">
          {{ formatDate(point.date) }}
        </span>

        <div class="relative h-5 flex-1 rounded bg-neutral-100">
          <div
            class="absolute inset-y-0 left-0 rounded bg-primary-500 transition-all"
            :style="{ width: barWidth(point.revenue) }"
          ></div>
        </div>

        <span class="w-16 shrink-0 text-right text-xs font-semibold text-neutral-700">
          ${{ (point.revenue / 1000).toFixed(1) }}k
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { SalesDataPointType } from "@/shared/account";

interface IProps {
  data: SalesDataPointType[];
}

const props = defineProps<IProps>();

useI18n();

const visibleData = computed(() => {
  // Show at most 15 data points to keep the chart readable
  if (props.data.length <= 15) {
    return props.data;
  }
  const step = Math.ceil(props.data.length / 15);
  return props.data.filter((_, i) => i % step === 0);
});

const totalRevenue = computed(() => props.data.reduce((sum, d) => sum + d.revenue, 0));
const totalOrders = computed(() => props.data.reduce((sum, d) => sum + d.orders, 0));
const avgDailyRevenue = computed(() => {
  if (props.data.length === 0) {
    return 0;
  }
  return Math.round(totalRevenue.value / props.data.length);
});

const maxRevenue = computed(() => Math.max(...props.data.map((d) => d.revenue), 1));

function barWidth(revenue: number): string {
  return `${(revenue / maxRevenue.value) * 100}%`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
</script>
