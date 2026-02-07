<template>
  <div class="flex flex-col gap-4">
    <!-- Progress bar -->
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold text-neutral-700">
          {{ $t("pages.account.payments.milestones.progress_label") }}
        </span>
        <span class="font-black text-neutral-950">{{ progressPercent }}%</span>
      </div>
      <div class="h-3 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          class="h-full rounded-full bg-success-500 transition-all duration-500"
          :style="{ width: `${progressPercent}%` }"
        ></div>
      </div>
      <div class="flex items-center justify-between text-xs text-neutral-400">
        <span>
          ${{ releasedAmount.toLocaleString() }} {{ $t("pages.account.payments.milestones.released_label") }}
        </span>
        <span>
          ${{ totalAmount.toLocaleString() }} {{ $t("pages.account.payments.milestones.total_label") }}
        </span>
      </div>
    </div>

    <!-- Timeline -->
    <div class="relative flex flex-col">
      <div
        v-for="(milestone, index) in milestones"
        :key="milestone.id"
        class="relative flex gap-4 pb-8 last:pb-0"
      >
        <!-- Vertical connector line -->
        <div class="flex flex-col items-center">
          <!-- Status circle -->
          <div
            class="z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition-all"
            :class="milestoneCircleClass(milestone)"
          >
            <span v-if="milestone.status === 'approved'" class="text-xs font-black text-success-600">&#10003;</span>
            <span v-else-if="milestone.status === 'completed'" class="text-xs font-black text-info-600">&#10003;</span>
            <span v-else-if="milestone.status === 'in_progress'" class="size-2.5 animate-pulse rounded-full bg-warning-500"></span>
            <span v-else-if="milestone.status === 'disputed'" class="text-xs font-black text-danger-600">!</span>
            <span v-else class="size-2 rounded-full bg-neutral-300"></span>
          </div>

          <!-- Connector line -->
          <div
            v-if="index < milestones.length - 1"
            class="w-0.5 grow"
            :class="connectorClass(milestone)"
          ></div>
        </div>

        <!-- Milestone content -->
        <div class="flex min-w-0 flex-1 flex-col gap-1 pb-2">
          <div class="flex items-start justify-between gap-2">
            <div class="flex flex-col">
              <span class="text-sm font-black text-neutral-950">
                {{ $t(milestone.name) }}
              </span>
              <span v-if="milestone.description" class="text-xs text-neutral-500">
                {{ $t(milestone.description) }}
              </span>
            </div>

            <VcBadge
              :color="milestoneStatusColor(milestone.status)"
              variant="solid-light"
              size="xs"
              rounded
              nowrap
            >
              {{ $t(`pages.account.payments.milestones.status_${milestone.status}`) }}
            </VcBadge>
          </div>

          <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400">
            <span class="font-semibold text-neutral-700">
              ${{ milestone.amount.toLocaleString() }}
              ({{ milestone.percentage }}%)
            </span>

            <span>
              {{ $t("pages.account.payments.milestones.due_label") }}:
              {{ $d(new Date(milestone.dueDate), "short") }}
            </span>

            <span v-if="milestone.completedAt" class="text-success-600">
              {{ $t("pages.account.payments.milestones.completed_label") }}:
              {{ $d(new Date(milestone.completedAt), "short") }}
            </span>
          </div>

          <!-- Approve button for completed milestones -->
          <div v-if="milestone.status === 'completed'" class="mt-2">
            <VcButton
              size="xs"
              variant="solid"
              color="success"
              @click="$emit('approve', milestone.id)"
            >
              {{ $t("pages.account.payments.milestones.approve_button") }}
            </VcButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { MilestoneType, MilestoneStatusType } from "@/shared/account";

interface IProps {
  milestones: MilestoneType[];
  totalAmount: number;
  releasedAmount: number;
}

const props = defineProps<IProps>();

defineEmits<{
  (event: "approve", milestoneId: string): void;
}>();

useI18n();

const progressPercent = computed(() => {
  if (props.totalAmount === 0) {
    return 0;
  }
  return Math.round((props.releasedAmount / props.totalAmount) * 100);
});

function milestoneCircleClass(milestone: MilestoneType): string {
  switch (milestone.status) {
    case "approved":
      return "border-success-500 bg-success-50";
    case "completed":
      return "border-info-500 bg-info-50";
    case "in_progress":
      return "border-warning-500 bg-warning-50";
    case "disputed":
      return "border-danger-500 bg-danger-50";
    case "pending":
    default:
      return "border-neutral-300 bg-neutral-50";
  }
}

function connectorClass(milestone: MilestoneType): string {
  switch (milestone.status) {
    case "approved":
    case "completed":
      return "bg-success-300";
    case "in_progress":
      return "bg-warning-300";
    default:
      return "bg-neutral-200";
  }
}

function milestoneStatusColor(status: MilestoneStatusType): VcBadgeColorType {
  const colorMap: Record<MilestoneStatusType, VcBadgeColorType> = {
    pending: "neutral",
    in_progress: "warning",
    completed: "info",
    approved: "success",
    disputed: "danger",
  };
  return colorMap[status] ?? "neutral";
}
</script>
