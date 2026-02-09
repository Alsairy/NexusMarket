<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-neutral-700">
        {{ $t("pages.admin.tenants.eligibility_rules_title") }}
      </span>
      <VcButton size="sm" variant="outline" @click="showAddForm = !showAddForm">
        <VcIcon name="plus" size="xs" />
        {{ $t("pages.admin.tenants.add_rule_button") }}
      </VcButton>
    </div>

    <!-- Add Rule Form -->
    <div
      v-if="showAddForm"
      class="rounded-lg border border-primary-200 bg-primary-50 p-4"
    >
      <div class="grid gap-3 md:grid-cols-2">
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-neutral-600">
            {{ $t("pages.admin.tenants.rule_name_label") }}
          </label>
          <input
            v-model="newRule.name"
            type="text"
            class="rounded-md border border-neutral-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-neutral-600">
            {{ $t("pages.admin.tenants.rule_type_label") }}
          </label>
          <select
            v-model="newRule.ruleType"
            class="rounded-md border border-neutral-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none"
          >
            <option value="license_required">{{ $t("pages.admin.tenants.rule_type_license") }}</option>
            <option value="certification_required">{{ $t("pages.admin.tenants.rule_type_certification") }}</option>
            <option value="region_restricted">{{ $t("pages.admin.tenants.rule_type_region") }}</option>
            <option value="minimum_rating">{{ $t("pages.admin.tenants.rule_type_rating") }}</option>
            <option value="custom">{{ $t("pages.admin.tenants.rule_type_custom") }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-1 md:col-span-2">
          <label class="text-xs font-medium text-neutral-600">
            {{ $t("pages.admin.tenants.rule_description_label") }}
          </label>
          <input
            v-model="newRule.description"
            type="text"
            class="rounded-md border border-neutral-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-neutral-600">
            {{ $t("pages.admin.tenants.rule_condition_label") }}
          </label>
          <input
            v-model="newRule.condition"
            type="text"
            class="rounded-md border border-neutral-300 px-3 py-1.5 font-mono text-xs focus:border-primary-500 focus:outline-none"
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-neutral-600">
              {{ $t("pages.admin.tenants.rule_action_label") }}
            </label>
            <select
              v-model="newRule.action"
              class="rounded-md border border-neutral-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none"
            >
              <option value="allow">{{ $t("pages.admin.tenants.action_allow") }}</option>
              <option value="block">{{ $t("pages.admin.tenants.action_block") }}</option>
              <option value="flag_review">{{ $t("pages.admin.tenants.action_flag_review") }}</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-neutral-600">
              {{ $t("pages.admin.tenants.rule_applies_to_label") }}
            </label>
            <select
              v-model="newRule.appliesTo"
              class="rounded-md border border-neutral-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none"
            >
              <option value="buyers">{{ $t("pages.admin.tenants.applies_buyers") }}</option>
              <option value="sellers">{{ $t("pages.admin.tenants.applies_sellers") }}</option>
              <option value="both">{{ $t("pages.admin.tenants.applies_both") }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="mt-3 flex justify-end gap-2">
        <VcButton size="sm" variant="outline" @click="showAddForm = false">
          {{ $t("pages.admin.tenants.cancel_button") }}
        </VcButton>
        <VcButton size="sm" @click="handleAddRule">
          {{ $t("pages.admin.tenants.add_rule_button") }}
        </VcButton>
      </div>
    </div>

    <!-- Rules Table -->
    <VcTable
      :columns="columns"
      :items="rules"
      :hide-default-footer="true"
      :description="$t('pages.admin.tenants.eligibility_rules_description')"
      mobile-breakpoint="lg"
    >
      <template #mobile-item="{ item }">
        <div class="grid grid-cols-2 gap-y-3 border-b border-neutral-200 p-5">
          <div class="col-span-2 flex items-center justify-between">
            <span class="font-bold">{{ item.name }}</span>
            <VcBadge :color="ruleTypeColor(item.ruleType)" variant="outline" size="xs" rounded>
              {{ $t(`pages.admin.tenants.rule_type_${item.ruleType}`) }}
            </VcBadge>
          </div>

          <div class="flex flex-col">
            <span class="text-xs text-neutral-400">
              {{ $t("pages.admin.tenants.rule_applies_to_label") }}
            </span>
            <span class="text-sm capitalize">{{ item.appliesTo }}</span>
          </div>

          <div class="flex flex-col items-end">
            <span class="text-xs text-neutral-400">
              {{ $t("pages.admin.tenants.rule_action_label") }}
            </span>
            <VcBadge :color="actionColor(item.action)" variant="solid-light" size="xs" rounded>
              {{ item.action }}
            </VcBadge>
          </div>

          <div class="col-span-2 flex items-center justify-between">
            <span class="text-xs text-neutral-500">{{ item.description }}</span>
            <button
              class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
              :class="item.enabled ? 'bg-primary-500' : 'bg-neutral-300'"
              @click="$emit('toggle', item.id)"
            >
              <span
                class="inline-block size-4 transform rounded-full bg-white shadow transition-transform duration-200"
                :class="item.enabled ? 'translate-x-4' : 'translate-x-0'"
              />
            </button>
          </div>
        </div>
      </template>

      <template #desktop-body>
        <tr
          v-for="item in rules"
          :key="item.id"
          class="even:bg-neutral-50"
        >
          <td class="px-4 py-3 font-medium">{{ item.name }}</td>
          <td class="px-4 py-3">
            <VcBadge :color="ruleTypeColor(item.ruleType)" variant="outline" size="xs" rounded>
              {{ $t(`pages.admin.tenants.rule_type_${item.ruleType}`) }}
            </VcBadge>
          </td>
          <td class="px-4 py-3 capitalize">{{ item.appliesTo }}</td>
          <td class="px-4 py-3 font-mono text-xs text-neutral-500">{{ item.condition }}</td>
          <td class="px-4 py-3">
            <VcBadge :color="actionColor(item.action)" variant="solid-light" size="xs" rounded>
              {{ item.action }}
            </VcBadge>
          </td>
          <td class="px-4 py-3">
            <button
              class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
              :class="item.enabled ? 'bg-primary-500' : 'bg-neutral-300'"
              @click="$emit('toggle', item.id)"
            >
              <span
                class="inline-block size-4 transform rounded-full bg-white shadow transition-transform duration-200"
                :class="item.enabled ? 'translate-x-4' : 'translate-x-0'"
              />
            </button>
          </td>
          <td class="px-4 py-3">
            <VcButton size="sm" variant="outline" color="danger" @click="$emit('delete', item.id)">
              <VcIcon name="delete-bin" size="xs" />
            </VcButton>
          </td>
        </tr>
      </template>
    </VcTable>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import type { EligibilityRuleType } from "../../types";

interface IProps {
  rules: EligibilityRuleType[];
}

defineProps<IProps>();

const emit = defineEmits<{
  (event: "add", rule: EligibilityRuleType): void;
  (event: "toggle", ruleId: string): void;
  (event: "delete", ruleId: string): void;
}>();

const { t } = useI18n();
const showAddForm = ref(false);

const newRule = reactive({
  name: "",
  description: "",
  ruleType: "custom" as EligibilityRuleType["ruleType"],
  condition: "",
  action: "block" as EligibilityRuleType["action"],
  appliesTo: "both" as EligibilityRuleType["appliesTo"],
});

const columns = computed<VcTableColumnType[]>(() => [
  { id: "name", title: t("pages.admin.tenants.rule_name_label") },
  { id: "type", title: t("pages.admin.tenants.rule_type_label") },
  { id: "appliesTo", title: t("pages.admin.tenants.rule_applies_to_label") },
  { id: "condition", title: t("pages.admin.tenants.rule_condition_label") },
  { id: "action", title: t("pages.admin.tenants.rule_action_label") },
  { id: "enabled", title: t("pages.admin.tenants.enabled_label") },
  { id: "actions", title: t("pages.admin.tenants.actions_label") },
]);

function ruleTypeColor(ruleType: EligibilityRuleType["ruleType"]): VcBadgeColorType {
  switch (ruleType) {
    case "license_required":
      return "primary";
    case "certification_required":
      return "info";
    case "region_restricted":
      return "warning";
    case "minimum_rating":
      return "accent";
    case "custom":
      return "neutral";
    default:
      return "neutral";
  }
}

function actionColor(action: EligibilityRuleType["action"]): VcBadgeColorType {
  switch (action) {
    case "allow":
      return "success";
    case "block":
      return "danger";
    case "flag_review":
      return "warning";
    default:
      return "neutral";
  }
}

function handleAddRule(): void {
  const rule: EligibilityRuleType = {
    id: `rule-new-${Date.now()}`,
    name: newRule.name,
    description: newRule.description,
    ruleType: newRule.ruleType,
    condition: newRule.condition,
    action: newRule.action,
    enabled: true,
    appliesTo: newRule.appliesTo,
  };
  emit("add", rule);
  showAddForm.value = false;
  newRule.name = "";
  newRule.description = "";
  newRule.ruleType = "custom";
  newRule.condition = "";
  newRule.action = "block";
  newRule.appliesTo = "both";
}
</script>
