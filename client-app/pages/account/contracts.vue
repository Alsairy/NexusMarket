<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <VcTypography tag="h1">
        {{ $t("pages.account.contracts.title") }}
      </VcTypography>

      <VcButton prepend-icon="plus" size="sm" variant="outline" disabled>
        {{ $t("pages.account.contracts.new_contract_button") }}
      </VcButton>
    </div>

    <!-- KPI Row -->
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <!-- Active Contracts -->
      <VcWidget size="sm">
        <div class="flex flex-col items-center gap-1 py-2">
          <span class="text-3xl font-black text-success-600">
            {{ activeContracts.length }}
          </span>
          <span class="text-xs font-bold text-neutral-500">
            {{ $t("pages.account.contracts.kpi_active_contracts") }}
          </span>
        </div>
      </VcWidget>

      <!-- Total Committed Value -->
      <VcWidget size="sm">
        <div class="flex flex-col items-center gap-1 py-2">
          <span class="text-3xl font-black text-primary-600">
            ${{ formattedTotalValue }}
          </span>
          <span class="text-xs font-bold text-neutral-500">
            {{ $t("pages.account.contracts.kpi_total_committed_value") }}
          </span>
        </div>
      </VcWidget>

      <!-- Avg Fulfillment Rate -->
      <VcWidget size="sm">
        <div class="flex flex-col items-center gap-1 py-2">
          <span
            class="text-3xl font-black"
            :class="avgFulfillmentRate >= 80 ? 'text-success-600' : avgFulfillmentRate >= 50 ? 'text-warning-600' : 'text-danger-600'"
          >
            {{ avgFulfillmentRate }}%
          </span>
          <span class="text-xs font-bold text-neutral-500">
            {{ $t("pages.account.contracts.kpi_avg_fulfillment") }}
          </span>
        </div>
      </VcWidget>

      <!-- Expiring Soon -->
      <VcWidget size="sm">
        <div class="flex flex-col items-center gap-1 py-2">
          <span
            class="text-3xl font-black"
            :class="expiringSoonCount > 0 ? 'text-warning-600' : 'text-neutral-400'"
          >
            {{ expiringSoonCount }}
          </span>
          <span class="text-xs font-bold text-neutral-500">
            {{ $t("pages.account.contracts.kpi_expiring_soon") }}
          </span>
        </div>
      </VcWidget>
    </div>

    <!-- Status Filter Chips -->
    <div class="flex flex-wrap gap-2">
      <VcBadge
        v-for="filterOption in statusFilterOptions"
        :key="filterOption.value"
        :color="activeFilter === filterOption.value ? 'primary' : 'neutral'"
        :variant="activeFilter === filterOption.value ? 'solid' : 'outline'"
        size="md"
        rounded
        class="cursor-pointer select-none"
        @click="activeFilter = filterOption.value"
      >
        {{ $t(filterOption.label) }} ({{ filterOption.count }})
      </VcBadge>
    </div>

    <!-- Contract List Table -->
    <ContractListTable
      :contracts="filteredContracts"
      :loading="loading"
      @view="navigateToDetail"
    />

    <!-- Demand Pools Section -->
    <div class="flex flex-col gap-4">
      <VcTypography tag="h2">
        {{ $t("pages.account.contracts.demand_pools_title") }}
      </VcTypography>

      <div v-if="loading" class="flex items-center justify-center py-10">
        <VcLoaderOverlay :visible="true" fixed-spinner />
      </div>

      <VcEmptyView
        v-else-if="!demandPools.length"
        :text="$t('pages.account.contracts.no_demand_pools')"
        icon="outline-list"
      />

      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DemandPoolCard
          v-for="pool in demandPools"
          :key="pool.id"
          :pool="pool"
          @join="handleJoinPool"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { usePageHead } from "@/core/composables";
import { useContracts } from "@/shared/account/composables/useContracts";
import { ContractListTable, DemandPoolCard } from "@/shared/account/components/contracts";
import type { ContractStatusType, FrameworkContractType } from "@/shared/account";

const { t } = useI18n();
const router = useRouter();

usePageHead({
  title: computed(() => t("pages.account.contracts.meta.title")),
});

const {
  loading,
  contracts,
  demandPools,
  activeContracts,
  totalCommittedValue,
  avgFulfillmentRate,
  expiringSoonCount,
  fetchContracts,
  fetchDemandPools,
  joinDemandPool,
} = useContracts();

const activeFilter = ref<ContractStatusType | "all">("all");

onMounted(async () => {
  await Promise.all([fetchContracts(), fetchDemandPools()]);
});

const formattedTotalValue = computed(() => {
  const value = totalCommittedValue.value;
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toLocaleString();
});

const filteredContracts = computed(() => {
  if (activeFilter.value === "all") {
    return contracts.value;
  }
  return contracts.value.filter((c) => c.status === activeFilter.value);
});

const statusFilterOptions = computed(() => {
  const statuses: Array<{ value: ContractStatusType | "all"; label: string }> = [
    { value: "all", label: "pages.account.contracts.filter_all" },
    { value: "active", label: "pages.account.contracts.filter_active" },
    { value: "draft", label: "pages.account.contracts.filter_draft" },
    { value: "suspended", label: "pages.account.contracts.filter_suspended" },
    { value: "expired", label: "pages.account.contracts.filter_expired" },
    { value: "terminated", label: "pages.account.contracts.filter_terminated" },
  ];

  return statuses.map((s) => ({
    ...s,
    count: s.value === "all"
      ? contracts.value.length
      : contracts.value.filter((c) => c.status === s.value).length,
  }));
});

function navigateToDetail(contract: FrameworkContractType): void {
  void router.push({ name: "ContractDetail", params: { contractId: contract.id } });
}

async function handleJoinPool(poolId: string): Promise<void> {
  await joinDemandPool(poolId);
}
</script>
