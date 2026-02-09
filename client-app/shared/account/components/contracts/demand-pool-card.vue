<template>
  <div class="flex flex-col gap-4 rounded-lg border border-neutral-200 p-5 shadow-sm">
    <!-- Header -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex flex-col gap-1">
        <span class="text-base font-black text-neutral-800">{{ pool.productCategory }}</span>
        <span class="text-xs text-neutral-400">
          {{ pool.participatingBuyers }} {{ $t("pages.account.contracts.demand_pool_buyers") }}
        </span>
      </div>
      <VcBadge color="info" variant="solid-light" size="sm" rounded>
        {{ $t("pages.account.contracts.demand_pool_active") }}
      </VcBadge>
    </div>

    <!-- Demand & Pricing Info -->
    <div class="grid grid-cols-2 gap-3">
      <div class="flex flex-col gap-0.5 rounded-lg bg-neutral-50 p-3">
        <span class="text-xs text-neutral-500">
          {{ $t("pages.account.contracts.demand_pool_total_demand") }}
        </span>
        <span class="text-lg font-black text-neutral-800">
          {{ pool.totalDemand.toLocaleString() }}
        </span>
      </div>

      <div class="flex flex-col gap-0.5 rounded-lg bg-success-50 p-3">
        <span class="text-xs text-neutral-500">
          {{ $t("pages.account.contracts.demand_pool_current_price") }}
        </span>
        <span class="text-lg font-black text-success-700">
          ${{ pool.currentBestPrice.toFixed(2) }}
        </span>
      </div>
    </div>

    <!-- Next Tier Info -->
    <div class="flex items-center justify-between rounded-lg border border-dashed border-primary-300 bg-primary-50 px-4 py-3">
      <div class="flex flex-col gap-0.5">
        <span class="text-xs font-bold text-primary-700">
          {{ $t("pages.account.contracts.demand_pool_next_tier") }}
        </span>
        <span class="text-xs text-primary-600">
          {{ pool.nextTierQuantity.toLocaleString() }} {{ $t("pages.account.contracts.demand_pool_units_needed") }}
        </span>
      </div>
      <div class="flex flex-col items-end gap-0.5">
        <span class="text-sm font-black text-primary-700">
          ${{ pool.nextTierPrice.toFixed(2) }}
        </span>
        <span class="text-xs text-primary-500">
          {{ $t("pages.account.contracts.demand_pool_save") }}
          {{ savingsPercent }}%
        </span>
      </div>
    </div>

    <!-- Progress to next tier -->
    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-between text-xs text-neutral-500">
        <span>{{ $t("pages.account.contracts.demand_pool_progress") }}</span>
        <span>{{ progressPercent }}%</span>
      </div>
      <div class="h-2 overflow-hidden rounded-full bg-neutral-100">
        <div
          class="h-full rounded-full bg-primary-500 transition-all"
          :style="{ width: `${progressPercent}%` }"
        />
      </div>
    </div>

    <!-- Countdown Timer -->
    <div class="flex items-center justify-between border-t border-neutral-100 pt-3">
      <div class="flex items-center gap-2">
        <VcIcon name="clock" size="xs" class="text-neutral-400" />
        <span class="text-xs text-neutral-500">
          {{ $t("pages.account.contracts.demand_pool_expires") }}:
          <span class="font-bold" :class="daysRemaining <= 7 ? 'text-danger-600' : 'text-neutral-700'">
            {{ daysRemaining > 0 ? daysRemaining : 0 }} {{ $t("pages.account.contracts.demand_pool_days") }}
          </span>
        </span>
      </div>

      <VcButton size="xs" @click="$emit('join', pool.id)">
        {{ $t("pages.account.contracts.demand_pool_join_button") }}
      </VcButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { DemandPoolType } from "@/shared/account";

interface IProps {
  pool: DemandPoolType;
}

const props = defineProps<IProps>();

defineEmits<{
  (event: "join", poolId: string): void;
}>();

const daysRemaining = computed(() => {
  const now = new Date();
  const expires = new Date(props.pool.expiresAt);
  const diff = expires.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

const progressPercent = computed(() => {
  if (props.pool.nextTierQuantity === 0) {
    return 100;
  }
  return Math.min(Math.round((props.pool.totalDemand / props.pool.nextTierQuantity) * 100), 100);
});

const savingsPercent = computed(() => {
  if (props.pool.currentBestPrice === 0) {
    return 0;
  }
  return ((props.pool.currentBestPrice - props.pool.nextTierPrice) / props.pool.currentBestPrice * 100).toFixed(1);
});
</script>
