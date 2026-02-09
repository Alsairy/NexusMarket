<template>
  <div class="flex flex-col gap-3">
    <VcEmptyView
      v-if="!lineItems.length"
      :text="$t('pages.account.rfq.line_items.empty')"
      icon="outline-list"
    />

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-neutral-200 text-xs font-bold uppercase text-neutral-500">
            <th class="px-4 py-3">{{ $t("pages.account.rfq.line_items.col_product") }}</th>
            <th class="px-4 py-3">{{ $t("pages.account.rfq.line_items.col_description") }}</th>
            <th class="px-4 py-3 text-right">{{ $t("pages.account.rfq.line_items.col_quantity") }}</th>
            <th class="px-4 py-3">{{ $t("pages.account.rfq.line_items.col_unit") }}</th>
            <th class="px-4 py-3">{{ $t("pages.account.rfq.line_items.col_specifications") }}</th>
            <th class="px-4 py-3 text-right">{{ $t("pages.account.rfq.line_items.col_target_price") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in lineItems"
            :key="item.id"
            class="border-b border-neutral-100"
          >
            <td class="px-4 py-3 font-semibold text-neutral-950">
              {{ item.productName }}
            </td>
            <td class="max-w-xs truncate px-4 py-3 text-neutral-600">
              {{ item.description }}
            </td>
            <td class="px-4 py-3 text-right font-bold text-neutral-700">
              {{ item.quantity.toLocaleString() }}
            </td>
            <td class="px-4 py-3 text-neutral-500">
              {{ item.unit }}
            </td>
            <td class="max-w-xs truncate px-4 py-3 text-neutral-500">
              <template v-if="item.specifications">
                {{ item.specifications }}
              </template>
              <span v-else class="text-neutral-300">&mdash;</span>
            </td>
            <td class="px-4 py-3 text-right font-semibold text-neutral-950">
              <template v-if="item.targetPrice">
                ${{ item.targetPrice.toLocaleString() }}
              </template>
              <span v-else class="text-neutral-300">&mdash;</span>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="totalEstimate > 0">
          <tr class="border-t-2 border-neutral-200 bg-neutral-50">
            <td colspan="5" class="px-4 py-3 text-right text-xs font-bold uppercase text-neutral-500">
              {{ $t("pages.account.rfq.line_items.total_estimate") }}
            </td>
            <td class="px-4 py-3 text-right text-base font-black text-neutral-950">
              ${{ totalEstimate.toLocaleString() }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { RfqLineItemType } from "@/shared/account";

interface IProps {
  lineItems: RfqLineItemType[];
}

const props = defineProps<IProps>();

useI18n();

const totalEstimate = computed(() =>
  props.lineItems.reduce((sum, item) => sum + (item.targetPrice ?? 0) * item.quantity, 0),
);
</script>
