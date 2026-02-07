<template>
  <VcContainer>
    <div class="flex flex-col gap-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <VcTypography tag="h1">
          {{ $t("pages.admin.tenants.title") }}
        </VcTypography>

        <VcButton :to="{ name: 'AdminPlaybooks' }">
          <VcIcon name="plus" size="xs" />
          {{ $t("pages.admin.tenants.create_tenant_button") }}
        </VcButton>
      </div>

      <!-- KPI Row -->
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
          <span class="text-xs font-medium text-neutral-500">
            {{ $t("pages.admin.tenants.kpi_total_tenants") }}
          </span>
          <span class="text-2xl font-black text-neutral-900">{{ totalTenants }}</span>
        </div>

        <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
          <span class="text-xs font-medium text-neutral-500">
            {{ $t("pages.admin.tenants.kpi_active_tenants") }}
          </span>
          <span class="text-2xl font-black text-success-600">{{ activeTenants }}</span>
        </div>

        <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
          <span class="text-xs font-medium text-neutral-500">
            {{ $t("pages.admin.tenants.kpi_total_users") }}
          </span>
          <span class="text-2xl font-black text-neutral-900">{{ totalUsers.toLocaleString() }}</span>
        </div>

        <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4 shadow-sm">
          <span class="text-xs font-medium text-neutral-500">
            {{ $t("pages.admin.tenants.kpi_platform_gmv") }}
          </span>
          <span class="text-2xl font-black text-neutral-900">{{ formatCurrency(platformGmv) }}</span>
        </div>
      </div>

      <!-- Tenant List -->
      <VcWidget :title="$t('pages.admin.tenants.all_tenants_title')" size="lg">
        <template #default-container>
          <TenantListTable
            :tenants="tenants"
            @select="handleSelectTenant"
          />
        </template>
      </VcWidget>
    </div>
  </VcContainer>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { usePageHead } from "@/core/composables";
import { useTenantConfig } from "@/shared/admin/composables";
import { TenantListTable } from "@/shared/admin/components/tenants";

const { t } = useI18n();
const router = useRouter();

usePageHead({
  title: t("pages.admin.tenants.meta.title"),
});

const {
  tenants,
  totalTenants,
  activeTenants,
  totalUsers,
  platformGmv,
  selectTenant,
} = useTenantConfig();

function handleSelectTenant(id: string): void {
  selectTenant(id);
  void router.push({ name: "AdminTenantDetail", params: { id } });
}

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toLocaleString()}`;
}
</script>
