<template>
  <div>
    <VcTypography tag="h3" class="mb-2 text-lg font-semibold">
      {{ $t("pages.supplier.onboarding.review.title") }}
    </VcTypography>

    <p class="mb-6 text-sm text-neutral-500">
      {{ $t("pages.supplier.onboarding.review.description") }}
    </p>

    <!-- Business Information Summary -->
    <div class="mb-6 rounded-lg border border-neutral-200 bg-additional-50 p-4">
      <div class="mb-3 flex items-center justify-between">
        <VcTypography tag="h4" class="text-base font-semibold">
          {{ $t("pages.supplier.onboarding.review.business_info_section") }}
        </VcTypography>
        <VcButton variant="no-background" size="xs" @click="goToStep(0)">
          {{ $t("pages.supplier.onboarding.review.edit") }}
        </VcButton>
      </div>

      <dl class="grid grid-cols-1 gap-x-6 gap-y-2 text-sm md:grid-cols-2">
        <div class="flex gap-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.company_name") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.companyName || "--" }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.registration_number") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.registrationNumber || "--" }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.tax_id") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.taxId || "--" }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.industry") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.industry || "--" }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.country") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.country || "--" }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.city") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.city || "--" }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.address") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.address || "--" }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.postal_code") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.postalCode || "--" }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.contact_name") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.contactName || "--" }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.contact_email") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.contactEmail || "--" }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.contact_phone") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.contactPhone || "--" }}</dd>
        </div>
        <div v-if="application.businessInfo.website" class="flex gap-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.website") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.website }}</dd>
        </div>
        <div v-if="application.businessInfo.description" class="flex gap-2 md:col-span-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.description") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.description }}</dd>
        </div>
        <div v-if="application.businessInfo.employeeCount" class="flex gap-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.employee_count") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.employeeCount }}</dd>
        </div>
        <div v-if="application.businessInfo.annualRevenue" class="flex gap-2">
          <dt class="font-medium text-neutral-500">{{ $t("pages.supplier.onboarding.business_info.annual_revenue") }}:</dt>
          <dd class="text-neutral-900">{{ application.businessInfo.annualRevenue }}</dd>
        </div>
      </dl>
    </div>

    <!-- Documents Summary -->
    <div class="mb-6 rounded-lg border border-neutral-200 bg-additional-50 p-4">
      <div class="mb-3 flex items-center justify-between">
        <VcTypography tag="h4" class="text-base font-semibold">
          {{ $t("pages.supplier.onboarding.review.documents_section") }}
        </VcTypography>
        <VcButton variant="no-background" size="xs" @click="goToStep(1)">
          {{ $t("pages.supplier.onboarding.review.edit") }}
        </VcButton>
      </div>

      <div class="space-y-2">
        <div
          v-for="doc in application.documents"
          :key="doc.id"
          class="flex items-center justify-between rounded border border-neutral-100 px-3 py-2 text-sm"
        >
          <div class="flex items-center gap-2">
            <span class="font-medium text-neutral-800">{{ doc.name }}</span>
            <VcChip
              v-if="doc.required"
              color="danger"
              variant="solid-light"
              size="sm"
            >
              {{ $t("pages.supplier.onboarding.documents.required") }}
            </VcChip>
          </div>

          <div class="flex items-center gap-2">
            <template v-if="doc.uploaded">
              <VcChip color="success" variant="solid-light" size="sm">
                {{ $t("pages.supplier.onboarding.review.uploaded") }}
              </VcChip>
              <span class="text-xs text-neutral-500">{{ doc.fileName }}</span>
            </template>
            <VcChip v-else color="neutral" variant="solid-light" size="sm">
              {{ $t("pages.supplier.onboarding.review.not_uploaded") }}
            </VcChip>
          </div>
        </div>
      </div>
    </div>

    <!-- Licenses Summary -->
    <div class="rounded-lg border border-neutral-200 bg-additional-50 p-4">
      <div class="mb-3 flex items-center justify-between">
        <VcTypography tag="h4" class="text-base font-semibold">
          {{ $t("pages.supplier.onboarding.review.licenses_section") }}
        </VcTypography>
        <VcButton variant="no-background" size="xs" @click="goToStep(2)">
          {{ $t("pages.supplier.onboarding.review.edit") }}
        </VcButton>
      </div>

      <div v-if="application.licenses.length > 0" class="space-y-2">
        <div
          v-for="license in application.licenses"
          :key="license.id"
          class="flex items-center justify-between rounded border border-neutral-100 px-3 py-2 text-sm"
        >
          <div>
            <span class="font-medium text-neutral-800">{{ license.licenseType }}</span>
            <span class="ml-2 text-neutral-500">#{{ license.licenseNumber }}</span>
          </div>

          <div class="flex items-center gap-2">
            <VcChip
              :color="getVerificationColor(license.verificationStatus)"
              variant="solid-light"
              size="sm"
            >
              {{ getVerificationLabel(license.verificationStatus) }}
            </VcChip>
            <span class="text-xs text-neutral-500">
              {{ license.issueDate }} - {{ license.expiryDate }}
            </span>
          </div>
        </div>
      </div>

      <p v-else class="text-sm text-neutral-500">
        {{ $t("pages.supplier.onboarding.licenses.no_licenses") }}
      </p>
    </div>

    <!-- Submission Notice -->
    <div
      v-if="application.status === 'submitted'"
      class="mt-6 rounded-lg border border-success-300 bg-success-50 p-4"
    >
      <div class="flex items-center gap-2">
        <VcIcon name="check-circle" size="sm" class="text-success-600" />
        <span class="text-sm font-semibold text-success-800">
          {{ $t("pages.supplier.onboarding.review.submitted_message") }}
        </span>
      </div>
      <p class="mt-1 text-sm text-success-700">
        {{ $t("pages.supplier.onboarding.review.submitted_description") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSupplierOnboarding } from "@/shared/supplier";

const { t } = useI18n();
const { application, goToStep } = useSupplierOnboarding();

function getVerificationColor(status: string): VcChipColorType {
  switch (status) {
    case "verified":
      return "success";
    case "failed":
      return "danger";
    case "pending":
    default:
      return "warning";
  }
}

function getVerificationLabel(status: string): string {
  switch (status) {
    case "verified":
      return t("pages.supplier.onboarding.licenses.status_verified");
    case "failed":
      return t("pages.supplier.onboarding.licenses.status_failed");
    case "pending":
    default:
      return t("pages.supplier.onboarding.licenses.status_pending");
  }
}
</script>
