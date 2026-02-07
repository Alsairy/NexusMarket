<template>
  <div
    class="flex flex-col gap-3 rounded-lg border bg-additional-50 p-5 shadow-sm transition-all"
    :class="cardBorderClass"
  >
    <!-- Header row: severity icon + category + title -->
    <div class="flex items-start gap-3">
      <!-- Severity icon -->
      <div
        class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full"
        :class="iconBgClass"
      >
        <span class="text-sm" :class="iconTextClass">
          <span v-if="insight.severity === 'critical'">!!</span>
          <span v-else-if="insight.severity === 'warning'">!</span>
          <span v-else>i</span>
        </span>
      </div>

      <div class="flex min-w-0 flex-1 flex-col gap-1">
        <div class="flex items-center gap-2">
          <VcBadge color="primary" variant="outline" size="xs" rounded>
            {{ $t(`pages.account.ai_insights.insight_categories.${insight.category}`) }}
          </VcBadge>
          <SeverityBadge :severity="insight.severity" />
        </div>

        <span class="text-sm font-black text-neutral-950">
          {{ $t(insight.title) }}
        </span>
      </div>
    </div>

    <!-- Description -->
    <p class="text-sm text-neutral-600">
      {{ $t(insight.description) }}
    </p>

    <!-- Impact -->
    <div class="flex items-start gap-2 rounded bg-neutral-50 px-3 py-2">
      <span class="text-xs font-bold text-neutral-500">
        {{ $t("pages.account.ai_insights.insight_card.impact") }}:
      </span>
      <span class="text-xs text-neutral-700">{{ $t(insight.impact) }}</span>
    </div>

    <!-- Suggested action -->
    <div class="flex items-start gap-2 rounded bg-primary-50 px-3 py-2">
      <span class="text-xs font-bold text-primary-700">
        {{ $t("pages.account.ai_insights.insight_card.suggested_action") }}:
      </span>
      <span class="text-xs text-primary-600">{{ $t(insight.suggestedAction) }}</span>
    </div>

    <!-- Footer: date + acknowledge button -->
    <div class="flex items-center justify-between border-t border-neutral-100 pt-3">
      <span class="text-xs text-neutral-400">
        {{ formattedDate }}
      </span>

      <VcButton
        v-if="!insight.acknowledged"
        size="xs"
        variant="solid"
        @click="$emit('acknowledge', insight.id)"
      >
        {{ $t("pages.account.ai_insights.insight_card.acknowledge") }}
      </VcButton>

      <VcBadge v-else color="success" variant="solid-light" size="xs" rounded>
        {{ $t("pages.account.ai_insights.insight_card.acknowledged") }}
      </VcBadge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { ProcurementInsightType } from "@/shared/account";
import SeverityBadge from "./severity-badge.vue";

interface IProps {
  insight: ProcurementInsightType;
}

interface IEmits {
  (event: "acknowledge", id: string): void;
}

const props = defineProps<IProps>();
defineEmits<IEmits>();

useI18n();

const cardBorderClass = computed(() => {
  if (!props.insight.acknowledged) {
    const borderMap: Record<string, string> = {
      critical: "border-danger-300 border-l-4 border-l-danger-500",
      warning: "border-warning-300 border-l-4 border-l-warning-500",
      info: "border-info-300 border-l-4 border-l-info-500",
    };
    return borderMap[props.insight.severity] ?? "border-neutral-200";
  }
  return "border-neutral-200";
});

const iconBgClass = computed(() => {
  const bgMap: Record<string, string> = {
    critical: "bg-danger-100",
    warning: "bg-warning-100",
    info: "bg-info-100",
  };
  return bgMap[props.insight.severity] ?? "bg-neutral-100";
});

const iconTextClass = computed(() => {
  const textMap: Record<string, string> = {
    critical: "font-black text-danger-600",
    warning: "font-black text-warning-600",
    info: "font-black text-info-600",
  };
  return textMap[props.insight.severity] ?? "font-black text-neutral-600";
});

const formattedDate = computed(() => {
  const date = new Date(props.insight.createdAt);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});
</script>
