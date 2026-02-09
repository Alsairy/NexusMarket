<template>
  <VcContainer>
    <div class="flex flex-col gap-6">
      <!-- Back Link -->
      <div>
        <VcButton variant="outline" :to="{ name: 'AdminTenants' }">
          <VcIcon name="arrow-left" size="xs" />
          {{ $t("pages.admin.tenants.back_to_list") }}
        </VcButton>
      </div>

      <!-- Loading State -->
      <div v-if="!selectedTenant" class="flex items-center justify-center py-20">
        <span class="text-neutral-400">{{ $t("pages.admin.tenants.tenant_not_found") }}</span>
      </div>

      <template v-else>
        <!-- Tenant Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <VcTypography tag="h1">
              {{ selectedTenant.name }}
            </VcTypography>
            <VcBadge color="info" variant="outline" size="sm" rounded>
              {{ $t(`pages.admin.tenants.domain_${selectedTenant.domain}`) }}
            </VcBadge>
            <TenantStatusBadge :status="selectedTenant.status" />
          </div>
        </div>

        <!-- Tabs -->
        <div class="border-b border-neutral-200">
          <nav class="flex gap-4">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="border-b-2 px-2 py-3 text-sm font-medium transition-colors"
              :class="activeTab === tab.id
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'"
              @click="activeTab = tab.id"
            >
              {{ $t(`pages.admin.tenants.tab_${tab.id}`) }}
            </button>
          </nav>
        </div>

        <!-- Tab Content: Overview -->
        <div v-if="activeTab === 'overview'">
          <VcWidget :title="$t('pages.admin.tenants.tab_overview')" size="lg">
            <TenantOverviewCard :tenant="selectedTenant" />
          </VcWidget>
        </div>

        <!-- Tab Content: Branding -->
        <div v-else-if="activeTab === 'branding'">
          <VcWidget :title="$t('pages.admin.tenants.tab_branding')" size="lg">
            <BrandingEditor
              :branding="selectedTenant.branding"
              :tenant-name="selectedTenant.name"
              :saving="loading"
              @save="handleSaveBranding"
            />
          </VcWidget>
        </div>

        <!-- Tab Content: Taxonomy -->
        <div v-else-if="activeTab === 'taxonomy'">
          <VcWidget :title="$t('pages.admin.tenants.tab_taxonomy')" size="lg">
            <TaxonomyEditor :taxonomy="selectedTenant.taxonomy" />
          </VcWidget>
        </div>

        <!-- Tab Content: Rules -->
        <div v-else-if="activeTab === 'rules'">
          <VcWidget :title="$t('pages.admin.tenants.tab_rules')" size="lg">
            <template #default-container>
              <EligibilityRulesTable
                :rules="selectedTenant.eligibilityRules"
                @add="handleAddRule"
                @toggle="handleToggleRule"
                @delete="handleDeleteRule"
              />
            </template>
          </VcWidget>
        </div>

        <!-- Tab Content: Notifications -->
        <div v-else-if="activeTab === 'notifications'">
          <VcWidget :title="$t('pages.admin.tenants.tab_notifications')" size="lg">
            <template #default-container>
              <NotificationTemplatesTable
                :templates="selectedTenant.notificationTemplates"
              />
            </template>
          </VcWidget>
        </div>

        <!-- Tab Content: Analytics -->
        <div v-else-if="activeTab === 'analytics'">
          <VcWidget :title="$t('pages.admin.tenants.tab_analytics')" size="lg">
            <div class="flex flex-col gap-6">
              <!-- Shared Analytics Toggle -->
              <div class="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
                <div class="flex flex-col">
                  <span class="font-medium text-neutral-900">
                    {{ $t("pages.admin.tenants.shared_analytics_label") }}
                  </span>
                  <span class="text-sm text-neutral-500">
                    {{ $t("pages.admin.tenants.shared_analytics_description") }}
                  </span>
                </div>
                <button
                  class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
                  :class="selectedTenant.analyticsConfig.sharedAnalytics ? 'bg-primary-500' : 'bg-neutral-300'"
                >
                  <span
                    class="inline-block size-5 transform rounded-full bg-white shadow transition-transform duration-200"
                    :class="selectedTenant.analyticsConfig.sharedAnalytics ? 'translate-x-5' : 'translate-x-0'"
                  />
                </button>
              </div>

              <!-- Custom Dashboard Toggle -->
              <div class="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
                <div class="flex flex-col">
                  <span class="font-medium text-neutral-900">
                    {{ $t("pages.admin.tenants.custom_dashboard_label") }}
                  </span>
                  <span class="text-sm text-neutral-500">
                    {{ $t("pages.admin.tenants.custom_dashboard_description") }}
                  </span>
                </div>
                <button
                  class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
                  :class="selectedTenant.analyticsConfig.customDashboard ? 'bg-primary-500' : 'bg-neutral-300'"
                >
                  <span
                    class="inline-block size-5 transform rounded-full bg-white shadow transition-transform duration-200"
                    :class="selectedTenant.analyticsConfig.customDashboard ? 'translate-x-5' : 'translate-x-0'"
                  />
                </button>
              </div>

              <!-- Export Toggle -->
              <div class="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
                <div class="flex flex-col">
                  <span class="font-medium text-neutral-900">
                    {{ $t("pages.admin.tenants.export_enabled_label") }}
                  </span>
                  <span class="text-sm text-neutral-500">
                    {{ $t("pages.admin.tenants.export_enabled_description") }}
                  </span>
                </div>
                <button
                  class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
                  :class="selectedTenant.analyticsConfig.exportEnabled ? 'bg-primary-500' : 'bg-neutral-300'"
                >
                  <span
                    class="inline-block size-5 transform rounded-full bg-white shadow transition-transform duration-200"
                    :class="selectedTenant.analyticsConfig.exportEnabled ? 'translate-x-5' : 'translate-x-0'"
                  />
                </button>
              </div>

              <!-- Retention Days Slider -->
              <div class="flex flex-col gap-3 rounded-lg border border-neutral-200 p-4">
                <div class="flex items-center justify-between">
                  <div class="flex flex-col">
                    <span class="font-medium text-neutral-900">
                      {{ $t("pages.admin.tenants.retention_days_label") }}
                    </span>
                    <span class="text-sm text-neutral-500">
                      {{ $t("pages.admin.tenants.retention_days_description") }}
                    </span>
                  </div>
                  <span class="text-lg font-bold text-primary-600">
                    {{ selectedTenant.analyticsConfig.retentionDays }}
                    {{ $t("pages.admin.tenants.days_unit") }}
                  </span>
                </div>
                <input
                  type="range"
                  :value="selectedTenant.analyticsConfig.retentionDays"
                  min="30"
                  max="730"
                  step="30"
                  class="w-full accent-primary-500"
                />
                <div class="flex justify-between text-xs text-neutral-400">
                  <span>30 {{ $t("pages.admin.tenants.days_unit") }}</span>
                  <span>365 {{ $t("pages.admin.tenants.days_unit") }}</span>
                  <span>730 {{ $t("pages.admin.tenants.days_unit") }}</span>
                </div>
              </div>
            </div>
          </VcWidget>
        </div>
      </template>
    </div>
  </VcContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { usePageHead } from "@/core/composables";
