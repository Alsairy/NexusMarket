<template>
  <div class="flex flex-col gap-4">
    <VcEmptyView
      v-if="!bids.length"
      :text="$t('pages.account.rfq.evaluation.no_bids')"
      icon="outline-list"
    />

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b-2 border-neutral-200 text-xs font-bold uppercase text-neutral-500">
            <th class="px-4 py-3">{{ $t("pages.account.rfq.evaluation.col_criterion") }}</th>
            <th class="px-4 py-3 text-center">{{ $t("pages.account.rfq.evaluation.col_weight") }}</th>
            <th
              v-for="bid in sortedBids"
              :key="bid.id"
              class="px-4 py-3 text-center"
              :class="{ 'bg-success-50': isTopBid(bid) }"
            >
              <div class="flex flex-col items-center gap-0.5">
                <span class="max-w-[120px] truncate">{{ bid.supplierName }}</span>
                <VcBadge
                  v-if="isTopBid(bid)"
                  color="success"
                  variant="solid"
                  size="xs"
                  rounded
                >
                  {{ $t("pages.account.rfq.evaluation.recommended") }}
                </VcBadge>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Technical Score -->
          <tr class="border-b border-neutral-100">
            <td class="px-4 py-3 font-semibold text-neutral-700">
              {{ $t("pages.account.rfq.evaluation.technical") }}
            </td>
            <td class="px-4 py-3 text-center font-bold text-neutral-500">30%</td>
            <td
              v-for="bid in sortedBids"
              :key="`tech-${bid.id}`"
              class="px-4 py-3 text-center"
              :class="{ 'bg-success-50': isTopBid(bid) }"
            >
              <span
                class="font-bold"
                :class="getScoreClass(bid.technicalScore, 'technicalScore')"
              >
                {{ bid.technicalScore ?? '&mdash;' }}
              </span>
            </td>
          </tr>

          <!-- Commercial Score -->
          <tr class="border-b border-neutral-100">
            <td class="px-4 py-3 font-semibold text-neutral-700">
              {{ $t("pages.account.rfq.evaluation.commercial") }}
            </td>
            <td class="px-4 py-3 text-center font-bold text-neutral-500">25%</td>
            <td
              v-for="bid in sortedBids"
              :key="`comm-${bid.id}`"
              class="px-4 py-3 text-center"
              :class="{ 'bg-success-50': isTopBid(bid) }"
            >
              <span
                class="font-bold"
                :class="getScoreClass(bid.commercialScore, 'commercialScore')"
              >
                {{ bid.commercialScore ?? '&mdash;' }}
              </span>
            </td>
          </tr>

          <!-- Compliance Score -->
          <tr class="border-b border-neutral-100">
            <td class="px-4 py-3 font-semibold text-neutral-700">
              {{ $t("pages.account.rfq.evaluation.compliance") }}
            </td>
            <td class="px-4 py-3 text-center font-bold text-neutral-500">25%</td>
            <td
              v-for="bid in sortedBids"
              :key="`comp-${bid.id}`"
              class="px-4 py-3 text-center"
              :class="{ 'bg-success-50': isTopBid(bid) }"
            >
              <span
                class="font-bold"
                :class="getScoreClass(bid.complianceScore, 'complianceScore')"
              >
                {{ bid.complianceScore ?? '&mdash;' }}
              </span>
            </td>
          </tr>

          <!-- Delivery Days (informational row) -->
          <tr class="border-b border-neutral-100 bg-neutral-50/50">
            <td class="px-4 py-3 font-semibold text-neutral-700">
              {{ $t("pages.account.rfq.evaluation.delivery") }}
            </td>
            <td class="px-4 py-3 text-center font-bold text-neutral-500">20%</td>
            <td
              v-for="bid in sortedBids"
              :key="`del-${bid.id}`"
              class="px-4 py-3 text-center"
              :class="{ 'bg-success-50': isTopBid(bid) }"
            >
              <span class="font-bold text-neutral-700">
                {{ bid.deliveryDays }} {{ $t("pages.account.rfq.evaluation.days") }}
              </span>
            </td>
          </tr>

          <!-- Total Amount -->
          <tr class="border-b border-neutral-100 bg-neutral-50/50">
            <td class="px-4 py-3 font-semibold text-neutral-700">
              {{ $t("pages.account.rfq.evaluation.total_amount") }}
            </td>
            <td class="px-4 py-3 text-center">&mdash;</td>
            <td
              v-for="bid in sortedBids"
              :key="`amount-${bid.id}`"
              class="px-4 py-3 text-center"
              :class="{ 'bg-success-50': isTopBid(bid) }"
            >
              <span class="font-black text-neutral-950">
                ${{ bid.totalAmount.toLocaleString() }}
              </span>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="border-t-2 border-neutral-300 bg-neutral-50">
            <td class="px-4 py-3 text-sm font-black uppercase text-neutral-700">
              {{ $t("pages.account.rfq.evaluation.overall_score") }}
            </td>
            <td class="px-4 py-3 text-center font-bold text-neutral-500">100%</td>
            <td
              v-for="bid in sortedBids"
              :key="`overall-${bid.id}`"
              class="px-4 py-3 text-center"
              :class="{ 'bg-success-100': isTopBid(bid) }"
            >
              <span
                class="text-xl font-black"
                :class="overallScoreClass(bid.overallScore)"
              >
                {{ bid.overallScore ?? '&mdash;' }}
              </span>
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
import type { BidType } from "@/shared/account";

interface IProps {
  bids: BidType[];
}

const props = defineProps<IProps>();

useI18n();

const sortedBids = computed(() =>
  [...props.bids].sort((a, b) => (b.overallScore ?? 0) - (a.overallScore ?? 0)),
);

const topBidId = computed(() => {
  if (sortedBids.value.length === 0) {
    return null;
  }
  return sortedBids.value[0].id;
});

function isTopBid(bid: BidType): boolean {
  return bid.id === topBidId.value;
}

type ScoreField = "technicalScore" | "commercialScore" | "complianceScore";

function getScoreClass(score: number | undefined, field: ScoreField): string {
  if (score === undefined) {
    return "text-neutral-400";
  }

  // Check if this bid has the highest score for this field
  const maxScore = Math.max(...props.bids.map((b) => b[field] ?? 0));
  if (score === maxScore) {
    return "text-success-600";
  }
  if (score >= 80) {
    return "text-neutral-700";
  }
  return "text-warning-600";
}

function overallScoreClass(score: number | undefined): string {
  if (score === undefined) {
    return "text-neutral-400";
  }
  if (score >= 85) {
    return "text-success-600";
  }
  if (score >= 70) {
    return "text-warning-600";
  }
  return "text-danger-600";
}
</script>
