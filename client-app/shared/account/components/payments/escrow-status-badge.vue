<template>
  <VcBadge
    :color="badgeColor"
    variant="solid-light"
    size="sm"
    rounded
  >
    {{ $t(`pages.account.payments.escrow.status_${status}`) }}
  </VcBadge>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { EscrowStatusType } from "@/shared/account";

interface IProps {
  status: EscrowStatusType;
}

const props = defineProps<IProps>();

useI18n();

const badgeColor = computed<VcBadgeColorType>(() => {
  const colorMap: Record<EscrowStatusType, VcBadgeColorType> = {
    pending: "warning",
    funded: "info",
    in_progress: "primary",
    released: "success",
    disputed: "danger",
    refunded: "neutral",
  };
  return colorMap[props.status] ?? "neutral";
});
</script>
