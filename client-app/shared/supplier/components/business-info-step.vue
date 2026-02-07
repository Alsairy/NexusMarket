<template>
  <div>
    <!-- Company Details Section -->
    <div class="mb-6">
      <VcTypography tag="h3" class="mb-4 text-lg font-semibold">
        {{ $t("pages.supplier.onboarding.business_info.company_details") }}
      </VcTypography>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <VcInput
          :model-value="application.businessInfo.companyName"
          :label="$t('pages.supplier.onboarding.business_info.company_name')"
          :placeholder="$t('pages.supplier.onboarding.business_info.company_name_placeholder')"
          required
          class="col-span-1 md:col-span-2"
          @update:model-value="(val: string) => updateBusinessInfo({ companyName: val })"
        />

        <VcInput
          :model-value="application.businessInfo.registrationNumber"
          :label="$t('pages.supplier.onboarding.business_info.registration_number')"
          :placeholder="$t('pages.supplier.onboarding.business_info.registration_number_placeholder')"
          required
          @update:model-value="(val: string) => updateBusinessInfo({ registrationNumber: val })"
        />

        <VcInput
          :model-value="application.businessInfo.taxId"
          :label="$t('pages.supplier.onboarding.business_info.tax_id')"
          :placeholder="$t('pages.supplier.onboarding.business_info.tax_id_placeholder')"
          required
          @update:model-value="(val: string) => updateBusinessInfo({ taxId: val })"
        />

        <VcInput
          :model-value="application.businessInfo.industry"
          :label="$t('pages.supplier.onboarding.business_info.industry')"
          :placeholder="$t('pages.supplier.onboarding.business_info.industry_placeholder')"
          required
          @update:model-value="(val: string) => updateBusinessInfo({ industry: val })"
        />

        <VcInput
          :model-value="application.businessInfo.country"
          :label="$t('pages.supplier.onboarding.business_info.country')"
          :placeholder="$t('pages.supplier.onboarding.business_info.country_placeholder')"
          required
          @update:model-value="(val: string) => updateBusinessInfo({ country: val })"
        />

        <VcInput
          :model-value="application.businessInfo.city"
          :label="$t('pages.supplier.onboarding.business_info.city')"
          :placeholder="$t('pages.supplier.onboarding.business_info.city_placeholder')"
          required
          @update:model-value="(val: string) => updateBusinessInfo({ city: val })"
        />

        <VcInput
          :model-value="application.businessInfo.address"
          :label="$t('pages.supplier.onboarding.business_info.address')"
          :placeholder="$t('pages.supplier.onboarding.business_info.address_placeholder')"
          required
          @update:model-value="(val: string) => updateBusinessInfo({ address: val })"
        />

        <VcInput
          :model-value="application.businessInfo.postalCode"
          :label="$t('pages.supplier.onboarding.business_info.postal_code')"
          :placeholder="$t('pages.supplier.onboarding.business_info.postal_code_placeholder')"
          required
          @update:model-value="(val: string) => updateBusinessInfo({ postalCode: val })"
        />
      </div>
    </div>

    <!-- Contact Information Section -->
    <div class="mb-6">
      <VcTypography tag="h3" class="mb-4 text-lg font-semibold">
        {{ $t("pages.supplier.onboarding.business_info.contact_information") }}
      </VcTypography>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <VcInput
          :model-value="application.businessInfo.contactName"
          :label="$t('pages.supplier.onboarding.business_info.contact_name')"
          :placeholder="$t('pages.supplier.onboarding.business_info.contact_name_placeholder')"
          required
          @update:model-value="(val: string) => updateBusinessInfo({ contactName: val })"
        />

        <VcInput
          :model-value="application.businessInfo.contactEmail"
          :label="$t('pages.supplier.onboarding.business_info.contact_email')"
          :placeholder="$t('pages.supplier.onboarding.business_info.contact_email_placeholder')"
          required
          @update:model-value="(val: string) => updateBusinessInfo({ contactEmail: val })"
        />

        <VcInput
          :model-value="application.businessInfo.contactPhone"
          :label="$t('pages.supplier.onboarding.business_info.contact_phone')"
          :placeholder="$t('pages.supplier.onboarding.business_info.contact_phone_placeholder')"
          required
          @update:model-value="(val: string) => updateBusinessInfo({ contactPhone: val })"
        />

        <VcInput
          :model-value="application.businessInfo.website ?? ''"
          :label="$t('pages.supplier.onboarding.business_info.website')"
          :placeholder="$t('pages.supplier.onboarding.business_info.website_placeholder')"
          @update:model-value="(val: string) => updateBusinessInfo({ website: val })"
        />
      </div>
    </div>

    <!-- Additional Information Section -->
    <div>
      <VcTypography tag="h3" class="mb-4 text-lg font-semibold">
        {{ $t("pages.supplier.onboarding.business_info.additional_information") }}
      </VcTypography>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <VcInput
          :model-value="application.businessInfo.description ?? ''"
          :label="$t('pages.supplier.onboarding.business_info.description')"
          :placeholder="$t('pages.supplier.onboarding.business_info.description_placeholder')"
          class="col-span-1 md:col-span-2"
          @update:model-value="(val: string) => updateBusinessInfo({ description: val })"
        />

        <VcInput
          :model-value="application.businessInfo.employeeCount ?? ''"
          :label="$t('pages.supplier.onboarding.business_info.employee_count')"
          :placeholder="$t('pages.supplier.onboarding.business_info.employee_count_placeholder')"
          @update:model-value="(val: string) => updateBusinessInfo({ employeeCount: val })"
        />

        <VcInput
          :model-value="application.businessInfo.annualRevenue ?? ''"
          :label="$t('pages.supplier.onboarding.business_info.annual_revenue')"
          :placeholder="$t('pages.supplier.onboarding.business_info.annual_revenue_placeholder')"
          @update:model-value="(val: string) => updateBusinessInfo({ annualRevenue: val })"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSupplierOnboarding } from "@/shared/supplier";

const { application, updateBusinessInfo } = useSupplierOnboarding();
</script>
