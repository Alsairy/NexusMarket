<template>
  <div class="flex flex-col gap-6">
    <!-- Back Navigation -->
    <div class="flex items-center gap-2">
      <VcButton size="xs" variant="no-background" prepend-icon="arrow-left" @click="goBack">
        {{ $t("pages.account.contracts.back_to_contracts") }}
      </VcButton>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !contract" class="flex items-center justify-center py-20">
      <VcLoaderOverlay :visible="true" fixed-spinner />
    </div>

    <!-- Not Found State -->
    <VcEmptyView
      v-else-if="!contract"
      :text="$t('pages.account.contracts.contract_not_found')"
      icon="outline-list"
    />

    <!-- Contract Content -->
    <template v-else>
      <!-- Contract Header -->
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3">
            <VcTypography tag="h1">{{ contract.title }}</VcTypography>
            <ContractStatusBadge :status="contract.status" />
          </div>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
            <span>{{ contract.contractNumber }}</span>
            <span class="text-neutral-300">|</span>
            <span>{{ contract.supplierName }}</span>
            <span class="text-neutral-300">|</span>
            <span>
              {{ $d(new Date(contract.startDate), "short") }} - {{ $d(new Date(contract.endDate), "short") }}
            </span>
          </div>
        </div>

        <div v-if="contract.autoRenewal" class="flex items-center gap-2">
          <VcBadge color="info" variant="outline" size="sm" rounded>
            {{ $t("pages.account.contracts.auto_renewal_badge") }}
          </VcBadge>
        </div>
      </div>

      <!-- Contract Summary Card -->
      <ContractSummaryCard :contract="contract" />

      <!-- Tabs -->
      <div class="flex flex-col gap-4">
        <div class="flex border-b border-neutral-200">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="relative px-4 py-3 text-sm font-bold transition-colors"
            :class="activeTab === tab.id
              ? 'text-primary-600'
              : 'text-neutral-500 hover:text-neutral-700'"
            @click="activeTab = tab.id"
          >
            {{ $t(tab.label) }}
            <span
              v-if="activeTab === tab.id"
              class="absolute inset-x-0 bottom-0 h-0.5 bg-primary-600"
            />
          </button>
        </div>

        <!-- Tab: Line Items -->
        <div v-if="activeTab === 'lineItems'" class="flex flex-col gap-4">
          <VcEmptyView
            v-if="!contract.lineItems.length"
            :text="$t('pages.account.contracts.no_line_items')"
            icon="outline-list"
          />

          <div v-else class="flex flex-col gap-4">
            <div
              v-for="item in contract.lineItems"
              :key="item.id"
              class="overflow-hidden rounded-lg border border-neutral-200"
            >
              <!-- Line Item Header -->
              <div
                class="flex cursor-pointer items-center justify-between bg-neutral-50 px-5 py-4"
                @click="toggleExpanded(item.id)"
              >
                <div class="flex flex-col gap-0.5">
                  <span class="font-black text-neutral-800">{{ item.productName }}</span>
                  <span class="text-xs text-neutral-400">
                    {{ $t("pages.account.contracts.sku_label") }}: {{ item.sku }}
                    &middot;
                    {{ $t("pages.account.contracts.unit_label") }}: {{ item.unit }}
                  </span>
                </div>

                <div class="flex items-center gap-4">
                  <div class="hidden flex-col items-end sm:flex">
                    <span class="text-sm font-bold text-neutral-700">
                      ${{ item.currentPrice.toFixed(2) }}/{{ item.unit }}
                    </span>
                    <span class="text-xs text-neutral-400">
                      {{ item.fulfilledQuantity.toLocaleString() }}/{{ item.committedQuantity.toLocaleString() }}
                      {{ $t("pages.account.contracts.fulfilled_label") }}
                    </span>
                  </div>

                  <VcIcon
                    name="chevron-down"
                    size="xs"
                    class="text-neutral-400 transition-transform"
                    :class="expandedItems.has(item.id) ? 'rotate-180' : ''"
                  />
                </div>
              </div>

              <!-- Fulfillment Progress -->
              <div class="border-t border-neutral-100 px-5 py-3">
                <div class="flex items-center gap-3">
                  <div class="h-2 grow overflow-hidden rounded-full bg-neutral-100">
                    <div
                      class="h-full rounded-full bg-primary-500 transition-all"
                      :style="{ width: `${getFulfillmentPercent(item)}%` }"
                    />
                  </div>
                  <span class="shrink-0 text-xs font-bold text-neutral-600">
                    {{ getFulfillmentPercent(item) }}%
                  </span>
                </div>
              </div>

              <!-- Expanded: Pricing Tiers -->
              <div v-if="expandedItems.has(item.id)" class="border-t border-neutral-200 bg-white">
                <div class="px-5 py-3">
                  <span class="mb-2 block text-xs font-black text-neutral-600">
                    {{ $t("pages.account.contracts.pricing_tiers_label") }}
                  </span>
                  <PricingTiersTable :tiers="item.pricingTiers" :current-price="item.currentPrice" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab: Call-Off Orders -->
        <div v-if="activeTab === 'callOffOrders'" class="flex flex-col gap-4">
          <div class="flex justify-end">
            <VcButton
              size="sm"
              variant="outline"
              prepend-icon="plus"
              :disabled="contract.status !== 'active'"
              @click="handleCreateOrder"
            >
              {{ $t("pages.account.contracts.create_call_off_order_button") }}
            </VcButton>
          </div>

          <CallOffOrdersTable :orders="contract.callOffOrders" :loading="loading" />
        </div>

        <!-- Tab: Performance -->
        <div v-if="activeTab === 'performance'" class="flex flex-col gap-4">
          <VcEmptyView
            v-if="!contract.performanceMetrics.length"
            :text="$t('pages.account.contracts.no_performance_data')"
            icon="outline-list"
          />

          <PerformanceTracker v-else :metrics="contract.performanceMetrics" />

          <!-- Penalty Clause -->
          <div v-if="contract.penaltyClause" class="rounded-lg border border-warning-200 bg-warning-50 p-4">
            <span class="mb-1 block text-xs font-black text-warning-700">
              {{ $t("pages.account.contracts.penalty_clause_label") }}
            </span>
            <p class="text-sm text-warning-600">{{ contract.penaltyClause }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { usePageHead } from "@/core/composables";
import { useContracts } from "@/shared/account/composables/useContracts";
import {
  CallOffOrdersTable,
  ContractStatusBadge,
  ContractSummaryCard,
  PerformanceTracker,
  PricingTiersTable,
} from "@/shared/account/components/contracts";
import type { ContractLineItemType } from "@/shared/account";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

usePageHead({
  title: computed(() => contract.value?.title ?? t("pages.account.contracts.detail_meta_title")),
});

const { loading, contracts, fetchContracts, createCallOffOrder } = useContracts();

const activeTab = ref<"lineItems" | "callOffOrders" | "performance">("lineItems");
const expandedItems = reactive(new Set<string>());

const tabs = [
  { id: "lineItems" as const, label: "pages.account.contracts.tab_line_items" },
  { id: "callOffOrders" as const, label: "pages.account.contracts.tab_call_off_orders" },
  { id: "performance" as const, label: "pages.account.contracts.tab_performance" },
];

const contract = computed(() => {
  const contractId = route.params.contractId as string;
  return contracts.value.find((c) => c.id === contractId) ?? null;
});

onMounted(async () => {
  if (!contracts.value.length) {
    await fetchContracts();
  }
});

function goBack(): void {
  void router.push({ name: "Contracts" });
}

function toggleExpanded(itemId: string): void {
  if (expandedItems.has(itemId)) {
    expandedItems.delete(itemId);
  } else {
    expandedItems.add(itemId);
  }
}

function getFulfillmentPercent(item: ContractLineItemType): number {
  if (item.committedQuantity === 0) {
    return 0;
  }
  return Math.round((item.fulfilledQuantity / item.committedQuantity) * 100);
}

async function handleCreateOrder(): Promise<void> {
  if (!contract.value) {
    return;
  }

  // Placeholder: create a sample call-off order with first line item
  const firstItem = contract.value.lineItems[0];
  if (!firstItem) {
    return;
  }

  await createCallOffOrder(contract.value.id, [
    {
      productName: firstItem.productName,
      quantity: 100,
      unitPrice: firstItem.currentPrice,
      total: 100 * firstItem.currentPrice,
    },
  ]);
}
</script>
