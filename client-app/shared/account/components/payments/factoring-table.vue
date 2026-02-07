<template>
  <VcTable
    :loading="loading"
    :columns="columns"
    :items="requests"
    :description="$t('pages.account.payments.factoring.table_description')"
  >
    <template #mobile-item="{ item }">
      <div class="border-b border-neutral-200 p-6">
        <div class="mb-3 flex items-start justify-between">
          <div>
            <span class="font-black">{{ item.invoiceNumber }}</span>
            <div class="mt-0.5 text-sm text-neutral-500">{{ item.buyerName }}</div>
          </div>
          <VcBadge
            :color="getStatusColor(item.status)"
            variant="solid-light"
            size="sm"
            rounded
          >
            {{ $t(`pages.account.payments.factoring.status_${item.status}`) }}
          </VcBadge>
        </div>

        <div class="grid grid-cols-2 gap-y-3">
          <div class="flex flex-col">
            <span class="text-xs text-neutral-400">
              {{ $t("pages.account.payments.factoring.invoice_amount_label") }}
            </span>
            <span class="text-sm font-bold">${{ item.invoiceAmount.toLocaleString() }}</span>
          </div>

          <div class="flex flex-col">
            <span class="text-xs text-neutral-400">
              {{ $t("pages.account.payments.factoring.advance_rate_label") }}
            </span>
            <span class="text-sm">{{ item.advanceRate }}%</span>
          </div>

          <div class="flex flex-col">
            <span class="text-xs text-neutral-400">
              {{ $t("pages.account.payments.factoring.factored_amount_label") }}
            </span>
            <span class="text-sm font-bold">${{ item.factoredAmount.toLocaleString() }}</span>
          </div>

          <div class="flex flex-col">
            <span class="text-xs text-neutral-400">
              {{ $t("pages.account.payments.factoring.fee_label") }}
            </span>
            <span class="text-sm">${{ item.fee.toLocaleString() }}</span>
          </div>

          <div class="flex flex-col">
            <span class="text-xs text-neutral-400">
              {{ $t("pages.account.payments.factoring.due_date_label") }}
            </span>
            <span class="text-sm">{{ $d(new Date(item.dueDate), "short") }}</span>
          </div>
        </div>
      </div>
    </template>

    <template #desktop-body>
      <tr v-for="req in requests" :key="req.id" class="even:bg-neutral-50">
        <td class="overflow-hidden text-ellipsis p-5">
          <span class="font-bold">{{ req.invoiceNumber }}</span>
        </td>

        <td class="overflow-hidden text-ellipsis p-5">
          {{ req.buyerName }}
        </td>

        <td class="overflow-hidden text-ellipsis p-5 text-right">
          <span class="font-semibold">${{ req.invoiceAmount.toLocaleString() }}</span>
        </td>

        <td class="overflow-hidden text-ellipsis p-5 text-right">
          {{ req.advanceRate }}%
        </td>

        <td class="overflow-hidden text-ellipsis p-5 text-right">
          <span class="font-semibold">${{ req.factoredAmount.toLocaleString() }}</span>
        </td>

        <td class="overflow-hidden text-ellipsis p-5 text-right">
          ${{ req.fee.toLocaleString() }}
        </td>

        <td class="p-5">
          <VcBadge
            :color="getStatusColor(req.status)"
            variant="solid-light"
            size="sm"
            rounded
          >
            {{ $t(`pages.account.payments.factoring.status_${req.status}`) }}
          </VcBadge>
        </td>

        <td class="overflow-hidden text-ellipsis p-5">
          {{ $d(new Date(req.dueDate), "short") }}
        </td>
      </tr>
    </template>
  </VcTable>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { InvoiceFactoringType } from "@/shared/account";

interface IProps {
  requests: InvoiceFactoringType[];
  loading?: boolean;
}

defineProps<IProps>();

const { t } = useI18n();

const columns = computed<ITableColumn[]>(() => [
  { id: "invoiceNumber", title: t("pages.account.payments.factoring.invoice_number_label") },
  { id: "buyer", title: t("pages.account.payments.factoring.buyer_label") },
  { id: "invoiceAmount", title: t("pages.account.payments.factoring.invoice_amount_label"), align: "right" },
  { id: "advanceRate", title: t("pages.account.payments.factoring.advance_rate_label"), align: "right" },
  { id: "factoredAmount", title: t("pages.account.payments.factoring.factored_amount_label"), align: "right" },
  { id: "fee", title: t("pages.account.payments.factoring.fee_label"), align: "right" },
  { id: "status", title: t("pages.account.payments.factoring.status_label") },
  { id: "dueDate", title: t("pages.account.payments.factoring.due_date_label"), sortable: true },
]);

function getStatusColor(status: string): VcBadgeColorType {
  const colorMap: Record<string, VcBadgeColorType> = {
    submitted: "neutral",
    approved: "info",
    funded: "success",
    settled: "primary",
    rejected: "danger",
  };
  return colorMap[status] ?? "neutral";
}
</script>
