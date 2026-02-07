<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <VcTypography tag="h1">
      {{ $t("pages.account.payments.title") }}
    </VcTypography>

    <!-- Overview KPI Cards -->
    <PaymentOverviewCards :overview="overview" />

    <!-- Tabs -->
    <div class="flex gap-1 border-b border-neutral-200">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="relative px-4 py-3 text-sm font-bold transition-colors"
        :class="[
          activeTab === tab.id
            ? 'text-primary-600'
            : 'text-neutral-500 hover:text-neutral-700',
        ]"
        @click="activeTab = tab.id"
      >
        {{ $t(tab.label) }}
        <div
          v-if="activeTab === tab.id"
          class="absolute bottom-0 left-0 h-0.5 w-full bg-primary-600"
        ></div>
      </button>
    </div>

    <!-- Escrow Tab -->
    <VcWidget
      v-if="activeTab === 'escrow'"
      :title="$t('pages.account.payments.escrow.widget_title')"
      size="lg"
    >
      <template #default-container>
        <EscrowTransactionsTable
          :transactions="escrowTransactions"
          :loading="loading"
          @release="handleReleaseEscrow"
          @dispute="handleDisputeEscrow"
        />
      </template>
    </VcWidget>

    <!-- Milestones Tab -->
    <div v-if="activeTab === 'milestones'" class="flex flex-col gap-4">
      <VcWidget :title="$t('pages.account.payments.milestones.widget_title')" size="lg">
        <VcEmptyView
          v-if="!loading && !milestonePlans.length"
          :text="$t('pages.account.payments.milestones.no_plans')"
          icon="outline-list"
        />

        <div v-else class="grid gap-4 lg:grid-cols-2">
          <MilestonePlanCard
            v-for="plan in milestonePlans"
            :key="plan.id"
            :plan="plan"
            @approve-milestone="handleApproveMilestone"
          />
        </div>
      </VcWidget>
    </div>

    <!-- Factoring Tab -->
    <VcWidget
      v-if="activeTab === 'factoring'"
      :title="$t('pages.account.payments.factoring.widget_title')"
      size="lg"
    >
      <template #default-container>
        <FactoringTable
          :requests="factoringRequests"
          :loading="loading"
        />
      </template>
    </VcWidget>

    <!-- BNPL Tab -->
    <div v-if="activeTab === 'bnpl'" class="flex flex-col gap-4">
      <VcWidget :title="$t('pages.account.payments.bnpl.widget_title')" size="lg">
        <VcEmptyView
          v-if="!loading && !bnplPlans.length"
          :text="$t('pages.account.payments.bnpl.no_plans')"
          icon="outline-list"
        />

        <div v-else class="grid gap-4 lg:grid-cols-2">
          <BnplPlanCard
            v-for="plan in bnplPlans"
            :key="plan.id"
            :plan="plan"
          />
        </div>
      </VcWidget>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { usePageHead } from "@/core/composables";
import {
  usePayments,
  PaymentOverviewCards,
  EscrowTransactionsTable,
  MilestonePlanCard,
  FactoringTable,
  BnplPlanCard,
} from "@/shared/account";

const { t } = useI18n();

usePageHead({
  title: computed(() => t("pages.account.payments.meta.title")),
});

const {
  loading,
  escrowTransactions,
  milestonePlans,
  factoringRequests,
  bnplPlans,
  overview,
  releaseEscrow,
  approveMilestone,
  disputeEscrow,
} = usePayments();

type TabId = "escrow" | "milestones" | "factoring" | "bnpl";

const activeTab = ref<TabId>("escrow");

const tabs: { id: TabId; label: string }[] = [
  { id: "escrow", label: "pages.account.payments.tabs.escrow" },
  { id: "milestones", label: "pages.account.payments.tabs.milestones" },
  { id: "factoring", label: "pages.account.payments.tabs.factoring" },
  { id: "bnpl", label: "pages.account.payments.tabs.bnpl" },
];

async function handleReleaseEscrow(id: string): Promise<void> {
  await releaseEscrow(id);
}

async function handleDisputeEscrow(id: string): Promise<void> {
  await disputeEscrow(id, "pages.account.payments.escrow.dispute_default_reason");
}

async function handleApproveMilestone(planId: string, milestoneId: string): Promise<void> {
  await approveMilestone(planId, milestoneId);
}
</script>
