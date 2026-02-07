<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-neutral-200 text-xs font-bold uppercase text-neutral-500">
          <th class="px-4 py-3">{{ $t("pages.account.ai_insights.catalog_table.type") }}</th>
          <th class="px-4 py-3">{{ $t("pages.account.ai_insights.catalog_table.product") }}</th>
          <th class="px-4 py-3">{{ $t("pages.account.ai_insights.catalog_table.related_product") }}</th>
          <th class="hidden px-4 py-3 md:table-cell">{{ $t("pages.account.ai_insights.catalog_table.description") }}</th>
          <th class="px-4 py-3 text-right">{{ $t("pages.account.ai_insights.catalog_table.confidence") }}</th>
          <th class="hidden px-4 py-3 lg:table-cell">{{ $t("pages.account.ai_insights.catalog_table.suggestion") }}</th>
          <th class="px-4 py-3 text-center">{{ $t("pages.account.ai_insights.catalog_table.status") }}</th>
          <th class="px-4 py-3 text-center">{{ $t("pages.account.ai_insights.catalog_table.actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="issue in issues"
          :key="issue.id"
          class="border-b border-neutral-100 transition-colors"
        >
          <td class="px-4 py-3">
            <VcBadge :color="typeColor(issue.type)" variant="solid-light" size="xs" rounded>
              {{ $t(`pages.account.ai_insights.catalog_types.${issue.type}`) }}
            </VcBadge>
          </td>
          <td class="px-4 py-3">
            <div class="flex flex-col">
              <span class="font-semibold text-neutral-950">{{ issue.productName }}</span>
              <span class="text-xs text-neutral-400">{{ issue.productId }}</span>
            </div>
          </td>
          <td class="px-4 py-3">
            <div v-if="issue.relatedProductName" class="flex flex-col">
              <span class="text-neutral-700">{{ issue.relatedProductName }}</span>
              <span class="text-xs text-neutral-400">{{ issue.relatedProductId }}</span>
            </div>
            <span v-else class="text-neutral-300">---</span>
          </td>
          <td class="hidden px-4 py-3 text-xs text-neutral-500 md:table-cell">
            {{ $t(issue.description) }}
          </td>
          <td class="px-4 py-3 text-right">
            <span class="font-semibold" :class="confidenceClass(issue.confidence)">
              {{ issue.confidence }}%
            </span>
          </td>
          <td class="hidden px-4 py-3 text-xs text-neutral-500 lg:table-cell">
            {{ $t(issue.suggestion) }}
          </td>
          <td class="px-4 py-3 text-center">
            <VcBadge :color="statusColor(issue.status)" variant="solid-light" size="xs" rounded>
              {{ $t(`pages.account.ai_insights.catalog_status.${issue.status}`) }}
            </VcBadge>
          </td>
          <td class="px-4 py-3 text-center">
            <div v-if="issue.status === 'pending'" class="flex items-center justify-center gap-1">
              <VcButton
                size="xs"
                variant="solid"
                color="success"
                @click="$emit('accept', issue.id)"
              >
                {{ $t("pages.account.ai_insights.catalog_table.accept") }}
              </VcButton>
              <VcButton
                size="xs"
                variant="outline"
                color="neutral"
                @click="$emit('dismiss', issue.id)"
              >
                {{ $t("pages.account.ai_insights.catalog_table.dismiss") }}
              </VcButton>
            </div>
            <span v-else class="text-xs text-neutral-400">---</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { CatalogNormalizationType } from "@/shared/account";

interface IProps {
  issues: CatalogNormalizationType[];
}

interface IEmits {
  (event: "accept", id: string): void;
  (event: "dismiss", id: string): void;
}

defineProps<IProps>();
defineEmits<IEmits>();

useI18n();

function typeColor(type: CatalogNormalizationType["type"]): VcBadgeColorType {
  const colorMap: Record<CatalogNormalizationType["type"], VcBadgeColorType> = {
    duplicate: "danger",
    mismatch: "warning",
    incomplete: "info",
    substitution: "primary",
  };
  return colorMap[type];
}

function statusColor(status: CatalogNormalizationType["status"]): VcBadgeColorType {
  const colorMap: Record<CatalogNormalizationType["status"], VcBadgeColorType> = {
    pending: "warning",
    accepted: "success",
    dismissed: "neutral",
  };
  return colorMap[status];
}

function confidenceClass(confidence: number): string {
  if (confidence >= 90) {
    return "text-success-600";
  }
  if (confidence >= 75) {
    return "text-primary-600";
  }
  return "text-warning-600";
}
</script>
