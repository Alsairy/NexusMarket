<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <VcTypography tag="h1">
      {{ $t("pages.account.compliance.title") }}
    </VcTypography>

    <!-- Overall Compliance Score & License Overview -->
    <div class="flex flex-col gap-5 lg:flex-row">
      <!-- Compliance Score Widget -->
      <VcWidget :title="$t('pages.account.compliance.score_widget_title')" class="lg:w-0 lg:grow">
        <div class="flex items-center justify-center py-6">
          <div class="relative flex size-40 items-center justify-center">
            <!-- Circular score display using SVG -->
            <svg class="absolute inset-0 -rotate-90" viewBox="0 0 160 160">
              <!-- Background circle -->
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                stroke-width="12"
                class="text-neutral-100"
              />
              <!-- Score arc -->
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                :stroke="scoreStrokeColor"
                stroke-width="12"
                stroke-linecap="round"
                :stroke-dasharray="scoreDashArray"
                :stroke-dashoffset="scoreDashOffset"
                class="transition-all duration-700 ease-out"
              />
            </svg>
            <div class="flex flex-col items-center">
              <span
                class="text-4xl font-black"
                :class="scoreTextClass"
              >
                {{ complianceSummary.overallScore }}
              </span>
              <span class="text-xs font-bold text-neutral-400">
                {{ $t("pages.account.compliance.out_of_100") }}
              </span>
            </div>
          </div>
        </div>

        <!-- Score legend -->
        <div class="flex flex-wrap justify-center gap-4 border-t border-neutral-100 pt-4">
          <div class="flex items-center gap-1.5">
            <VcBadge color="success" size="xs" />
            <span class="text-xs text-neutral-600">
              {{ $t("pages.account.compliance.passed_label") }} ({{ complianceSummary.passed }})
            </span>
          </div>
          <div class="flex items-center gap-1.5">
            <VcBadge color="danger" size="xs" />
            <span class="text-xs text-neutral-600">
              {{ $t("pages.account.compliance.failed_label") }} ({{ complianceSummary.failed }})
            </span>
          </div>
          <div class="flex items-center gap-1.5">
            <VcBadge color="warning" size="xs" />
            <span class="text-xs text-neutral-600">
              {{ $t("pages.account.compliance.pending_label") }} ({{ complianceSummary.pending }})
            </span>
          </div>
        </div>
      </VcWidget>

      <!-- License Overview Widget -->
      <VcWidget :title="$t('pages.account.compliance.license_overview_title')" class="lg:w-0 lg:grow">
        <div class="flex flex-col gap-4">
          <!-- Active -->
          <div class="flex items-center justify-between rounded-lg bg-success-50 px-4 py-3">
            <div class="flex items-center gap-3">
              <VcBadge color="success" variant="solid" size="sm" rounded square>
                <VcIcon name="apply" size="xs" />
              </VcBadge>
              <span class="text-sm font-bold text-neutral-700">
                {{ $t("pages.account.compliance.active_licenses_label") }}
              </span>
            </div>
            <span class="text-xl font-black text-success-700">
              {{ complianceSummary.activeLicenses }}
            </span>
          </div>

          <!-- Expiring Soon -->
          <div class="flex items-center justify-between rounded-lg bg-warning-50 px-4 py-3">
            <div class="flex items-center gap-3">
              <VcBadge color="warning" variant="solid" size="sm" rounded square>
                <VcIcon name="warning" size="xs" />
              </VcBadge>
              <span class="text-sm font-bold text-neutral-700">
                {{ $t("pages.account.compliance.expiring_licenses_label") }}
              </span>
            </div>
            <span class="text-xl font-black text-warning-700">
              {{ complianceSummary.expiringLicenses }}
            </span>
          </div>

          <!-- Expired -->
          <div class="flex items-center justify-between rounded-lg bg-danger-50 px-4 py-3">
            <div class="flex items-center gap-3">
              <VcBadge color="danger" variant="solid" size="sm" rounded square>
                <VcIcon name="delete-x" size="xs" />
              </VcBadge>
              <span class="text-sm font-bold text-neutral-700">
                {{ $t("pages.account.compliance.expired_licenses_label") }}
              </span>
            </div>
            <span class="text-xl font-black text-danger-700">
              {{ complianceSummary.expiredLicenses }}
            </span>
          </div>

          <!-- Pending -->
          <div class="flex items-center justify-between rounded-lg bg-neutral-50 px-4 py-3">
            <div class="flex items-center gap-3">
              <VcBadge color="neutral" variant="solid" size="sm" rounded square>
                <VcIcon name="clock" size="xs" />
              </VcBadge>
              <span class="text-sm font-bold text-neutral-700">
                {{ $t("pages.account.compliance.pending_licenses_label") }}
              </span>
            </div>
            <span class="text-xl font-black text-neutral-600">
              {{ pendingLicenseCount }}
            </span>
          </div>
        </div>
      </VcWidget>
    </div>

    <!-- Compliance Checks by Category -->
    <VcWidget :title="$t('pages.account.compliance.checks_by_category_title')" size="lg">
      <VcEmptyView
        v-if="!loading && !complianceChecks.length"
        :text="$t('pages.account.compliance.no_compliance_checks')"
        icon="outline-list"
      />

      <div v-else class="flex flex-col gap-6">
        <div v-for="category in complianceCategories" :key="category.name" class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-black text-neutral-700">{{ category.name }}</span>
            <VcBadge
              :color="category.allPassed ? 'success' : category.hasFailed ? 'danger' : 'warning'"
              variant="solid-light"
              size="xs"
              rounded
            >
              {{ category.passedCount }}/{{ category.totalCount }}
              {{ $t("pages.account.compliance.passed_suffix") }}
            </VcBadge>
          </div>

          <div class="flex flex-col gap-2">
            <div
              v-for="check in category.checks"
              :key="check.id"
              class="flex items-center justify-between rounded border border-neutral-100 px-4 py-3"
            >
              <div class="flex items-center gap-3">
                <VcBadge
                  :color="getCheckStatusColor(check.status)"
                  size="xs"
                />
                <div class="flex flex-col">
                  <span class="text-sm font-bold">{{ check.name }}</span>
                  <span v-if="check.description" class="text-xs text-neutral-400">
                    {{ check.description }}
                  </span>
                </div>
              </div>

              <div class="hidden flex-shrink-0 flex-col items-end gap-0.5 text-xs text-neutral-400 sm:flex">
                <span v-if="check.lastChecked">
                  {{ $t("pages.account.compliance.last_checked_label") }}:
                  {{ $d(new Date(check.lastChecked), "short") }}
                </span>
                <span v-if="check.nextDue">
                  {{ $t("pages.account.compliance.next_due_label") }}:
                  {{ $d(new Date(check.nextDue), "short") }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VcWidget>

    <!-- Evidence Document Vault -->
    <VcWidget :title="$t('pages.account.compliance.document_vault_title')" size="lg">
      <VcEmptyView
        v-if="!loading && !documents.length"
        :text="$t('pages.account.compliance.no_documents')"
        icon="document"
      />

      <template v-else>
        <div class="flex flex-col divide-y divide-neutral-100">
          <div
            v-for="doc in documents"
            :key="doc.id"
            class="flex items-center justify-between gap-4 px-2 py-3"
          >
            <div class="flex min-w-0 items-center gap-3">
              <div class="flex size-10 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-100">
                <VcIcon name="document" size="sm" class="text-neutral-500" />
              </div>
              <div class="flex min-w-0 flex-col">
                <span class="truncate text-sm font-bold">{{ doc.name }}</span>
                <span class="text-xs text-neutral-400">
                  {{ doc.fileName }} &middot; {{ formatFileSize(doc.fileSize) }} &middot;
                  {{ $d(new Date(doc.uploadedAt), "short") }}
                </span>
              </div>
            </div>

            <div class="flex flex-shrink-0 items-center gap-3">
              <VcBadge
                :color="getDocStatusColor(doc.status)"
                variant="solid-light"
                size="xs"
                rounded
              >
                {{ $t(`pages.account.compliance.doc_status_${doc.status}`) }}
              </VcBadge>

              <VcBadge color="neutral" variant="outline" size="xs" rounded>
                {{ doc.category }}
              </VcBadge>
            </div>
          </div>
        </div>
      </template>
    </VcWidget>

    <!-- Expiring Items Alerts -->
    <VcWidget v-if="expiringItems.length" :title="$t('pages.account.compliance.expiring_alerts_title')" size="lg">
      <div class="flex flex-col gap-3">
        <div
          v-for="item in expiringItems"
          :key="item.id"
          class="flex items-center justify-between rounded-lg border border-warning-200 bg-warning-50 px-4 py-3"
        >
          <div class="flex items-center gap-3">
            <VcIcon name="warning" size="sm" class="flex-shrink-0 text-warning-500" />
            <div class="flex flex-col">
              <span class="text-sm font-bold text-neutral-700">{{ item.name }}</span>
              <span class="text-xs text-neutral-500">
                {{ item.licenseNumber }} &middot; {{ item.issuingAuthority }}
              </span>
            </div>
          </div>

          <div class="flex flex-shrink-0 flex-col items-end">
            <span class="text-xs font-bold text-warning-700">
              {{ $t("pages.account.compliance.expires_label") }}
            </span>
            <span class="text-sm font-black text-warning-700">
              {{ $d(new Date(item.expiryDate), "short") }}
            </span>
          </div>
        </div>
      </div>
    </VcWidget>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { usePageHead } from "@/core/composables";
import { useLicensing } from "@/shared/account/composables/useLicensing";
import type { ComplianceCheckType } from "@/shared/account";

const { t } = useI18n();

usePageHead({
  title: computed(() => t("pages.account.compliance.meta.title")),
});

const { loading, licenses, complianceChecks, complianceSummary, documents, fetchLicenses, fetchComplianceChecks } =
  useLicensing();

onMounted(async () => {
  await Promise.all([fetchLicenses(), fetchComplianceChecks()]);
});

// Circular score display calculations
const circumference = 2 * Math.PI * 70; // r = 70
const scoreDashArray = `${circumference}`;
const scoreDashOffset = computed(() => {
  const offset = circumference - (complianceSummary.value.overallScore / 100) * circumference;
  return `${offset}`;
});

const scoreStrokeColor = computed(() => {
  const score = complianceSummary.value.overallScore;
  if (score >= 80) {
    return "var(--color-success-500)";
  }
  if (score >= 50) {
    return "var(--color-warning-500)";
  }
  return "var(--color-danger-500)";
});

const scoreTextClass = computed(() => {
  const score = complianceSummary.value.overallScore;
  if (score >= 80) {
    return "text-success-600";
  }
  if (score >= 50) {
    return "text-warning-600";
  }
  return "text-danger-600";
});

// Pending licenses count
const pendingLicenseCount = computed(() => licenses.value.filter((l) => l.status === "pending").length);

// Group compliance checks by category
const complianceCategories = computed(() => {
  const categoryMap = new Map<string, ComplianceCheckType[]>();

  for (const check of complianceChecks.value) {
    const existing = categoryMap.get(check.category) ?? [];
    existing.push(check);
    categoryMap.set(check.category, existing);
  }

  return Array.from(categoryMap.entries()).map(([name, checks]) => {
    const applicable = checks.filter((c) => c.status !== "not_applicable");
    const passedCount = checks.filter((c) => c.status === "passed").length;
    const totalCount = applicable.length;
    const allPassed = applicable.length > 0 && applicable.every((c) => c.status === "passed");
    const hasFailed = checks.some((c) => c.status === "failed");

    return { name, checks, passedCount, totalCount, allPassed, hasFailed };
  });
});

// Expiring items (expired + expiring_soon)
const expiringItems = computed(() =>
  licenses.value.filter((l) => l.status === "expiring_soon" || l.status === "expired"),
);

function getCheckStatusColor(status: string): VcBadgeColorType {
  const colorMap: Record<string, VcBadgeColorType> = {
    passed: "success",
    failed: "danger",
    pending: "warning",
    not_applicable: "neutral",
  };
  return colorMap[status] ?? "neutral";
}

function getDocStatusColor(status: string): VcBadgeColorType {
  const colorMap: Record<string, VcBadgeColorType> = {
    uploaded: "info",
    verified: "success",
    rejected: "danger",
  };
  return colorMap[status] ?? "neutral";
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
</script>
