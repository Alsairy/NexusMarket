<template>
  <div class="flex flex-col gap-4 rounded-lg border-2 border-success-200 bg-success-50 p-5">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <div class="flex size-10 items-center justify-center rounded-full bg-success-500">
        <VcIcon name="apply" size="sm" class="text-additional-50" />
      </div>
      <div class="flex flex-col">
        <span class="text-xs font-bold uppercase text-success-700">
          {{ $t("pages.account.rfq.award.recommendation_title") }}
        </span>
        <span class="text-lg font-black text-neutral-950">
          {{ recommendation.supplierName }}
        </span>
      </div>
    </div>

    <!-- Key metrics -->
    <div class="grid grid-cols-3 gap-3">
      <div class="flex flex-col rounded-lg bg-additional-50 px-3 py-2">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.rfq.award.overall_score") }}
        </span>
        <span class="text-xl font-black text-success-600">
          {{ recommendation.totalScore }}
        </span>
      </div>
      <div class="flex flex-col rounded-lg bg-additional-50 px-3 py-2">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.rfq.award.total_amount") }}
        </span>
        <span class="text-xl font-black text-neutral-950">
          ${{ recommendation.totalAmount.toLocaleString() }}
        </span>
      </div>
      <div class="flex flex-col rounded-lg bg-additional-50 px-3 py-2">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.rfq.award.rank") }}
        </span>
        <span class="text-xl font-black text-primary-600">
          #{{ recommendation.rank }}
        </span>
      </div>
    </div>

    <!-- Reasoning -->
    <div class="flex flex-col gap-1">
      <span class="text-xs font-bold uppercase text-neutral-500">
        {{ $t("pages.account.rfq.award.reasoning_label") }}
      </span>
      <p class="text-sm leading-relaxed text-neutral-700">
        {{ $t(recommendation.reasoning) }}
      </p>
    </div>

    <!-- Action -->
    <div class="flex items-center justify-end gap-3 border-t border-success-200 pt-3">
      <VcButton
        variant="outline"
        size="sm"
        @click="$emit('dismiss')"
      >
        {{ $t("pages.account.rfq.award.dismiss_button") }}
      </VcButton>
      <VcButton
        color="success"
        size="sm"
        @click="$emit('confirm', recommendation.bidId)"
      >
        {{ $t("pages.account.rfq.award.confirm_button") }}
      </VcButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { AwardRecommendationType } from "@/shared/account";

interface IProps {
  recommendation: AwardRecommendationType;
}

defineProps<IProps>();

defineEmits<{
  (event: "confirm", bidId: string): void;
  (event: "dismiss"): void;
}>();

useI18n();
</script>
