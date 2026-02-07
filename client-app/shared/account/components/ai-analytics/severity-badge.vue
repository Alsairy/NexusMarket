<template>
  <VcBadge
    :color="badgeColor"
    variant="solid-light"
    size="sm"
    rounded
  >
    {{ $t(`pages.account.ai_insights.severity.${severity}`) }}
  </VcBadge>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { InsightSeverityType } from "@/shared/account";

interface IProps {
  severity: InsightSeverityType;
}

const props = defineProps<IProps>();

useI18n();

const badgeColor = computed<VcBadgeColorType>(() => {
  const colorMap: Record<InsightSeverityType, VcBadgeColorType> = {
    info: "info",
    warning: "warning",
    critical: "danger",
  };
  return colorMap[props.severity];
});
</script>
