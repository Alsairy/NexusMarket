<template>
  <div class="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-additional-50 p-5 shadow-sm transition-shadow hover:shadow-md">
    <!-- Header -->
    <div class="flex items-start gap-3">
      <div
        class="flex size-10 flex-shrink-0 items-center justify-center rounded-lg text-lg"
        :class="domainIconClass"
      >
        {{ domainIcon }}
      </div>
      <div class="flex flex-col">
        <span class="font-bold text-neutral-900">{{ playbook.name }}</span>
        <VcBadge color="info" variant="outline" size="xs" rounded class="mt-1 self-start">
          {{ $t(`pages.admin.tenants.domain_${playbook.domain}`) }}
        </VcBadge>
      </div>
    </div>

    <!-- Description -->
    <p class="text-sm text-neutral-600 leading-relaxed">{{ playbook.description }}</p>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-3 text-sm">
      <div class="flex flex-col">
        <span class="text-xs text-neutral-400">
          {{ $t("pages.admin.tenants.default_categories_label") }}
        </span>
        <span class="font-bold">{{ playbook.defaultTaxonomy.categories.length }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-xs text-neutral-400">
          {{ $t("pages.admin.tenants.default_rules_label") }}
        </span>
        <span class="font-bold">{{ playbook.defaultRules.length }}</span>
      </div>
    </div>

    <!-- Recommended Modules -->
    <div class="flex flex-col gap-2">
      <span class="text-xs font-medium text-neutral-500">
        {{ $t("pages.admin.tenants.recommended_modules_label") }}
      </span>
      <div class="flex flex-wrap gap-1">
        <VcBadge
          v-for="module in playbook.recommendedModules"
          :key="module"
          color="primary"
          variant="solid-light"
          size="xs"
          rounded
        >
          {{ module }}
        </VcBadge>
      </div>
    </div>

    <!-- Create Tenant Button -->
    <div class="mt-auto pt-2">
      <VcButton class="w-full" @click="$emit('create', playbook.id)">
        {{ $t("pages.admin.tenants.create_tenant_button") }}
      </VcButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { DomainPlaybookType } from "../../types";

interface IProps {
  playbook: DomainPlaybookType;
}

const props = defineProps<IProps>();

defineEmits<{
  (event: "create", playbookId: string): void;
}>();

const domainIcon = computed(() => {
  switch (props.playbook.domain) {
    case "healthcare":
      return "\u2695";
    case "construction":
      return "\u{1F3D7}";
    case "food_beverage":
      return "\u{1F33E}";
    case "technology":
      return "\u{1F4BB}";
    case "agriculture":
      return "\u{1F331}";
    case "manufacturing":
      return "\u{1F3ED}";
    case "retail":
      return "\u{1F6D2}";
    case "energy":
      return "\u26A1";
    default:
      return "\u{1F4E6}";
  }
});

const domainIconClass = computed(() => {
  switch (props.playbook.domain) {
    case "healthcare":
      return "bg-cyan-100 text-cyan-700";
    case "construction":
      return "bg-amber-100 text-amber-700";
    case "food_beverage":
      return "bg-green-100 text-green-700";
    case "technology":
      return "bg-violet-100 text-violet-700";
    case "agriculture":
      return "bg-emerald-100 text-emerald-700";
    case "manufacturing":
      return "bg-slate-100 text-slate-700";
    case "retail":
      return "bg-pink-100 text-pink-700";
    case "energy":
      return "bg-red-100 text-red-700";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
});
</script>
