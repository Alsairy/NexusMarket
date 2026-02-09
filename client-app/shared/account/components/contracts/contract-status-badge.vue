<template>
  <VcBadge
    :color="statusColor"
    variant="solid-light"
    size="sm"
    rounded
  >
    {{ $t(`pages.account.contracts.status_${status}`) }}
  </VcBadge>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ContractStatusType } from "@/shared/account";

interface IProps {
  status: ContractStatusType;
}

const props = defineProps<IProps>();

const statusColor = computed<VcBadgeColorType>(() => {
  const colorMap: Record<ContractStatusType, VcBadgeColorType> = {
    draft: "neutral",
    active: "success",
    suspended: "warning",
    expired: "neutral",
    terminated: "danger",
  };
  return colorMap[props.status] ?? "neutral";
});
</script>
