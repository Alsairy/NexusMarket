<template>
  <VcWidget :title="$t('pages.account.contracts.contracts_table_title')" size="lg">
    <template #default-container>
      <VcTable
        :loading="loading"
        :columns="columns"
        :items="contracts"
        :description="$t('pages.account.contracts.table_description')"
      >
        <template #mobile-item="{ item }">
          <div class="border-b border-neutral-200 p-6">
            <div class="mb-3 flex items-start justify-between">
              <div>
                <span class="font-black">{{ item.title }}</span>
                <div class="mt-0.5 text-sm text-neutral-500">{{ item.contractNumber }}</div>
              </div>
              <ContractStatusBadge :status="item.status" />
            </div>

            <div class="grid grid-cols-2 gap-y-3">
              <div class="flex flex-col">
                <span class="text-xs text-neutral-400">
                  {{ $t("pages.account.contracts.supplier_label") }}
                </span>
                <span class="text-sm">{{ item.supplierName }}</span>
              </div>

              <div class="flex flex-col">
                <span class="text-xs text-neutral-400">
                  {{ $t("pages.account.contracts.period_label") }}
                </span>
                <span class="text-sm">
                  {{ $d(new Date(item.startDate), "short") }} - {{ $d(new Date(item.endDate), "short") }}
                </span>
              </div>

              <div class="col-span-2 flex flex-col gap-1">
                <span class="text-xs text-neutral-400">
                  {{ $t("pages.account.contracts.value_consumed_label") }}
                </span>
                <div class="flex items-center gap-2">
                  <div class="h-2 grow overflow-hidden rounded-full bg-neutral-100">
                    <div
                      class="h-full rounded-full bg-primary-500 transition-all"
                      :style="{ width: `${getConsumptionPercent(item)}%` }"
                    />
                  </div>
                  <span class="shrink-0 text-xs font-bold text-neutral-600">
                    {{ getConsumptionPercent(item) }}%
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-3 flex justify-end">
              <VcButton size="xs" variant="outline" @click="$emit('view', item)">
                {{ $t("pages.account.contracts.view_details_button") }}
              </VcButton>
            </div>
          </div>
        </template>

        <template #desktop-body>
          <tr v-for="contract in contracts" :key="contract.id" class="even:bg-neutral-50">
            <td class="overflow-hidden text-ellipsis p-5">
              <span class="font-bold">{{ contract.contractNumber }}</span>
            </td>

            <td class="overflow-hidden text-ellipsis p-5">
              {{ contract.title }}
            </td>

            <td class="overflow-hidden text-ellipsis p-5">
              {{ contract.supplierName }}
            </td>

            <td class="p-5">
              <ContractStatusBadge :status="contract.status" />
            </td>

            <td class="overflow-hidden text-ellipsis p-5 text-sm">
              {{ $d(new Date(contract.startDate), "short") }} - {{ $d(new Date(contract.endDate), "short") }}
            </td>

            <td class="p-5">
              <div class="flex items-center gap-2">
                <div class="h-2 w-24 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    class="h-full rounded-full bg-primary-500 transition-all"
                    :style="{ width: `${getConsumptionPercent(contract)}%` }"
                  />
                </div>
                <span class="text-xs font-bold text-neutral-600">
                  {{ formatCurrency(contract.consumedValue) }} / {{ formatCurrency(contract.totalValue) }}
                </span>
              </div>
            </td>

            <td class="p-5">
              <VcButton size="xs" variant="outline" @click="$emit('view', contract)">
                {{ $t("pages.account.contracts.view_details_button") }}
              </VcButton>
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
import type { FrameworkContractType } from "@/shared/account";
import ContractStatusBadge from "./contract-status-badge.vue";

interface IProps {
  contracts: FrameworkContractType[];
  loading?: boolean;
}

defineProps<IProps>();

defineEmits<{
  (event: "view", contract: FrameworkContractType): void;
}>();

const { t } = useI18n();

const columns = computed<ITableColumn[]>(() => [
  { id: "contractNumber", title: t("pages.account.contracts.contract_number_label") },
  { id: "title", title: t("pages.account.contracts.title_label") },
  { id: "supplier", title: t("pages.account.contracts.supplier_label") },
  { id: "status", title: t("pages.account.contracts.status_label") },
  { id: "period", title: t("pages.account.contracts.period_label") },
  { id: "value", title: t("pages.account.contracts.value_consumed_label") },
  { id: "actions", title: t("pages.account.contracts.actions_label") },
]);

function getConsumptionPercent(contract: FrameworkContractType): number {
  if (contract.totalValue === 0) {
    return 0;
  }
  return Math.round((contract.consumedValue / contract.totalValue) * 100);
}

function formatCurrency(value: number): string {
  return `$${value.toLocaleString()}`;
}
</script>
