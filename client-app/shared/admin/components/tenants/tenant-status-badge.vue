<template>
  <VcBadge :color="statusColor" :variant="variant" size="sm" rounded>
    {{ $t(`pages.admin.tenants.status_${status}`) }}
  </VcBadge>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { TenantStatusType } from "../../types";

interface IProps {
  status: TenantStatusType;
  variant?: VcBadgeVariantType;
}

const props = withDefaults(defineProps<IProps>(), {
  variant: "solid-light",
});

const statusColor = computed<VcBadgeColorType>(() => {
  switch (props.status) {
    case "active":
      return "success";
    case "suspended":
      return "danger";
    case "pending":
      return "warning";
    case "archived":
      return "neutral";
    default:
      return "neutral";
  }
});
</script>
