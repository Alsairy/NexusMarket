<template>
  <div class="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-additional-50 p-5 shadow-sm">
    <!-- Header -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex flex-col">
        <span class="text-base font-black text-neutral-950">{{ plan.orderNumber }}</span>
        <span class="text-xs text-neutral-400">{{ plan.orderId }}</span>
      </div>

      <VcBadge
        :color="statusColor"
        variant="solid-light"
        size="sm"
        rounded
      >
        {{ $t(`pages.account.payments.bnpl.status_${plan.status}`) }}
      </VcBadge>
    </div>

    <!-- Progress ring + details -->
    <div class="flex items-center gap-5">
      <!-- Progress ring -->
      <div class="relative flex size-20 shrink-0 items-center justify-center">
        <svg class="-rotate-90" viewBox="0 0 80 80" width="80" height="80">
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="currentColor"
            stroke-width="6"
            class="text-neutral-100"
          />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            :stroke="ringStrokeColor"
            stroke-width="6"
            stroke-linecap="round"
            :stroke-dasharray="ringCircumference"
            :stroke-dashoffset="ringOffset"
            class="transition-all duration-500"
          />
        </svg>
        <div class="absolute flex flex-col items-center">
          <span class="text-sm font-black text-neutral-950">{{ plan.paidInstallments }}</span>
          <span class="text-[10px] text-neutral-400">
            {{ $t("pages.account.payments.bnpl.of_label") }} {{ plan.installments }}
          </span>
        </div>
      </div>

      <!-- Details -->
      <div class="flex min-w-0 flex-1 flex-col gap-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-neutral-500">
            {{ $t("pages.account.payments.bnpl.total_amount_label") }}
          </span>
          <span class="text-sm font-black text-neutral-950">
            ${{ plan.totalAmount.toLocaleString() }}
          </span>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-neutral-500">
            {{ $t("pages.account.payments.bnpl.installment_label") }}
          </span>
          <span class="text-sm font-semibold text-neutral-700">
            ${{ plan.installmentAmount.toLocaleString() }}
          </span>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-neutral-500">
            {{ $t("pages.account.payments.bnpl.interest_rate_label") }}
          </span>
          <span class="text-sm text-neutral-600">{{ plan.interestRate }}%</span>
        </div>
      </div>
    </div>

    <!-- Remaining balance + Next payment -->
    <div class="flex flex-col gap-2 rounded-lg bg-neutral-50 p-3">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.payments.bnpl.remaining_balance_label") }}
        </span>
        <span class="text-sm font-black" :class="plan.remainingBalance > 0 ? 'text-warning-600' : 'text-success-600'">
          ${{ plan.remainingBalance.toLocaleString() }}
        </span>
      </div>

      <div v-if="plan.status === 'active'" class="flex items-center justify-between">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.payments.bnpl.next_payment_label") }}
        </span>
        <span class="text-sm font-semibold text-neutral-700">
          {{ $d(new Date(plan.nextPaymentDate), "short") }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { BnplPlanType } from "@/shared/account";

interface IProps {
  plan: BnplPlanType;
}

const props = defineProps<IProps>();

useI18n();

const ringRadius = 34;
const ringCircumference = 2 * Math.PI * ringRadius;

const ringOffset = computed(() => {
  if (props.plan.installments === 0) {
    return ringCircumference;
  }
  const progress = props.plan.paidInstallments / props.plan.installments;
  return ringCircumference - progress * ringCircumference;
});

const ringStrokeColor = computed(() => {
  if (props.plan.status === "completed") {
    return "var(--color-success-500)";
  }
  if (props.plan.status === "defaulted") {
    return "var(--color-danger-500)";
  }
  return "var(--color-primary-500)";
});

const statusColor = computed<VcBadgeColorType>(() => {
  const colorMap: Record<string, VcBadgeColorType> = {
    active: "primary",
    completed: "success",
    defaulted: "danger",
    cancelled: "neutral",
  };
  return colorMap[props.plan.status] ?? "neutral";
});
</script>
