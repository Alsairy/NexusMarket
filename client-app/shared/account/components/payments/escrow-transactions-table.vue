<template>
  <VcTable
    :loading="loading"
    :columns="columns"
    :items="transactions"
    :description="$t('pages.account.payments.escrow.table_description')"
  >
    <template #mobile-item="{ item }">
      <div class="border-b border-neutral-200 p-6">
        <div class="mb-3 flex items-start justify-between">
          <div>
            <span class="font-black">{{ item.orderNumber }}</span>

            <div class="mt-0.5 text-sm text-neutral-500">
              {{ $t("pages.account.payments.escrow.buyer_label") }}: {{ item.buyerName }}
            </div>
          </div>

          <EscrowStatusBadge :status="item.status" />
        </div>

        <div class="grid grid-cols-2 gap-y-3">
          <div class="flex flex-col">
            <span class="text-xs text-neutral-400">
              {{ $t("pages.account.payments.escrow.seller_label") }}
            </span>

            <span class="text-sm">{{ item.sellerName }}</span>
          </div>

          <div class="flex flex-col">
            <span class="text-xs text-neutral-400">
              {{ $t("pages.account.payments.escrow.amount_label") }}
            </span>

            <span class="text-sm font-bold">${{ item.amount.toLocaleString() }}</span>
          </div>

          <div class="flex flex-col">
            <span class="text-xs text-neutral-400">
              {{ $t("pages.account.payments.escrow.created_label") }}
            </span>

            <span class="text-sm">{{ $d(new Date(item.createdAt), "short") }}</span>
          </div>

          <div class="flex flex-col">
            <span class="text-xs text-neutral-400">
              {{ $t("pages.account.payments.escrow.release_condition_label") }}
            </span>

            <span class="text-sm">{{ $t(item.releaseCondition) }}</span>
          </div>
        </div>

        <div v-if="canRelease(item) || canDispute(item)" class="mt-4 flex gap-2">
          <VcButton
            v-if="canRelease(item)"
            size="xs"
            variant="solid"
            color="success"
            @click="$emit('release', item.id)"
          >
            {{ $t("pages.account.payments.escrow.release_button") }}
          </VcButton>

          <VcButton
            v-if="canDispute(item)"
            size="xs"
            variant="outline"
            color="danger"
            @click="$emit('dispute', item.id)"
          >
            {{ $t("pages.account.payments.escrow.dispute_button") }}
          </VcButton>
        </div>
      </div>
    </template>

    <template #desktop-body>
      <tr v-for="tx in transactions" :key="tx.id" class="even:bg-neutral-50">
        <td class="overflow-hidden text-ellipsis p-5">
          <span class="font-bold">{{ tx.orderNumber }}</span>
        </td>

        <td class="overflow-hidden text-ellipsis p-5">
          <div class="flex flex-col">
            <span class="text-xs text-neutral-400">{{ $t("pages.account.payments.escrow.buyer_label") }}</span>

            <span class="font-semibold">{{ tx.buyerName }}</span>

            <span class="text-xs text-neutral-400">{{ $t("pages.account.payments.escrow.seller_label") }}</span>

            <span class="font-semibold">{{ tx.sellerName }}</span>
          </div>
        </td>

        <td class="overflow-hidden text-ellipsis p-5">
          <span class="font-black">${{ tx.amount.toLocaleString() }}</span>

          <span class="ms-1 text-xs text-neutral-400">{{ tx.currency }}</span>
        </td>

        <td class="p-5">
          <EscrowStatusBadge :status="tx.status" />
        </td>

        <td class="overflow-hidden text-ellipsis p-5">
          {{ $d(new Date(tx.createdAt), "short") }}
        </td>

        <td class="overflow-hidden text-ellipsis p-5 text-sm text-neutral-600">
          {{ $t(tx.releaseCondition) }}
        </td>

        <td class="p-5">
          <div class="flex gap-2">
            <VcButton v-if="canRelease(tx)" size="xs" variant="solid" color="success" @click="$emit('release', tx.id)">
              {{ $t("pages.account.payments.escrow.release_button") }}
            </VcButton>

            <VcButton v-if="canDispute(tx)" size="xs" variant="outline" color="danger" @click="$emit('dispute', tx.id)">
              {{ $t("pages.account.payments.escrow.dispute_button") }}
            </VcButton>
          </div>
        </td>
      </tr>
    </template>
  </VcTable>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import EscrowStatusBadge from "./escrow-status-badge.vue";
import type { EscrowTransactionType } from "@/shared/account";

interface IProps {
  transactions: EscrowTransactionType[];
  loading?: boolean;
}

defineEmits<{
  (event: "release", id: string): void;
  (event: "dispute", id: string): void;
}>();

defineProps<IProps>();

const { t } = useI18n();

const columns = computed<ITableColumn[]>(() => [
  { id: "orderNumber", title: t("pages.account.payments.escrow.order_number_label") },
  { id: "parties", title: t("pages.account.payments.escrow.parties_label") },
  { id: "amount", title: t("pages.account.payments.escrow.amount_label"), align: "right" },
  { id: "status", title: t("pages.account.payments.escrow.status_label") },
  { id: "createdAt", title: t("pages.account.payments.escrow.created_label"), sortable: true },
  { id: "releaseCondition", title: t("pages.account.payments.escrow.release_condition_label") },
  { id: "actions", title: t("pages.account.payments.escrow.actions_label") },
]);

function canRelease(tx: EscrowTransactionType): boolean {
  return tx.status === "funded" || tx.status === "in_progress";
}

function canDispute(tx: EscrowTransactionType): boolean {
  return tx.status === "funded" || tx.status === "in_progress";
}
</script>
