<template>
  <div class="flex flex-col gap-3">
    <VcEmptyView
      v-if="!requirements.length"
      :text="$t('pages.account.rfq.requirements.empty')"
      icon="outline-list"
    />

    <div
      v-for="req in requirements"
      :key="req.id"
      class="flex items-start justify-between gap-4 rounded-lg border border-neutral-100 px-4 py-3"
    >
      <div class="flex min-w-0 flex-col gap-1.5">
        <div class="flex flex-wrap items-center gap-2">
          <VcBadge
            :color="categoryColor(req.category)"
            variant="outline"
            size="xs"
            rounded
            nowrap
          >
            {{ $t(`pages.account.rfq.requirements.category_${req.category}`) }}
          </VcBadge>

          <VcBadge
            v-if="req.mandatory"
            color="danger"
            variant="solid-light"
            size="xs"
            rounded
            nowrap
          >
            {{ $t("pages.account.rfq.requirements.mandatory_label") }}
          </VcBadge>
        </div>

        <span class="text-sm text-neutral-700">
          {{ req.description }}
        </span>
      </div>

      <!-- Weight indicator -->
      <div class="flex flex-shrink-0 flex-col items-end gap-1">
        <span class="text-xs font-bold text-neutral-500">
          {{ $t("pages.account.rfq.requirements.weight_label") }}
        </span>
        <div class="flex items-center gap-2">
          <div class="h-1.5 w-16 overflow-hidden rounded-full bg-neutral-100">
            <div
              class="h-full rounded-full bg-primary-500 transition-all"
              :style="{ width: `${req.weight}%` }"
            />
          </div>
          <span class="text-xs font-black text-neutral-700">{{ req.weight }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { RfqRequirementType } from "@/shared/account";

interface IProps {
  requirements: RfqRequirementType[];
}

defineProps<IProps>();

useI18n();

function categoryColor(category: RfqRequirementType["category"]): VcBadgeColorType {
  const colorMap: Record<RfqRequirementType["category"], VcBadgeColorType> = {
    technical: "info",
    commercial: "primary",
    compliance: "warning",
    delivery: "success",
  };
  return colorMap[category] ?? "neutral";
}
</script>
