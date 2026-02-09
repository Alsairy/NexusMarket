<template>
  <VcContainer>
    <!-- Hero Section -->
    <div class="mx-auto max-w-4xl py-8 text-center md:py-16">
      <VcTypography tag="h1" class="mb-4">
        {{ $t("pages.supplier.register.hero_title") }}
      </VcTypography>

      <p class="mx-auto mb-8 max-w-2xl text-lg text-neutral-600">
        {{ $t("pages.supplier.register.hero_description") }}
      </p>

      <VcButton size="lg" @click="startRegistration">
        {{ $t("pages.supplier.register.start_button") }}
      </VcButton>
    </div>

    <!-- Benefits Section -->
    <div class="mx-auto max-w-5xl pb-10 md:pb-16">
      <VcTypography tag="h2" class="mb-8 text-center">
        {{ $t("pages.supplier.register.benefits_title") }}
      </VcTypography>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <!-- Benefit 1: Global Reach -->
        <VcWidget size="md" class="text-center">
          <div class="flex flex-col items-center p-2">
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
              <VcIcon name="globe" size="lg" class="text-primary-600" />
            </div>
            <VcTypography tag="h3" class="mb-2 text-base font-bold">
              {{ $t("pages.supplier.register.benefit_1_title") }}
            </VcTypography>
            <p class="text-sm text-neutral-600">
              {{ $t("pages.supplier.register.benefit_1_description") }}
            </p>
          </div>
        </VcWidget>

        <!-- Benefit 2: Secure Payments -->
        <VcWidget size="md" class="text-center">
          <div class="flex flex-col items-center p-2">
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success-100">
              <VcIcon name="lock-closed" size="lg" class="text-success-600" />
            </div>
            <VcTypography tag="h3" class="mb-2 text-base font-bold">
              {{ $t("pages.supplier.register.benefit_2_title") }}
            </VcTypography>
            <p class="text-sm text-neutral-600">
              {{ $t("pages.supplier.register.benefit_2_description") }}
            </p>
          </div>
        </VcWidget>

        <!-- Benefit 3: Analytics Dashboard -->
        <VcWidget size="md" class="text-center">
          <div class="flex flex-col items-center p-2">
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-info-100">
              <VcIcon name="chart" size="lg" class="text-info-600" />
            </div>
            <VcTypography tag="h3" class="mb-2 text-base font-bold">
              {{ $t("pages.supplier.register.benefit_3_title") }}
            </VcTypography>
            <p class="text-sm text-neutral-600">
              {{ $t("pages.supplier.register.benefit_3_description") }}
            </p>
          </div>
        </VcWidget>

        <!-- Benefit 4: Dedicated Support -->
        <VcWidget size="md" class="text-center">
          <div class="flex flex-col items-center p-2">
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warning-100">
              <VcIcon name="support" size="lg" class="text-warning-600" />
            </div>
            <VcTypography tag="h3" class="mb-2 text-base font-bold">
              {{ $t("pages.supplier.register.benefit_4_title") }}
            </VcTypography>
            <p class="text-sm text-neutral-600">
              {{ $t("pages.supplier.register.benefit_4_description") }}
            </p>
          </div>
        </VcWidget>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="mx-auto max-w-3xl rounded-lg bg-primary-50 p-8 text-center md:p-12">
      <VcTypography tag="h2" class="mb-4">
        {{ $t("pages.supplier.register.cta_title") }}
      </VcTypography>

      <p class="mb-6 text-neutral-600">
        {{ $t("pages.supplier.register.cta_description") }}
      </p>

      <VcButton size="lg" @click="startRegistration">
        {{ $t("pages.supplier.register.start_button") }}
      </VcButton>
    </div>
  </VcContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { usePageHead } from "@/core/composables";

const { t } = useI18n();
const router = useRouter();

usePageHead({
  title: computed(() => t("pages.supplier.register.meta.title")),
});

function startRegistration(): void {
  void router.push({ name: "SupplierOnboarding" });
}
</script>
