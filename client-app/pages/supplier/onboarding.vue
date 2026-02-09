<template>
  <VcContainer>
    <div class="mx-auto max-w-3xl">
      <VcTypography tag="h1" class="mb-6 text-center">
        {{ $t("pages.supplier.onboarding.title") }}
      </VcTypography>

      <VcWidget size="lg" class="mb-6">
        <VcSteps :steps="stepsConfig" :current-step-index="currentStepIndex" :start-step-index="0" />
      </VcWidget>

      <!-- Step Content -->
      <VcWidget size="lg">
        <BusinessInfoStep v-if="currentStepId === 'business_info'" />
        <DocumentsStep v-else-if="currentStepId === 'documents'" />
        <LicenseVerificationStep v-else-if="currentStepId === 'license_verification'" />
        <ReviewStep v-else-if="currentStepId === 'review'" />

        <!-- Navigation buttons -->
        <div class="mt-6 flex justify-between border-t border-neutral-200 pt-4">
          <VcButton
            v-if="currentStepIndex > 0"
            variant="outline"
            @click="goToPreviousStep"
          >
            {{ $t("common.buttons.back") }}
          </VcButton>
          <div v-else></div>

          <VcButton
            v-if="currentStepId !== 'review'"
            :disabled="!canProceed"
            @click="goToNextStep"
          >
            {{ $t("common.buttons.next") }}
          </VcButton>
          <VcButton
            v-else
            :loading="loading"
            :disabled="!canProceed || application.status === 'submitted'"
            @click="handleSubmit"
          >
            {{ $t("pages.supplier.onboarding.submit_button") }}
          </VcButton>
        </div>
      </VcWidget>
    </div>
  </VcContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { usePageHead } from "@/core/composables";
import {
  BusinessInfoStep,
  DocumentsStep,
  LicenseVerificationStep,
  ReviewStep,
  useSupplierOnboarding,
} from "@/shared/supplier";

const { t } = useI18n();
const {
  loading,
  application,
  currentStepIndex,
  currentStepId,
  steps,
  canProceed,
  goToNextStep,
  goToPreviousStep,
  submitApplication,
} = useSupplierOnboarding();

usePageHead({
  title: computed(() => t("pages.supplier.onboarding.meta.title")),
});

const stepsConfig = computed<IStepsItem[]>(() =>
  steps.value.map((step) => ({
    text: t(`pages.supplier.onboarding.steps.${step.id}`),
  })),
);

async function handleSubmit(): Promise<void> {
  await submitApplication();
}
</script>