import { useTenantConfig } from "@/shared/admin/composables";
import {
  TenantStatusBadge,
  TenantOverviewCard,
  BrandingEditor,
  TaxonomyEditor,
  EligibilityRulesTable,
  NotificationTemplatesTable,
} from "@/shared/admin/components/tenants";
import type { TenantBrandingType, EligibilityRuleType } from "@/shared/admin/types";

const { t } = useI18n();
const route = useRoute();

usePageHead({
  title: t("pages.admin.tenants.detail_meta.title"),
});

const {
  loading,
  selectedTenant,
  selectTenant,
  updateTenantBranding,
  addEligibilityRule,
  toggleRule,
} = useTenantConfig();

const activeTab = ref("overview");

const tabs = [
  { id: "overview" },
  { id: "branding" },
  { id: "taxonomy" },
  { id: "rules" },
  { id: "notifications" },
  { id: "analytics" },
];

onMounted(() => {
  const tenantId = route.params.id as string;
  if (tenantId && (!selectedTenant.value || selectedTenant.value.id !== tenantId)) {
    selectTenant(tenantId);
  }
});

function handleSaveBranding(branding: TenantBrandingType): void {
  if (selectedTenant.value) {
    void updateTenantBranding(selectedTenant.value.id, branding);
  }
}

function handleAddRule(rule: EligibilityRuleType): void {
  if (selectedTenant.value) {
    void addEligibilityRule(selectedTenant.value.id, rule);
  }
}

function handleToggleRule(ruleId: string): void {
  if (selectedTenant.value) {
    void toggleRule(selectedTenant.value.id, ruleId);
  }
}

function handleDeleteRule(_ruleId: string): void {
  // Delete would be implemented with a similar pattern
}
</script>
