<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <VcTypography tag="h1">
        {{ $t("pages.account.licenses.title") }}
      </VcTypography>

      <VcButton prepend-icon="plus" size="sm" variant="outline" @click="showUploadDialog = !showUploadDialog">
        {{ $t("pages.account.licenses.add_license_button") }}
      </VcButton>
    </div>

    <!-- Compliance Summary KPI Cards -->
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <!-- Overall Score -->
      <VcWidget size="sm">
        <div class="flex flex-col items-center gap-1 py-2">
          <span
            class="text-3xl font-black"
            :class="complianceSummary.overallScore >= 80 ? 'text-success-600' : complianceSummary.overallScore >= 50 ? 'text-warning-600' : 'text-danger-600'"
          >
            {{ complianceSummary.overallScore }}%
          </span>
          <span class="text-xs font-bold text-neutral-500">
            {{ $t("pages.account.licenses.kpi_overall_score") }}
          </span>
        </div>
      </VcWidget>

      <!-- Active Licenses -->
      <VcWidget size="sm">
        <div class="flex flex-col items-center gap-1 py-2">
          <span class="text-3xl font-black text-success-600">
            {{ complianceSummary.activeLicenses }}
          </span>
          <span class="text-xs font-bold text-neutral-500">
            {{ $t("pages.account.licenses.kpi_active_licenses") }}
          </span>
        </div>
      </VcWidget>

      <!-- Expiring Soon -->
      <VcWidget size="sm">
        <div class="flex flex-col items-center gap-1 py-2">
          <span
            class="text-3xl font-black"
            :class="complianceSummary.expiringLicenses > 0 ? 'text-warning-600' : 'text-neutral-400'"
          >
            {{ complianceSummary.expiringLicenses }}
          </span>
          <span class="text-xs font-bold text-neutral-500">
            {{ $t("pages.account.licenses.kpi_expiring_soon") }}
          </span>
        </div>
      </VcWidget>

      <!-- Checks Passed -->
      <VcWidget size="sm">
        <div class="flex flex-col items-center gap-1 py-2">
          <span class="text-3xl font-black text-info-600">
            {{ complianceSummary.passed }}/{{ complianceSummary.totalChecks }}
          </span>
          <span class="text-xs font-bold text-neutral-500">
            {{ $t("pages.account.licenses.kpi_checks_passed") }}
          </span>
        </div>
      </VcWidget>
    </div>

    <!-- Licenses Table -->
    <VcWidget :title="$t('pages.account.licenses.licenses_widget_title')" size="lg">
      <template #default-container>
        <VcTable
          :loading="loading"
          :columns="columns"
          :items="licenses"
          :description="$t('pages.account.licenses.table_description')"
        >
          <template #mobile-item="{ item }">
            <div class="border-b border-neutral-200 p-6">
              <div class="mb-3 flex items-start justify-between">
                <div>
                  <span class="font-black">{{ item.name }}</span>
                  <div class="mt-0.5 text-sm text-neutral-500">{{ item.licenseNumber }}</div>
                </div>
                <VcBadge
                  :color="getStatusColor(item.status)"
                  variant="solid-light"
                  size="sm"
                  rounded
                >
                  {{ $t(`pages.account.licenses.status_${item.status}`) }}
                </VcBadge>
              </div>

              <div class="grid grid-cols-2 gap-y-3">
                <div class="flex flex-col">
                  <span class="text-xs text-neutral-400">
                    {{ $t("pages.account.licenses.type_label") }}
                  </span>
                  <span class="text-sm">{{ item.type }}</span>
                </div>

                <div class="flex flex-col">
                  <span class="text-xs text-neutral-400">
                    {{ $t("pages.account.licenses.issuing_authority_label") }}
                  </span>
                  <span class="text-sm">{{ item.issuingAuthority }}</span>
                </div>

                <div class="flex flex-col">
                  <span class="text-xs text-neutral-400">
                    {{ $t("pages.account.licenses.expiry_date_label") }}
                  </span>
                  <span class="text-sm">{{ $d(new Date(item.expiryDate), "short") }}</span>
                </div>
              </div>
            </div>
          </template>

          <template #desktop-body>
            <tr v-for="license in licenses" :key="license.id" class="even:bg-neutral-50">
              <td class="overflow-hidden text-ellipsis p-5">
                <span class="font-bold">{{ license.name }}</span>
              </td>

              <td class="overflow-hidden text-ellipsis p-5">
                {{ license.licenseNumber }}
              </td>

              <td class="overflow-hidden text-ellipsis p-5">
                {{ license.type }}
              </td>

              <td class="overflow-hidden text-ellipsis p-5">
                {{ license.issuingAuthority }}
              </td>

              <td class="overflow-hidden text-ellipsis p-5">
                {{ $d(new Date(license.expiryDate), "short") }}
              </td>

              <td class="p-5">
                <VcBadge
                  :color="getStatusColor(license.status)"
                  variant="solid-light"
                  size="sm"
                  rounded
                >
                  {{ $t(`pages.account.licenses.status_${license.status}`) }}
                </VcBadge>
              </td>
            </tr>
          </template>
        </VcTable>
      </template>
    </VcWidget>

    <!-- Compliance Checks -->
    <VcWidget :title="$t('pages.account.licenses.compliance_checks_title')" size="lg">
      <div v-if="loading" class="flex items-center justify-center py-10">
        <VcLoaderOverlay :visible="true" fixed-spinner />
      </div>

      <VcEmptyView
        v-else-if="!complianceChecks.length"
        :text="$t('pages.account.licenses.no_compliance_checks')"
        icon="outline-list"
      />

      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="check in complianceChecks"
          :key="check.id"
          class="flex flex-col gap-3 rounded-lg border border-neutral-200 p-4"
        >
          <div class="flex items-start justify-between gap-2">
            <span class="text-sm font-bold leading-tight">{{ check.name }}</span>
            <VcBadge
              :color="getCheckStatusColor(check.status)"
              variant="solid-light"
              size="xs"
              rounded
              nowrap
            >
              {{ $t(`pages.account.licenses.check_status_${check.status}`) }}
            </VcBadge>
          </div>

          <VcBadge color="neutral" variant="outline" size="xs" rounded class="self-start">
            {{ check.category }}
          </VcBadge>

          <p v-if="check.description" class="text-xs leading-relaxed text-neutral-500">
            {{ check.description }}
          </p>

          <div class="mt-auto flex flex-wrap gap-x-4 gap-y-1 border-t border-neutral-100 pt-3 text-xs text-neutral-400">
            <span v-if="check.lastChecked">
              {{ $t("pages.account.licenses.last_checked_label") }}:
              {{ $d(new Date(check.lastChecked), "short") }}
            </span>
            <span v-if="check.nextDue">
              {{ $t("pages.account.licenses.next_due_label") }}:
              {{ $d(new Date(check.nextDue), "short") }}
            </span>
          </div>
        </div>
      </div>
    </VcWidget>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { usePageHead } from "@/core/composables";
