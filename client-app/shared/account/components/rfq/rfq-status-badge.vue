<template>
  <VcBadge
    :color="statusColor"
    variant="solid-light"
    size="sm"
    rounded
    nowrap
  >
    {{ $t(`pages.account.rfq.status.${status}`) }}
  </VcBadge>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { RfqStatusType } from "@/shared/account";

interface IProps {
  status: RfqStatusType;
}

const props = defineProps<IProps>();

useI18n();

const statusColor = computed((): VcBadgeColorType => {
  const colorMap: Record<RfqStatusType, VcBadgeColorType> = {
    draft: "neutral",
    published: "info",
    evaluating: "warning",
    awarded: "success",
    closed: "secondary",
    cancelled: "danger",
  };
  return colorMap[props.status] ?? "neutral";
});
</script>
