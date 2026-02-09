<template>
  <div class="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
    <!-- Header: Supplier name + status -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex min-w-0 flex-col">
        <span class="truncate text-base font-black text-neutral-950">
          {{ bid.supplierName }}
        </span>
        <span class="text-xs text-neutral-400">
          {{ $t("pages.account.rfq.bid_card.submitted_at") }}
          {{ $d(new Date(bid.submittedAt), "short") }}
        </span>
      </div>
      <VcBadge
        :color="bidStatusColor"
        variant="solid-light"
        size="sm"
        rounded
        nowrap
      >
        {{ $t(`pages.account.rfq.bid_card.status_${bid.status}`) }}
      </VcBadge>
    </div>

    <!-- Key figures row -->
    <div class="grid grid-cols-2 gap-3">
      <div class="flex flex-col rounded-lg bg-neutral-50 px-3 py-2">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.rfq.bid_card.total_amount") }}
        </span>
        <span class="text-lg font-black text-neutral-950">
          ${{ bid.totalAmount.toLocaleString() }}
        </span>
      </div>
      <div class="flex flex-col rounded-lg bg-neutral-50 px-3 py-2">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.rfq.bid_card.delivery_days") }}
        </span>
        <span class="text-lg font-black text-neutral-950">
          {{ bid.deliveryDays }} {{ $t("pages.account.rfq.bid_card.days_unit") }}
        </span>
      </div>
    </div>

    <!-- Score breakdown -->
    <div v-if="hasScores" class="flex flex-col gap-2">
      <span class="text-xs font-bold uppercase text-neutral-500">
        {{ $t("pages.account.rfq.bid_card.score_breakdown") }}
      </span>

      <div class="flex flex-col gap-1.5">
        <div v-if="bid.technicalScore !== undefined" class="flex items-center gap-2">
          <span class="w-20 text-xs text-neutral-500">
            {{ $t("pages.account.rfq.bid_card.technical") }}
          </span>
          <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
            <div
              class="h-full rounded-full bg-info-500 transition-all"
              :style="{ width: `${bid.technicalScore}%` }"
            />
          </div>
          <span class="w-8 text-right text-xs font-bold text-neutral-700">{{ bid.technicalScore }}</span>
        </div>

        <div v-if="bid.commercialScore !== undefined" class="flex items-center gap-2">
          <span class="w-20 text-xs text-neutral-500">
            {{ $t("pages.account.rfq.bid_card.commercial") }}
          </span>
          <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
            <div
              class="h-full rounded-full bg-primary-500 transition-all"
              :style="{ width: `${bid.commercialScore}%` }"
            />
          </div>
          <span class="w-8 text-right text-xs font-bold text-neutral-700">{{ bid.commercialScore }}</span>
        </div>

        <div v-if="bid.complianceScore !== undefined" class="flex items-center gap-2">
          <span class="w-20 text-xs text-neutral-500">
            {{ $t("pages.account.rfq.bid_card.compliance") }}
          </span>
          <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
            <div
              class="h-full rounded-full bg-warning-500 transition-all"
              :style="{ width: `${bid.complianceScore}%` }"
            />
          </div>
          <span class="w-8 text-right text-xs font-bold text-neutral-700">{{ bid.complianceScore }}</span>
        </div>
      </div>

      <!-- Overall score -->
      <div v-if="bid.overallScore !== undefined" class="flex items-center justify-between border-t border-neutral-100 pt-2">
        <span class="text-xs font-bold text-neutral-600">
          {{ $t("pages.account.rfq.bid_card.overall_score") }}
        </span>
        <span class="text-lg font-black" :class="overallScoreClass">
          {{ bid.overallScore }}
        </span>
      </div>
    </div>

    <!-- Notes -->
    <p v-if="bid.notes" class="text-xs leading-relaxed text-neutral-500">
      {{ bid.notes }}
    </p>

    <!-- Footer: attachments -->
    <div class="flex items-center justify-between border-t border-neutral-100 pt-2">
      <span class="text-xs text-neutral-400">
        {{ $t("pages.account.rfq.bid_card.attachments_count", { count: bid.attachments }) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { BidType, BidStatusType } from "@/shared/account";

interface IProps {
  bid: BidType;
}

const props = defineProps<IProps>();

useI18n();

const hasScores = computed(
  () =>
    props.bid.technicalScore !== undefined ||
    props.bid.commercialScore !== undefined ||
    props.bid.complianceScore !== undefined,
);

const bidStatusColor = computed((): VcBadgeColorType => {
  const colorMap: Record<BidStatusType, VcBadgeColorType> = {
    submitted: "info",
    under_review: "warning",
    shortlisted: "primary",
    accepted: "success",
    rejected: "danger",
    withdrawn: "neutral",
  };
  return colorMap[props.bid.status] ?? "neutral";
});

const overallScoreClass = computed(() => {
  const score = props.bid.overallScore ?? 0;
  if (score >= 85) {
    return "text-success-600";
  }
  if (score >= 70) {
    return "text-warning-600";
  }
  return "text-danger-600";
});
</script>
