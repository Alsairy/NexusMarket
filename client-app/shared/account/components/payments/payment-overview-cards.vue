<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
    <!-- Total in Escrow -->
    <div class="flex items-center gap-4 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
      <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-info-100">
        <VcIcon name="lock" class="size-5 fill-info-600" />
      </div>
      <div class="flex min-w-0 flex-col">
        <span class="truncate text-xs font-medium text-neutral-500">
          {{ $t("pages.account.payments.overview.total_escrow") }}
        </span>
        <span class="text-2xl font-black text-neutral-950">
          ${{ overview.totalEscrow.toLocaleString() }}
        </span>
      </div>
    </div>

    <!-- Milestone Payments -->
    <div class="flex items-center gap-4 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
      <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-100">
        <VcIcon name="clipboard-list" class="size-5 fill-primary-600" />
      </div>
      <div class="flex min-w-0 flex-col">
        <span class="truncate text-xs font-medium text-neutral-500">
          {{ $t("pages.account.payments.overview.total_milestone") }}
        </span>
        <span class="text-2xl font-black text-neutral-950">
          ${{ overview.totalMilestone.toLocaleString() }}
        </span>
      </div>
    </div>

    <!-- Invoice Factoring -->
    <div class="flex items-center gap-4 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
      <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-success-100">
        <VcIcon name="document" class="size-5 fill-success-600" />
      </div>
      <div class="flex min-w-0 flex-col">
        <span class="truncate text-xs font-medium text-neutral-500">
          {{ $t("pages.account.payments.overview.total_factored") }}
        </span>
        <span class="text-2xl font-black text-neutral-950">
          ${{ overview.totalFactored.toLocaleString() }}
        </span>
      </div>
    </div>

    <!-- BNPL Plans -->
    <div class="flex items-center gap-4 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
      <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-100">
        <VcIcon name="calendar" class="size-5 fill-accent-600" />
      </div>
      <div class="flex min-w-0 flex-col">
        <span class="truncate text-xs font-medium text-neutral-500">
          {{ $t("pages.account.payments.overview.total_bnpl") }}
        </span>
        <span class="text-2xl font-black text-neutral-950">
          ${{ overview.totalBnpl.toLocaleString() }}
        </span>
      </div>
    </div>

    <!-- Pending Releases -->
    <div class="flex items-center gap-4 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
      <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-warning-100">
        <VcIcon name="clock" class="size-5 fill-warning-600" />
      </div>
      <div class="flex min-w-0 flex-col">
        <span class="truncate text-xs font-medium text-neutral-500">
          {{ $t("pages.account.payments.overview.pending_releases") }}
        </span>
        <span class="text-2xl font-black text-warning-600">
          {{ overview.pendingReleases }}
        </span>
      </div>
    </div>

    <!-- Disputed Transactions -->
    <div class="flex items-center gap-4 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
      <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-danger-100">
        <VcIcon name="warning" class="size-5 fill-danger-600" />
      </div>
      <div class="flex min-w-0 flex-col">
        <span class="truncate text-xs font-medium text-neutral-500">
          {{ $t("pages.account.payments.overview.disputed_transactions") }}
        </span>
        <span class="text-2xl font-black" :class="overview.disputedTransactions > 0 ? 'text-danger-600' : 'text-neutral-950'">
          {{ overview.disputedTransactions }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { PaymentOverviewType } from "@/shared/account";

interface IProps {
  overview: PaymentOverviewType;
}

defineProps<IProps>();

useI18n();
</script>
