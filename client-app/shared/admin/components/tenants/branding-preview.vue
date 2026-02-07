<template>
  <div class="flex flex-col gap-4 rounded-lg border border-neutral-200 p-4">
    <!-- Logo Placeholder -->
    <div class="flex items-center gap-3">
      <div
        class="flex size-12 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-xs text-neutral-400"
      >
        <span v-if="branding.logoUrl">
          <VcIcon name="image" size="sm" />
        </span>
        <span v-else>{{ $t("pages.admin.tenants.logo_placeholder") }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-sm font-medium text-neutral-700">
          {{ $t("pages.admin.tenants.branding_preview_label") }}
        </span>
        <span class="text-xs text-neutral-400">{{ branding.fontFamily }}</span>
      </div>
    </div>

    <!-- Color Palette -->
    <div class="flex flex-col gap-2">
      <span class="text-xs font-medium text-neutral-500">
        {{ $t("pages.admin.tenants.color_palette_label") }}
      </span>
      <div class="flex items-center gap-3">
        <div class="flex flex-col items-center gap-1">
          <div
            class="size-10 rounded-full border-2 border-neutral-200 shadow-sm"
            :style="{ backgroundColor: branding.primaryColor }"
          />
          <span class="text-[10px] text-neutral-400">{{ branding.primaryColor }}</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <div
            class="size-10 rounded-full border-2 border-neutral-200 shadow-sm"
            :style="{ backgroundColor: branding.secondaryColor }"
          />
          <span class="text-[10px] text-neutral-400">{{ branding.secondaryColor }}</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <div
            class="size-10 rounded-full border-2 border-neutral-200 shadow-sm"
            :style="{ backgroundColor: branding.accentColor }"
          />
          <span class="text-[10px] text-neutral-400">{{ branding.accentColor }}</span>
        </div>
      </div>
    </div>

    <!-- Mini Header Mockup -->
    <div class="flex flex-col gap-2">
      <span class="text-xs font-medium text-neutral-500">
        {{ $t("pages.admin.tenants.header_preview_label") }}
      </span>
      <div
        class="flex items-center justify-between rounded-md px-4 py-3"
        :style="{
          backgroundColor: branding.primaryColor,
          fontFamily: branding.fontFamily,
        }"
      >
        <div class="flex items-center gap-2">
          <div
            class="flex size-6 items-center justify-center rounded bg-white/20 text-[10px] font-bold text-white"
          >
            {{ initials }}
          </div>
          <span class="text-sm font-bold text-white">{{ tenantName }}</span>
        </div>
        <div class="flex items-center gap-3">
          <div
            class="h-2 w-10 rounded-full"
            :style="{ backgroundColor: branding.accentColor }"
          />
          <div
            class="h-2 w-8 rounded-full"
            :style="{ backgroundColor: branding.secondaryColor }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { TenantBrandingType } from "../../types";

interface IProps {
  branding: TenantBrandingType;
  tenantName: string;
}

const props = defineProps<IProps>();

const initials = computed(() => {
  return props.tenantName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});
</script>
