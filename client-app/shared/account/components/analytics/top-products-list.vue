<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-neutral-200 text-xs font-bold uppercase text-neutral-500">
          <th class="px-4 py-3 text-center">#</th>
          <th class="px-4 py-3">{{ $t("pages.account.analytics.top_products.product") }}</th>
          <th class="px-4 py-3">{{ $t("pages.account.analytics.top_products.sku") }}</th>
          <th class="px-4 py-3 text-right">{{ $t("pages.account.analytics.top_products.qty_sold") }}</th>
          <th class="px-4 py-3 text-right">{{ $t("pages.account.analytics.top_products.revenue") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(product, index) in products"
          :key="product.id"
          class="border-b border-neutral-100 transition-colors"
          :class="{ 'bg-primary-50/50': index < 3 }"
        >
          <td class="px-4 py-3 text-center">
            <span
              class="inline-flex size-6 items-center justify-center rounded-full text-xs font-bold"
              :class="index < 3 ? 'bg-primary-500 text-additional-50' : 'bg-neutral-100 text-neutral-600'"
            >
              {{ index + 1 }}
            </span>
          </td>
          <td class="px-4 py-3 font-semibold text-neutral-950">
            {{ product.name }}
          </td>
          <td class="px-4 py-3 text-neutral-500">
            {{ product.sku }}
          </td>
          <td class="px-4 py-3 text-right text-neutral-700">
            {{ product.totalSold.toLocaleString() }}
          </td>
          <td class="px-4 py-3 text-right font-semibold text-neutral-950">
            ${{ product.revenue.toLocaleString() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { TopProductType } from "@/shared/account";

interface IProps {
  products: TopProductType[];
}

defineProps<IProps>();

useI18n();
</script>
