<template>
  <div
    class="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-additional-50 p-5 shadow-sm transition-shadow hover:shadow-md"
  >
    <!-- Header -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex min-w-0 flex-col">
        <span class="truncate text-base font-black text-neutral-950">
          {{ $t(plan.contractTitle) }}
        </span>
        <span class="text-xs text-neutral-400">
          {{ plan.contractId }}
        </span>
      </div>

      <VcBadge
        :color="planStatusColor"
        variant="solid-light"
        size="xs"
        rounded
        nowrap
      >
        {{ completedMilestones }}/{{ plan.milestones.length }}
        {{ $t("pages.account.payments.milestones.milestones_label") }}
      </VcBadge>
    </div>

    <!-- Amounts row -->
    <div class="grid grid-cols-3 gap-3">
      <div class="flex flex-col">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.payments.milestones.total_label") }}
        </span>
        <span class="text-lg font-black text-neutral-950">
          ${{ plan.totalAmount.toLocaleString() }}
        </span>
      </div>

      <div class="flex flex-col">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.payments.milestones.released_label") }}
        </span>
        <span class="text-lg font-black text-success-600">
          ${{ plan.releasedAmount.toLocaleString() }}
        </span>
      </div>

      <div class="flex flex-col">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.account.payments.milestones.pending_label") }}
        </span>
        <span class="text-lg font-black text-warning-600">
          ${{ plan.pendingAmount.toLocaleString() }}
        </span>
      </div>
    </div>

    <!-- Progress bar -->
    <div class="flex flex-col gap-1">
      <div class="h-2.5 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          class="h-full rounded-full bg-success-500 transition-all duration-500"
          :style="{ width: `${progressPercent}%` }"
        ></div>
      </div>
      <div class="flex items-center justify-between text-xs text-neutral-400">
        <span>{{ progressPercent }}% {{ $t("pages.account.payments.milestones.complete_label") }}</span>
        <span>{{ plan.currency }}</span>
      </div>
    </div>

    <!-- Expand/Collapse -->
    <VcButton
      size="xs"
      variant="outline"
      class="self-start"
      @click="expanded = !expanded"
    >
      {{ expanded
        ? $t("pages.account.payments.milestones.collapse_button")
        : $t("pages.account.payments.milestones.expand_button")
      }}
    </VcButton>

    <!-- Timeline (expandable) -->
    <div v-if="expanded" class="border-t border-neutral-100 pt-4">
      <MilestoneTimeline
        :milestones="plan.milestones"
        :total-amount="plan.totalAmount"
        :released-amount="plan.releasedAmount"
        @approve="(milestoneId) => $emit('approve-milestone', plan.id, milestoneId)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import MilestoneTimeline from "./milestone-timeline.vue";
import type { MilestonePaymentPlanType } from "@/shared/account";

interface IProps {
  plan: MilestonePaymentPlanType;
}

const props = defineProps<IProps>();

defineEmits<{
  (event: "approve-milestone", planId: string, milestoneId: string): void;
}>();

useI18n();

const expanded = ref(false);

const progressPercent = computed(() => {
  if (props.plan.totalAmount === 0) {
    return 0;
  }
  return Math.round((props.plan.releasedAmount / props.plan.totalAmount) * 100);
});

const completedMilestones = computed(
  () => props.plan.milestones.filter((ms) => ms.status === "approved").length,
);

const planStatusColor = computed<VcBadgeColorType>(() => {
  if (completedMilestones.value === props.plan.milestones.length) {
    return "success";
  }
  if (completedMilestones.value > 0) {
    return "primary";
  }
  return "neutral";
});
</script>
