<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="(score, index) in scores"
      :key="index"
      class="flex flex-col gap-1.5"
    >
      <div class="flex items-center justify-between">
        <span class="text-sm font-semibold text-neutral-700">
          {{ $t(score.category) }}
        </span>

        <div class="flex items-center gap-2">
          <span class="text-sm font-black text-neutral-950">{{ score.score }}</span>
          <span class="text-xs text-neutral-400">/100</span>
          <span class="text-xs" :class="trendClass(score.trend)">
            <span v-if="score.trend === 'up'">&#9650;</span>
            <span v-else-if="score.trend === 'down'">&#9660;</span>
            <span v-else>&#9654;</span>
          </span>
        </div>
      </div>

      <!-- Progress bar with benchmark -->
      <div class="relative h-3 w-full rounded-full bg-neutral-100">
        <!-- Score bar -->
        <div
          class="absolute inset-y-0 left-0 rounded-full bg-primary-500 transition-all"
          :style="{ width: `${score.score}%` }"
        ></div>

        <!-- Benchmark marker -->
        <div
          class="absolute top-[-2px] h-[calc(100%+4px)] w-0.5 rounded bg-neutral-900"
          :style="{ left: `${score.benchmark}%` }"
          :title="`${$t('pages.account.analytics.performance.benchmark')}: ${score.benchmark}`"
        ></div>
      </div>

      <div class="flex items-center justify-between text-xs text-neutral-400">
        <span>0</span>
        <span>
          {{ $t("pages.account.analytics.performance.benchmark") }}: {{ score.benchmark }}
        </span>
        <span>100</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { PerformanceScoreType } from "@/shared/account";

interface IProps {
  scores: PerformanceScoreType[];
}

defineProps<IProps>();

useI18n();

function trendClass(trend: "up" | "down" | "stable"): string {
  switch (trend) {
    case "up":
      return "text-success-600";
    case "down":
      return "text-danger-600";
    case "stable":
    default:
      return "text-neutral-500";
  }
}
</script>
