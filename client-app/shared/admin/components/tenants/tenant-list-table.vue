<template>
  <VcTable
    :columns="columns"
    :items="tenants"
    :hide-default-footer="true"
    :description="$t('pages.admin.tenants.table_description')"
    mobile-breakpoint="lg"
  >
    <template #mobile-item="{ item }">
      <div
        class="grid grid-cols-2 gap-y-3 border-b border-neutral-200 p-5 cursor-pointer"
        @click="$emit('select', item.id)"
      >
        <div class="col-span-2 flex items-center justify-between">
          <span class="font-bold">{{ item.name }}</span>
          <TenantStatusBadge :status="item.status" />
        </div>

        <div class="flex flex-col">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.admin.tenants.domain_label") }}
          </span>
          <VcBadge color="info" variant="outline" size="xs" rounded>
            {{ $t(`pages.admin.tenants.domain_${item.domain}`) }}
          </VcBadge>
        </div>

        <div class="flex flex-col items-end">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.admin.tenants.users_label") }}
          </span>
          <span>{{ item.userCount.toLocaleString() }}</span>
        </div>

        <div class="flex flex-col">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.admin.tenants.products_label") }}
          </span>
          <span>{{ item.productCount.toLocaleString() }}</span>
        </div>

        <div class="flex flex-col items-end">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.admin.tenants.monthly_gmv_label") }}
          </span>
          <span class="font-bold">{{ formatCurrency(item.monthlyGmv) }}</span>
        </div>
      </div>
    </template>

    <template #desktop-body>
      <tr
        v-for="item in tenants"
        :key="item.id"
        class="even:bg-neutral-50 cursor-pointer hover:bg-primary-50 transition-colors"
        @click="$emit('select', item.id)"
      >
        <td class="px-4 py-3 font-medium">{{ item.name }}</td>
        <td class="px-4 py-3">
          <VcBadge color="info" variant="outline" size="xs" rounded>
            {{ $t(`pages.admin.tenants.domain_${item.domain}`) }}
          </VcBadge>
        </td>
        <td class="px-4 py-3">
          <TenantStatusBadge :status="item.status" />
        </td>
        <td class="px-4 py-3 text-right">{{ item.userCount.toLocaleString() }}</td>
        <td class="px-4 py-3 text-right">{{ item.productCount.toLocaleString() }}</td>
        <td class="px-4 py-3 text-right font-bold">{{ formatCurrency(item.monthlyGmv) }}</td>
        <td class="px-4 py-3 text-sm text-neutral-500">{{ formatDate(item.createdAt) }}</td>
        <td class="px-4 py-3">
          <VcButton size="sm" variant="outline" @click.stop="$emit('select', item.id)">
            {{ $t("pages.admin.tenants.view_button") }}
          </VcButton>
        </td>
      </tr>
    </template>
  </VcTable>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import TenantStatusBadge from "./tenant-status-badge.vue";
import type { TenantConfigType } from "../../types";

interface IProps {
  tenants: TenantConfigType[];
}

defineProps<IProps>();

defineEmits<{
  (event: "select", id: string): void;
}>();

const { t } = useI18n();

const columns = computed<VcTableColumnType[]>(() => [
  { id: "name", title: t("pages.admin.tenants.name_label") },
  { id: "domain", title: t("pages.admin.tenants.domain_label") },
  { id: "status", title: t("pages.admin.tenants.status_label") },
  { id: "users", title: t("pages.admin.tenants.users_label"), align: "right" },
  { id: "products", title: t("pages.admin.tenants.products_label"), align: "right" },
  { id: "gmv", title: t("pages.admin.tenants.monthly_gmv_label"), align: "right" },
  { id: "created", title: t("pages.admin.tenants.created_label") },
  { id: "actions", title: t("pages.admin.tenants.actions_label") },
]);

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toLocaleString()}`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
</script>
