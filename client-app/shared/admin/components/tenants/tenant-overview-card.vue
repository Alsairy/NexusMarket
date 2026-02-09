<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="flex flex-col gap-1">
        <span class="text-xl font-bold text-neutral-900">{{ tenant.name }}</span>
        <span class="text-sm text-neutral-500">{{ tenant.domainConfig.primaryDomain }}</span>
      </div>
      <div class="flex items-center gap-2">
        <VcBadge color="info" variant="outline" size="sm" rounded>
          {{ $t(`pages.admin.tenants.domain_${tenant.domain}`) }}
        </VcBadge>
        <TenantStatusBadge :status="tenant.status" />
      </div>
    </div>

    <!-- Key Stats -->
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.admin.tenants.users_label") }}
        </span>
        <span class="text-2xl font-black text-neutral-900">{{ tenant.userCount.toLocaleString() }}</span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.admin.tenants.products_label") }}
        </span>
        <span class="text-2xl font-black text-neutral-900">{{ tenant.productCount.toLocaleString() }}</span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.admin.tenants.monthly_gmv_label") }}
        </span>
        <span class="text-2xl font-black text-neutral-900">{{ formatCurrency(tenant.monthlyGmv) }}</span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-additional-50 p-4">
        <span class="text-xs font-medium text-neutral-500">
          {{ $t("pages.admin.tenants.rules_count_label") }}
        </span>
        <span class="text-2xl font-black text-neutral-900">{{ tenant.eligibilityRules.length }}</span>
      </div>
    </div>

    <!-- Branding Preview -->
    <div class="rounded-lg border border-neutral-200 p-4">
      <span class="mb-3 block text-sm font-medium text-neutral-700">
        {{ $t("pages.admin.tenants.branding_preview_label") }}
      </span>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div
            class="size-8 rounded-full border border-neutral-200"
            :style="{ backgroundColor: tenant.branding.primaryColor }"
            :title="$t('pages.admin.tenants.primary_color_label')"
          />
          <div
            class="size-8 rounded-full border border-neutral-200"
            :style="{ backgroundColor: tenant.branding.secondaryColor }"
            :title="$t('pages.admin.tenants.secondary_color_label')"
          />
          <div
            class="size-8 rounded-full border border-neutral-200"
            :style="{ backgroundColor: tenant.branding.accentColor }"
            :title="$t('pages.admin.tenants.accent_color_label')"
          />
        </div>
        <span class="text-sm text-neutral-500">{{ tenant.branding.fontFamily }}</span>
      </div>
    </div>

    <!-- Domain Info -->
    <div class="rounded-lg border border-neutral-200 p-4">
      <span class="mb-3 block text-sm font-medium text-neutral-700">
        {{ $t("pages.admin.tenants.domain_config_label") }}
      </span>
      <div class="flex flex-col gap-2 text-sm">
        <div class="flex items-center justify-between">
          <span class="text-neutral-500">{{ $t("pages.admin.tenants.primary_domain_label") }}</span>
          <span class="font-medium">{{ tenant.domainConfig.primaryDomain }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-neutral-500">{{ $t("pages.admin.tenants.custom_domains_label") }}</span>
          <span class="font-medium">{{ tenant.domainConfig.customDomains.length }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-neutral-500">{{ $t("pages.admin.tenants.ssl_label") }}</span>
          <VcBadge
            :color="tenant.domainConfig.sslEnabled ? 'success' : 'danger'"
            variant="solid-light"
            size="xs"
            rounded
          >
            {{ tenant.domainConfig.sslEnabled
              ? $t("pages.admin.tenants.ssl_enabled")
              : $t("pages.admin.tenants.ssl_disabled") }}
          </VcBadge>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TenantStatusBadge from "./tenant-status-badge.vue";
import type { TenantConfigType } from "../../types";

interface IProps {
  tenant: TenantConfigType;
}

defineProps<IProps>();

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
