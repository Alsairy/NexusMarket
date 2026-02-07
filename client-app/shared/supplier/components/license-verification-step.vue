<template>
  <div>
    <VcTypography tag="h3" class="mb-2 text-lg font-semibold">
      {{ $t("pages.supplier.onboarding.licenses.title") }}
    </VcTypography>

    <p class="mb-6 text-sm text-neutral-500">
      {{ $t("pages.supplier.onboarding.licenses.description") }}
    </p>

    <!-- Add License Form -->
    <div class="mb-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      <VcTypography tag="h4" class="mb-4 text-base font-semibold">
        {{ $t("pages.supplier.onboarding.licenses.add_license") }}
      </VcTypography>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <VcInput
          v-model="licenseForm.licenseType"
          :label="$t('pages.supplier.onboarding.licenses.license_type')"
          :placeholder="$t('pages.supplier.onboarding.licenses.license_type_placeholder')"
          required
        />

        <VcInput
          v-model="licenseForm.licenseNumber"
          :label="$t('pages.supplier.onboarding.licenses.license_number')"
          :placeholder="$t('pages.supplier.onboarding.licenses.license_number_placeholder')"
          required
        />

        <VcInput
          v-model="licenseForm.issuingAuthority"
          :label="$t('pages.supplier.onboarding.licenses.issuing_authority')"
          :placeholder="$t('pages.supplier.onboarding.licenses.issuing_authority_placeholder')"
          required
        />

        <div></div>

        <VcInput
          v-model="licenseForm.issueDate"
          :label="$t('pages.supplier.onboarding.licenses.issue_date')"
          type="date"
          required
        />

        <VcInput
          v-model="licenseForm.expiryDate"
          :label="$t('pages.supplier.onboarding.licenses.expiry_date')"
          type="date"
          required
        />
      </div>

      <div class="mt-4">
        <VcButton
          size="sm"
          :disabled="!isFormValid"
          @click="handleAddLicense"
        >
          {{ $t("pages.supplier.onboarding.licenses.add_button") }}
        </VcButton>
      </div>
    </div>

    <!-- Licenses List -->
    <div v-if="application.licenses.length > 0">
      <VcTypography tag="h4" class="mb-3 text-base font-semibold">
        {{ $t("pages.supplier.onboarding.licenses.added_licenses") }}
        ({{ application.licenses.length }})
      </VcTypography>

      <div class="space-y-3">
        <div
          v-for="license in application.licenses"
          :key="license.id"
          class="flex items-center justify-between rounded-lg border border-neutral-200 bg-additional-50 p-4"
        >
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-neutral-900">{{ license.licenseType }}</span>
              <VcChip
                :color="getVerificationColor(license.verificationStatus)"
                variant="solid-light"
                size="sm"
              >
                {{ getVerificationLabel(license.verificationStatus) }}
              </VcChip>
            </div>
            <div class="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
              <span>{{ $t("pages.supplier.onboarding.licenses.number") }}: {{ license.licenseNumber }}</span>
              <span>{{ $t("pages.supplier.onboarding.licenses.authority") }}: {{ license.issuingAuthority }}</span>
              <span>{{ $t("pages.supplier.onboarding.licenses.valid") }}: {{ license.issueDate }} - {{ license.expiryDate }}</span>
            </div>
          </div>

          <VcButton
            variant="no-background"
            color="danger"
            size="xs"
            @click="handleRemoveLicense(license.id)"
          >
            {{ $t("pages.supplier.onboarding.licenses.remove") }}
          </VcButton>
        </div>
      </div>
    </div>

    <div
      v-else
      class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 p-8 text-center"
    >
      <VcIcon name="document" size="lg" class="mb-2 text-neutral-400" />
      <span class="text-sm text-neutral-500">
        {{ $t("pages.supplier.onboarding.licenses.no_licenses") }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useSupplierOnboarding } from "@/shared/supplier";

const { t } = useI18n();
const { application, addLicense, removeLicense } = useSupplierOnboarding();

const licenseForm = reactive({
  licenseType: "",
  licenseNumber: "",
  issuingAuthority: "",
  issueDate: "",
  expiryDate: "",
});

const isFormValid = computed(() => {
  return !!(
    licenseForm.licenseType.trim() &&
    licenseForm.licenseNumber.trim() &&
    licenseForm.issuingAuthority.trim() &&
    licenseForm.issueDate &&
    licenseForm.expiryDate
  );
});

function handleAddLicense(): void {
  if (!isFormValid.value) {
    return;
  }

  addLicense({
    licenseType: licenseForm.licenseType,
    licenseNumber: licenseForm.licenseNumber,
    issuingAuthority: licenseForm.issuingAuthority,
    issueDate: licenseForm.issueDate,
    expiryDate: licenseForm.expiryDate,
  });

  // Reset form
  licenseForm.licenseType = "";
  licenseForm.licenseNumber = "";
  licenseForm.issuingAuthority = "";
  licenseForm.issueDate = "";
  licenseForm.expiryDate = "";
}

function handleRemoveLicense(licenseId: string): void {
  removeLicense(licenseId);
}

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
