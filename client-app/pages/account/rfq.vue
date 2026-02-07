<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <VcTypography tag="h1">
        {{ $t("pages.account.rfq.title") }}
      </VcTypography>

      <VcButton @click="handleCreateRfq">
        {{ $t("pages.account.rfq.create_button") }}
      </VcButton>
    </div>

    <!-- KPI row -->
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div class="flex flex-col rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.rfq.kpi.total_rfqs") }}
        </span>
        <span class="text-2xl font-black text-neutral-950">
          {{ totalRfqs }}
        </span>
      </div>

      <div class="flex flex-col rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.rfq.kpi.open_rfqs") }}
        </span>
        <span class="text-2xl font-black text-info-600">
          {{ openRfqs }}
        </span>
      </div>

      <div class="flex flex-col rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.rfq.kpi.avg_bids") }}
        </span>
        <span class="text-2xl font-black text-neutral-950">
          {{ avgBidsPerRfq }}
        </span>
      </div>

      <div class="flex flex-col rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.rfq.kpi.total_awarded") }}
        </span>
        <span class="text-2xl font-black text-success-600">
          ${{ totalAwardedValue.toLocaleString() }}
        </span>
      </div>
    </div>

    <!-- Status filter chips -->
    <div class="flex flex-wrap gap-2">
      <VcChip
        v-for="filter in statusFilters"
        :key="filter.value"
        :color="activeFilter === filter.value ? 'primary' : 'neutral'"
        :variant="activeFilter === filter.value ? 'solid' : 'outline'"
        clickable
        rounded
        @click="activeFilter = filter.value"
      >
        {{ filter.label }}
        <template v-if="filter.count !== undefined">
          ({{ filter.count }})
        </template>
      </VcChip>
    </div>

    <!-- RFQ List Table -->
    <VcWidget :title="$t('pages.account.rfq.list_title')" size="lg">
      <template #default-container>
        <RfqListTable
          :rfqs="filteredRfqs"
          @view="navigateToDetail"
        />
      </template>
    </VcWidget>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { usePageHead } from "@/core/composables";
import { useRfq, RfqListTable } from "@/shared/account";
import type { RfqStatusType } from "@/shared/account";

const { t } = useI18n();
const router = useRouter();

usePageHead({
  title: computed(() => t("pages.account.rfq.meta.title")),
});

const { rfqs, totalRfqs, openRfqs, avgBidsPerRfq, totalAwardedValue } = useRfq();

const activeFilter = ref<RfqStatusType | "all">("all");

const statusFilters = computed(() => {
  const counts: Record<string, number> = {};
  for (const rfq of rfqs.value) {
    counts[rfq.status] = (counts[rfq.status] ?? 0) + 1;
  }

  return [
    { value: "all" as const, label: t("pages.account.rfq.filter.all"), count: rfqs.value.length },
    { value: "draft" as const, label: t("pages.account.rfq.filter.draft"), count: counts["draft"] ?? 0 },
    { value: "published" as const, label: t("pages.account.rfq.filter.published"), count: counts["published"] ?? 0 },
    { value: "evaluating" as const, label: t("pages.account.rfq.filter.evaluating"), count: counts["evaluating"] ?? 0 },
    { value: "awarded" as const, label: t("pages.account.rfq.filter.awarded"), count: counts["awarded"] ?? 0 },
    { value: "closed" as const, label: t("pages.account.rfq.filter.closed"), count: counts["closed"] ?? 0 },
    { value: "cancelled" as const, label: t("pages.account.rfq.filter.cancelled"), count: counts["cancelled"] ?? 0 },
  ];
});

const filteredRfqs = computed(() => {
  if (activeFilter.value === "all") {
    return rfqs.value;
  }
  return rfqs.value.filter((r) => r.status === activeFilter.value);
});

function navigateToDetail(rfqId: string): void {
  void router.push({ name: "RfqDetail", params: { id: rfqId } });
}

function handleCreateRfq(): void {
  // Placeholder for create RFQ flow
}
</script>