import { useLicensing } from "@/shared/account/composables/useLicensing";
import type { LicenseStatusType } from "@/shared/account";

const { t } = useI18n();

usePageHead({
  title: computed(() => t("pages.account.licenses.meta.title")),
});

const { loading, licenses, complianceChecks, complianceSummary, fetchLicenses, fetchComplianceChecks } = useLicensing();

const showUploadDialog = ref(false);

onMounted(async () => {
  await Promise.all([fetchLicenses(), fetchComplianceChecks()]);
});

const columns = computed<ITableColumn[]>(() => [
  { id: "name", title: t("pages.account.licenses.name_label") },
  { id: "licenseNumber", title: t("pages.account.licenses.license_number_label") },
  { id: "type", title: t("pages.account.licenses.type_label") },
  { id: "issuingAuthority", title: t("pages.account.licenses.issuing_authority_label") },
  { id: "expiryDate", title: t("pages.account.licenses.expiry_date_label"), sortable: true },
  { id: "status", title: t("pages.account.licenses.status_label") },
]);

function getStatusColor(status: LicenseStatusType): VcBadgeColorType {
  const colorMap: Record<LicenseStatusType, VcBadgeColorType> = {
    active: "success",
    expired: "danger",
    pending: "warning",
    expiring_soon: "warning",
    revoked: "danger",
  };
  return colorMap[status] ?? "neutral";
}

function getCheckStatusColor(status: string): VcBadgeColorType {
  const colorMap: Record<string, VcBadgeColorType> = {
    passed: "success",
    failed: "danger",
    pending: "warning",
    not_applicable: "neutral",
  };
  return colorMap[status] ?? "neutral";
}
</script>
