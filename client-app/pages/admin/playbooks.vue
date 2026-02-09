<template>
  <VcContainer>
    <div class="flex flex-col gap-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <VcTypography tag="h1">
          {{ $t("pages.admin.tenants.playbooks_title") }}
        </VcTypography>

        <VcButton variant="outline" :to="{ name: 'AdminTenants' }">
          <VcIcon name="arrow-left" size="xs" />
          {{ $t("pages.admin.tenants.back_to_tenants") }}
        </VcButton>
      </div>

      <!-- Description -->
      <p class="max-w-3xl text-sm text-neutral-600 leading-relaxed">
        {{ $t("pages.admin.tenants.playbooks_description") }}
      </p>

      <!-- Playbook Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <DomainPlaybookCard
          v-for="playbook in playbooks"
          :key="playbook.id"
          :playbook="playbook"
          @create="handleCreateFromPlaybook"
        />
      </div>

      <!-- Create Tenant Modal (inline) -->
      <div
        v-if="showCreateForm"
        class="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50"
        @click.self="showCreateForm = false"
      >
        <div class="mx-4 w-full max-w-md rounded-lg bg-additional-50 p-6 shadow-xl">
          <h3 class="mb-4 text-lg font-bold text-neutral-900">
            {{ $t("pages.admin.tenants.create_tenant_title") }}
          </h3>
          <p class="mb-4 text-sm text-neutral-500">
            {{ $t("pages.admin.tenants.create_tenant_from_playbook", { playbook: selectedPlaybookName }) }}
          </p>
          <div class="mb-4 flex flex-col gap-1">
            <label class="text-sm font-medium text-neutral-700">
              {{ $t("pages.admin.tenants.tenant_name_label") }}
            </label>
            <input
              v-model="newTenantName"
              type="text"
              class="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              :placeholder="$t('pages.admin.tenants.tenant_name_placeholder')"
            />
          </div>
          <div class="flex justify-end gap-2">
            <VcButton variant="outline" @click="showCreateForm = false">
              {{ $t("pages.admin.tenants.cancel_button") }}
            </VcButton>
            <VcButton :loading="loading" :disabled="!newTenantName.trim()" @click="handleConfirmCreate">
              {{ $t("pages.admin.tenants.create_button") }}
            </VcButton>
          </div>
        </div>
      </div>
    </div>
  </VcContainer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { usePageHead } from "@/core/composables";
import { useTenantConfig } from "@/shared/admin/composables";
import { DomainPlaybookCard } from "@/shared/admin/components/tenants";

const { t } = useI18n();
const router = useRouter();

usePageHead({
  title: t("pages.admin.tenants.playbooks_meta.title"),
});

const { loading, playbooks, createTenantFromPlaybook } = useTenantConfig();

const showCreateForm = ref(false);
const selectedPlaybookId = ref("");
const newTenantName = ref("");

const selectedPlaybookName = computed(() => {
  const playbook = playbooks.value.find((p) => p.id === selectedPlaybookId.value);
  return playbook?.name ?? "";
});

function handleCreateFromPlaybook(playbookId: string): void {
  selectedPlaybookId.value = playbookId;
  newTenantName.value = "";
  showCreateForm.value = true;
}

async function handleConfirmCreate(): Promise<void> {
  if (!newTenantName.value.trim()) {
    return;
  }
  await createTenantFromPlaybook(selectedPlaybookId.value, newTenantName.value.trim());
  showCreateForm.value = false;
  void router.push({ name: "AdminTenants" });
}
</script>
