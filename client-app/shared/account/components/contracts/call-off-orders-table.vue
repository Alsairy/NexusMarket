<template>
  <VcWidget :title="$t('pages.account.contracts.call_off_orders_title')" size="lg">
    <template #default-container>
      <VcTable
        :loading="loading"
        :columns="columns"
        :items="orders"
        :description="$t('pages.account.contracts.call_off_orders_description')"
      >
        <template #mobile-item="{ item }">
          <div class="border-b border-neutral-200 p-6">
            <div class="mb-3 flex items-start justify-between">
              <div>
                <span class="font-black">{{ item.orderNumber }}</span>
                <div class="mt-0.5 text-sm text-neutral-500">
                  {{ $d(new Date(item.createdAt), "short") }}
                </div>
              </div>
              <VcBadge
                :color="getOrderStatusColor(item.status)"
                variant="solid-light"
                size="sm"
                rounded
              >
                {{ $t(`pages.account.contracts.order_status_${item.status}`) }}
              </VcBadge>
            </div>

            <div class="flex flex-col gap-2">
              <div class="flex flex-col">
                <span class="text-xs text-neutral-400">
                  {{ $t("pages.account.contracts.items_label") }}
                </span>
                <span class="text-sm">{{ item.lineItems.length }} {{ $t("pages.account.contracts.items_suffix") }}</span>
              </div>

              <div class="flex flex-col">
                <span class="text-xs text-neutral-400">
                  {{ $t("pages.account.contracts.total_label") }}
                </span>
                <span class="text-sm font-bold">${{ item.totalAmount.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </template>

        <template #desktop-body>
          <tr v-for="order in orders" :key="order.id" class="even:bg-neutral-50">
            <td class="overflow-hidden text-ellipsis p-5">
              <span class="font-bold">{{ order.orderNumber }}</span>
            </td>

            <td class="overflow-hidden text-ellipsis p-5 text-sm">
              {{ $d(new Date(order.createdAt), "short") }}
            </td>

            <td class="p-5">
              <VcBadge
                :color="getOrderStatusColor(order.status)"
                variant="solid-light"
                size="sm"
                rounded
              >
                {{ $t(`pages.account.contracts.order_status_${order.status}`) }}
              </VcBadge>
            </td>

            <td class="overflow-hidden text-ellipsis p-5 text-sm">
              {{ order.lineItems.length }} {{ $t("pages.account.contracts.items_suffix") }}
            </td>

            <td class="overflow-hidden text-ellipsis p-5">
              <span class="font-bold">${{ order.totalAmount.toLocaleString() }}</span>
            </td>
          </tr>
        </template>
      </VcTable>
    </template>
  </VcWidget>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { CallOffOrderType } from "@/shared/account";

interface IProps {
  orders: CallOffOrderType[];
  loading?: boolean;
}

defineProps<IProps>();

const { t } = useI18n();

const columns = computed<ITableColumn[]>(() => [
  { id: "orderNumber", title: t("pages.account.contracts.order_number_label") },
  { id: "date", title: t("pages.account.contracts.date_label") },
  { id: "status", title: t("pages.account.contracts.status_label") },
  { id: "items", title: t("pages.account.contracts.items_label") },
  { id: "total", title: t("pages.account.contracts.total_label") },
]);

function getOrderStatusColor(status: CallOffOrderType["status"]): VcBadgeColorType {
  const colorMap: Record<CallOffOrderType["status"], VcBadgeColorType> = {
    pending: "warning",
    approved: "info",
    fulfilled: "success",
    cancelled: "danger",
  };
  return colorMap[status] ?? "neutral";
}
</script>
