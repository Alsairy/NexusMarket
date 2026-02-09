<template>
  <div class="flex flex-col gap-5">
    <!-- Stacked horizontal bar -->
    <div class="flex h-8 w-full overflow-hidden rounded-lg">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="h-full transition-all"
        :style="{ width: `${item.percentage}%`, backgroundColor: item.color }"
        :title="`${$t(item.category)}: ${item.percentage}%`"
      ></div>
    </div>

    <!-- Legend list -->
    <div class="flex flex-col gap-3">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="flex items-center justify-between"
      >
        <div class="flex items-center gap-2">
          <span
            class="inline-block size-3 shrink-0 rounded-full"
            :style="{ backgroundColor: item.color }"
          ></span>
          <span class="text-sm text-neutral-700">{{ $t(item.category) }}</span>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-sm font-semibold text-neutral-950">${{ item.amount.toLocaleString() }}</span>
          <span class="w-10 text-right text-xs text-neutral-500">{{ item.percentage }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { SpendByCategoryType } from "@/shared/account";

interface IProps {
  data: SpendByCategoryType[];
}

defineProps<IProps>();

useI18n();
</script>
