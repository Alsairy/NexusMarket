<template>
  <div>
    <VcTypography tag="h3" class="mb-2 text-lg font-semibold">
      {{ $t("pages.supplier.onboarding.documents.title") }}
    </VcTypography>

    <p class="mb-6 text-sm text-neutral-500">
      {{ $t("pages.supplier.onboarding.documents.description") }}
    </p>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div
        v-for="doc in application.documents"
        :key="doc.id"
        class="rounded-lg border border-neutral-200 p-4 transition-colors"
        :class="{
          'border-success-300 bg-success-50': doc.uploaded,
          'border-neutral-200 bg-neutral-50': !doc.uploaded,
        }"
      >
        <div class="mb-3 flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-neutral-900">{{ doc.name }}</span>
              <VcChip
                v-if="doc.required"
                color="danger"
                variant="solid-light"
                size="sm"
              >
                {{ $t("pages.supplier.onboarding.documents.required") }}
              </VcChip>
              <VcChip
                v-else
                color="neutral"
                variant="solid-light"
                size="sm"
              >
                {{ $t("pages.supplier.onboarding.documents.optional") }}
              </VcChip>
            </div>
            <span class="mt-1 block text-xs text-neutral-500">
              {{ $t("pages.supplier.onboarding.documents.category") }}: {{ formatCategory(doc.category) }}
            </span>
          </div>
        </div>

        <div v-if="doc.uploaded" class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <VcIcon name="check-circle" size="sm" class="text-success-500" />
            <span class="text-sm text-neutral-700">{{ doc.fileName }}</span>
            <span class="text-xs text-neutral-400">({{ formatFileSize(doc.fileSize) }})</span>
          </div>
          <VcButton
            variant="no-background"
            color="danger"
            size="xs"
            @click="handleRemoveDocument(doc.id)"
          >
            {{ $t("pages.supplier.onboarding.documents.remove") }}
          </VcButton>
        </div>

        <div v-else>
          <label
            :for="`file-upload-${doc.id}`"
            class="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-neutral-300 p-3 text-sm text-neutral-500 transition-colors hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600"
          >
            <VcIcon name="cloud-upload" size="sm" />
            {{ $t("pages.supplier.onboarding.documents.upload_file") }}
          </label>
          <input
            :id="`file-upload-${doc.id}`"
            type="file"
            class="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            @change="(event) => handleFileUpload(event, doc.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSupplierOnboarding } from "@/shared/supplier";

const { t } = useI18n();
const { application, uploadDocumentById, removeDocument } = useSupplierOnboarding();

function handleFileUpload(event: Event, docId: string): void {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    uploadDocumentById(docId, file);
  }
  // Reset input so the same file can be re-selected if needed
  target.value = "";
}

function handleRemoveDocument(docId: string): void {
  removeDocument(docId);
}

function formatCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    registration: t("pages.supplier.onboarding.documents.categories.registration"),
    license: t("pages.supplier.onboarding.documents.categories.license"),
    certificate: t("pages.supplier.onboarding.documents.categories.certificate"),
    financial: t("pages.supplier.onboarding.documents.categories.financial"),
    other: t("pages.supplier.onboarding.documents.categories.other"),
  };
  return categoryMap[category] ?? category;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return "0 B";
  }
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}
</script>
