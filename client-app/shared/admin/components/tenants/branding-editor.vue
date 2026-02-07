<template>
  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Editor Form -->
    <div class="flex flex-col gap-4">
      <!-- Logo URL -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-neutral-700">
          {{ $t("pages.admin.tenants.logo_url_label") }}
        </label>
        <input
          v-model="localBranding.logoUrl"
          type="text"
          class="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          :placeholder="$t('pages.admin.tenants.logo_url_placeholder')"
        />
      </div>

      <!-- Colors -->
      <div class="grid grid-cols-3 gap-4">
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-neutral-700">
            {{ $t("pages.admin.tenants.primary_color_label") }}
          </label>
          <div class="flex items-center gap-2">
            <input
              v-model="localBranding.primaryColor"
              type="color"
              class="size-8 cursor-pointer rounded border border-neutral-300"
            />
            <input
              v-model="localBranding.primaryColor"
              type="text"
              class="w-full rounded-md border border-neutral-300 px-2 py-1.5 text-xs font-mono focus:border-primary-500 focus:outline-none"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-neutral-700">
            {{ $t("pages.admin.tenants.secondary_color_label") }}
          </label>
          <div class="flex items-center gap-2">
            <input
              v-model="localBranding.secondaryColor"
              type="color"
              class="size-8 cursor-pointer rounded border border-neutral-300"
            />
            <input
              v-model="localBranding.secondaryColor"
              type="text"
              class="w-full rounded-md border border-neutral-300 px-2 py-1.5 text-xs font-mono focus:border-primary-500 focus:outline-none"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-neutral-700">
            {{ $t("pages.admin.tenants.accent_color_label") }}
          </label>
          <div class="flex items-center gap-2">
            <input
              v-model="localBranding.accentColor"
              type="color"
              class="size-8 cursor-pointer rounded border border-neutral-300"
            />
            <input
              v-model="localBranding.accentColor"
              type="text"
              class="w-full rounded-md border border-neutral-300 px-2 py-1.5 text-xs font-mono focus:border-primary-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Font Family -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-neutral-700">
          {{ $t("pages.admin.tenants.font_family_label") }}
        </label>
        <select
          v-model="localBranding.fontFamily"
          class="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option v-for="font in fontOptions" :key="font" :value="font">
            {{ font }}
          </option>
        </select>
      </div>

      <!-- Custom CSS -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-neutral-700">
          {{ $t("pages.admin.tenants.custom_css_label") }}
        </label>
        <textarea
          v-model="localBranding.customCss"
          rows="4"
          class="rounded-md border border-neutral-300 px-3 py-2 font-mono text-xs focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          :placeholder="$t('pages.admin.tenants.custom_css_placeholder')"
        />
      </div>

      <!-- Save Button -->
      <div class="flex justify-end pt-2">
        <VcButton :loading="saving" @click="handleSave">
          {{ $t("pages.admin.tenants.save_branding_button") }}
        </VcButton>
      </div>
    </div>

    <!-- Live Preview -->
    <div class="flex flex-col gap-2">
      <span class="text-sm font-medium text-neutral-700">
        {{ $t("pages.admin.tenants.live_preview_label") }}
      </span>
      <BrandingPreview :branding="localBranding" :tenant-name="tenantName" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import BrandingPreview from "./branding-preview.vue";
import type { TenantBrandingType } from "../../types";

interface IProps {
  branding: TenantBrandingType;
  tenantName: string;
  saving?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  saving: false,
});

const emit = defineEmits<{
  (event: "save", branding: TenantBrandingType): void;
}>();

const localBranding = reactive<TenantBrandingType>({ ...props.branding });

const fontOptions = ref([
  "Inter",
  "Roboto",
  "Open Sans",
  "Nunito",
  "Poppins",
  "Source Sans Pro",
  "Lato",
  "Montserrat",
  "Raleway",
  "Work Sans",
]);

function handleSave(): void {
  emit("save", { ...localBranding });
}
</script>
