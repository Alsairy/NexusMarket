<template>
  <div class="flex flex-col">
    <VcEmptyView
      v-if="!rfqs.length"
      :text="$t('pages.account.rfq.list.empty')"
      icon="outline-list"
    />

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-neutral-200 text-xs font-bold uppercase text-neutral-500">
            <th
              class="cursor-pointer px-4 py-3"
              @click="toggleSort('referenceNumber')"
            >
              <span class="flex items-center gap-1">
                {{ $t("pages.account.rfq.list.col_reference") }}
                <span v-if="sortField === 'referenceNumber'" class="text-primary-500">
                  {{ sortDirection === 'asc' ? '&#9650;' : '&#9660;' }}
                </span>
              </span>
            </th>
            <th class="px-4 py-3">{{ $t("pages.account.rfq.list.col_title") }}</th>
            <th class="px-4 py-3">{{ $t("pages.account.rfq.list.col_status") }}</th>
            <th
              class="cursor-pointer px-4 py-3"
              @click="toggleSort('deadline')"
            >
              <span class="flex items-center gap-1">
                {{ $t("pages.account.rfq.list.col_deadline") }}
                <span v-if="sortField === 'deadline'" class="text-primary-500">
                  {{ sortDirection === 'asc' ? '&#9650;' : '&#9660;' }}
                </span>
              </span>
            </th>
            <th class="px-4 py-3 text-center">{{ $t("pages.account.rfq.list.col_bids") }}</th>
            <th
              class="cursor-pointer px-4 py-3 text-right"
              @click="toggleSort('totalBudget')"
            >
              <span class="flex items-center justify-end gap-1">
                {{ $t("pages.account.rfq.list.col_budget") }}
                <span v-if="sortField === 'totalBudget'" class="text-primary-500">
                  {{ sortDirection === 'asc' ? '&#9650;' : '&#9660;' }}
                </span>
              </span>
            </th>
            <th class="px-4 py-3 text-center">{{ $t("pages.account.rfq.list.col_actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="rfq in sortedRfqs"
            :key="rfq.id"
            class="border-b border-neutral-100 transition-colors hover:bg-neutral-50"
          >
            <td class="px-4 py-3 font-mono text-xs font-bold text-primary-600">
              {{ rfq.referenceNumber }}
            </td>
            <td class="max-w-xs truncate px-4 py-3 font-semibold text-neutral-950">
              {{ rfq.title }}
            </td>
            <td class="px-4 py-3">
              <RfqStatusBadge :status="rfq.status" />
            </td>
            <td class="px-4 py-3 text-neutral-600">
              {{ $d(new Date(rfq.deadline), "short") }}
            </td>
            <td class="px-4 py-3 text-center">
              <span class="font-bold text-neutral-700">{{ rfq.receivedBids }}</span>
              <span class="text-neutral-400"> / {{ rfq.invitedSuppliers }}</span>
            </td>
            <td class="px-4 py-3 text-right font-semibold text-neutral-950">
              <template v-if="rfq.totalBudget">
                ${{ rfq.totalBudget.toLocaleString() }}
              </template>
              <span v-else class="text-neutral-400">&mdash;</span>
            </td>
            <td class="px-4 py-3 text-center">
              <VcButton
                size="xs"
                variant="outline"
                @click="$emit('view', rfq.id)"
              >
                {{ $t("pages.account.rfq.list.action_view") }}
              </VcButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import type { RfqType } from "@/shared/account";
import RfqStatusBadge from "./rfq-status-badge.vue";

interface IProps {
  rfqs: RfqType[];
}

const props = defineProps<IProps>();

defineEmits<{
  (event: "view", rfqId: string): void;
}>();

useI18n();

type SortFieldType = "referenceNumber" | "deadline" | "totalBudget";

const sortField = ref<SortFieldType>("deadline");
const sortDirection = ref<"asc" | "desc">("desc");

function toggleSort(field: SortFieldType): void {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }
}

const sortedRfqs = computed(() => {
  const items = [...props.rfqs];
  const dir = sortDirection.value === "asc" ? 1 : -1;

  return items.sort((a, b) => {
    switch (sortField.value) {
      case "referenceNumber":
        return dir * a.referenceNumber.localeCompare(b.referenceNumber);
      case "deadline":
        return dir * (new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
      case "totalBudget":
        return dir * ((a.totalBudget ?? 0) - (b.totalBudget ?? 0));
      default:
        return 0;
    }
  });
});
</script>
