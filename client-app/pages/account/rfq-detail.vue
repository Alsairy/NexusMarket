<template>
  <div class="flex flex-col gap-6">
    <!-- Back navigation -->
    <div class="flex items-center gap-2">
      <VcButton
        variant="no-background"
        size="xs"
        prepend-icon="chevron-left"
        @click="router.push({ name: 'Rfq' })"
      >
        {{ $t("pages.account.rfq.detail.back_to_list") }}
      </VcButton>
    </div>

    <!-- Loading state -->
    <div v-if="!rfq" class="flex items-center justify-center py-12">
      <VcEmptyView
        :text="$t('pages.account.rfq.detail.not_found')"
        icon="outline-list"
      />
    </div>

    <template v-else>
      <!-- RFQ Header -->
      <div class="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-additional-50 p-5 shadow-sm">
        <div class="flex items-start justify-between gap-4">
          <div class="flex min-w-0 flex-col gap-1">
            <div class="flex items-center gap-3">
              <span class="font-mono text-sm font-bold text-primary-600">
                {{ rfq.referenceNumber }}
              </span>
              <RfqStatusBadge :status="rfq.status" />
            </div>
            <VcTypography tag="h1" class="text-xl">
              {{ rfq.title }}
            </VcTypography>
          </div>

          <!-- Action buttons based on status -->
          <div class="flex flex-shrink-0 items-center gap-2">
            <VcButton
              v-if="rfq.status === 'draft'"
              color="primary"
              size="sm"
              @click="handlePublish"
            >
              {{ $t("pages.account.rfq.detail.action_publish") }}
            </VcButton>
            <VcButton
              v-if="rfq.status === 'published' && rfq.receivedBids > 0"
              color="warning"
              size="sm"
              @click="handleEvaluate"
            >
              {{ $t("pages.account.rfq.detail.action_evaluate") }}
            </VcButton>
            <VcButton
              v-if="rfq.status === 'evaluating' && topRecommendation"
              color="success"
              size="sm"
              @click="handleAward(topRecommendation.bidId)"
            >
              {{ $t("pages.account.rfq.detail.action_award") }}
            </VcButton>
          </div>
        </div>

        <!-- Meta row -->
        <div class="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
          <span>
            {{ $t("pages.account.rfq.detail.created_by") }}: <strong class="text-neutral-700">{{ rfq.createdBy }}</strong>
          </span>
          <span>
            {{ $t("pages.account.rfq.detail.created_at") }}: <strong class="text-neutral-700">{{ $d(new Date(rfq.createdAt), "short") }}</strong>
          </span>
          <span>
            {{ $t("pages.account.rfq.detail.deadline") }}: <strong class="text-neutral-700">{{ $d(new Date(rfq.deadline), "short") }}</strong>
          </span>
          <span>
            {{ $t("pages.account.rfq.detail.sector") }}: <strong class="text-neutral-700">{{ rfq.sector }}</strong>
          </span>
          <span v-if="rfq.awardedTo">
            {{ $t("pages.account.rfq.detail.awarded_to") }}: <strong class="text-success-700">{{ rfq.awardedTo }}</strong>
          </span>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex border-b border-neutral-200">
        <button
          v-for="tab in availableTabs"
          :key="tab.id"
          class="px-4 py-2.5 text-sm font-bold transition-colors"
          :class="
            activeTab === tab.id
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-neutral-500 hover:text-neutral-700'
          "
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab: Overview -->
      <template v-if="activeTab === 'overview'">
        <!-- Description -->
        <VcWidget :title="$t('pages.account.rfq.detail.description_title')">
          <p class="text-sm leading-relaxed text-neutral-700">
            {{ rfq.description }}
          </p>
        </VcWidget>

        <!-- Line Items -->
        <VcWidget :title="$t('pages.account.rfq.detail.line_items_title')" size="lg">
          <template #default-container>
            <RfqLineItems :line-items="rfq.lineItems" />
          </template>
        </VcWidget>

        <!-- Requirements -->
        <VcWidget :title="$t('pages.account.rfq.detail.requirements_title')">
          <RfqRequirements :requirements="rfq.requirements" />
        </VcWidget>
      </template>

      <!-- Tab: Bids -->
      <template v-if="activeTab === 'bids'">
        <VcEmptyView
          v-if="!rfqBids.length"
          :text="$t('pages.account.rfq.detail.no_bids')"
          icon="outline-list"
        />

        <div v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <BidCard
            v-for="bid in rfqBids"
            :key="bid.id"
            :bid="bid"
          />
        </div>
      </template>

      <!-- Tab: Evaluation -->
      <template v-if="activeTab === 'evaluation'">
        <!-- Award recommendation -->
        <AwardSummary
          v-if="topRecommendation"
          :recommendation="topRecommendation"
          @confirm="handleAward"
          @dismiss="recommendations = []"
        />

        <!-- Evaluation matrix -->
        <VcWidget :title="$t('pages.account.rfq.detail.evaluation_title')" size="lg">
          <template #default-container>
            <EvaluationMatrix :bids="rfqBids" />
          </template>
        </VcWidget>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { usePageHead } from "@/core/composables";
import {
  useRfq,
  RfqStatusBadge,
  RfqLineItems,
  RfqRequirements,
  BidCard,
  EvaluationMatrix,
  AwardSummary,
} from "@/shared/account";
import type { AwardRecommendationType } from "@/shared/account";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

usePageHead({
  title: computed(() => t("pages.account.rfq.detail.meta.title")),
});

const { getRfqById, fetchBidsForRfq, evaluateBids, awardRfq } = useRfq();

const rfqId = computed(() => route.params.id as string);
const rfq = computed(() => getRfqById(rfqId.value));
const rfqBids = computed(() => fetchBidsForRfq(rfqId.value));

type TabIdType = "overview" | "bids" | "evaluation";

const activeTab = ref<TabIdType>("overview");
const recommendations = ref<AwardRecommendationType[]>([]);

const topRecommendation = computed(() => recommendations.value.find((r) => r.recommended));

const availableTabs = computed(() => {
  const tabs: { id: TabIdType; label: string }[] = [
    { id: "overview", label: t("pages.account.rfq.detail.tab_overview") },
    { id: "bids", label: t("pages.account.rfq.detail.tab_bids") + ` (${rfqBids.value.length})` },
  ];

  if (rfq.value && (rfq.value.status === "evaluating" || rfq.value.status === "awarded")) {
    tabs.push({ id: "evaluation", label: t("pages.account.rfq.detail.tab_evaluation") });
  }

  return tabs;
});

// Reset tab when RFQ changes
watch(rfqId, () => {
  activeTab.value = "overview";
  recommendations.value = [];
});

function handlePublish(): void {
  // Placeholder for publish flow
}

async function handleEvaluate(): Promise<void> {
  if (!rfq.value) {
    return;
  }
  recommendations.value = await evaluateBids(rfq.value.id);
  activeTab.value = "evaluation";
}

async function handleAward(bidId: string): Promise<void> {
  if (!rfq.value) {
    return;
  }
  await awardRfq(rfq.value.id, bidId);
  recommendations.value = [];
}
</script>
