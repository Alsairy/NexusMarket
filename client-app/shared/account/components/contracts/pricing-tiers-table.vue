<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-neutral-200 text-left">
          <th class="px-4 py-2 text-xs font-bold text-neutral-500">
            {{ $t("pages.account.contracts.tier_qty_range_label") }}
          </th>
          <th class="px-4 py-2 text-xs font-bold text-neutral-500">
            {{ $t("pages.account.contracts.tier_unit_price_label") }}
          </th>
          <th class="px-4 py-2 text-xs font-bold text-neutral-500">
            {{ $t("pages.account.contracts.tier_discount_label") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="tier in tiers"
          :key="tier.id"
          class="border-b border-neutral-100 transition-colors"
          :class="isCurrentTier(tier) ? 'bg-primary-50 font-bold' : 'even:bg-neutral-50'"
        >
          <td class="px-4 py-2.5">
            <div class="flex items-center gap-2">
              <span
                v-if="isCurrentTier(tier)"
                class="size-2 rounded-full bg-primary-500"
              />
              {{ formatRange(tier.minQuantity, tier.maxQuantity) }}
            </div>
          </td>
          <td class="px-4 py-2.5">
            ${{ tier.unitPrice.toFixed(2) }}
          </td>
          <td class="px-4 py-2.5">
            <span v-if="tier.discount > 0" class="text-success-600">
              -{{ tier.discount.toFixed(1) }}%
            </span>
            <span v-else class="text-neutral-400">
              {{ $t("pages.account.contracts.tier_no_discount") }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { PricingTierType } from "@/shared/account";

interface IProps {
  tiers: PricingTierType[];
  currentPrice?: number;
}

const props = defineProps<IProps>();

function isCurrentTier(tier: PricingTierType): boolean {
  if (!props.currentPrice) {
    return false;
  }
  return tier.unitPrice === props.currentPrice;
}

function formatRange(min: number, max: number): string {
  if (max >= 99999) {
    return `${min.toLocaleString()}+`;
  }
  return `${min.toLocaleString()} - ${max.toLocaleString()}`;
}
</script>
