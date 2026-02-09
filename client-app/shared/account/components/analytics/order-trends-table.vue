<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-neutral-200 text-xs font-bold uppercase text-neutral-500">
          <th class="px-4 py-3">{{ $t("pages.account.analytics.order_trends.period") }}</th>
          <th class="px-4 py-3 text-right">{{ $t("pages.account.analytics.order_trends.total") }}</th>
          <th class="px-4 py-3 text-right">{{ $t("pages.account.analytics.order_trends.completed") }}</th>
          <th class="px-4 py-3 text-right">{{ $t("pages.account.analytics.order_trends.cancelled") }}</th>
          <th class="px-4 py-3 text-right">{{ $t("pages.account.analytics.order_trends.pending") }}</th>
          <th class="hidden px-4 py-3 sm:table-cell">{{ $t("pages.account.analytics.order_trends.breakdown") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(trend, index) in trends"
          :key="index"
          class="border-b border-neutral-100"
        >
          <td class="px-4 py-3 font-semibold text-neutral-950">
            {{ trend.period }}
          </td>
          <td class="px-4 py-3 text-right font-semibold text-neutral-950">
            {{ trend.total }}
          </td>
          <td class="px-4 py-3 text-right text-success-600">
            {{ trend.completed }}
          </td>
          <td class="px-4 py-3 text-right text-danger-600">
            {{ trend.cancelled }}
          </td>
          <td class="px-4 py-3 text-right text-warning-600">
            {{ trend.pending }}
          </td>
          <td class="hidden px-4 py-3 sm:table-cell">
            <div class="flex h-4 w-full overflow-hidden rounded">
              <div
                class="h-full bg-success-500 transition-all"
                :style="{ width: `${(trend.completed / trend.total) * 100}%` }"
              ></div>
              <div
                class="h-full bg-danger-500 transition-all"
                :style="{ width: `${(trend.cancelled / trend.total) * 100}%` }"
              ></div>
              <div
                class="h-full bg-warning-500 transition-all"
                :style="{ width: `${(trend.pending / trend.total) * 100}%` }"
              ></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { OrderTrendType } from "@/shared/account";

interface IProps {
  trends: OrderTrendType[];
}

defineProps<IProps>();

useI18n();
</script>
