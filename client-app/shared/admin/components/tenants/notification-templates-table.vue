<template>
  <VcTable
    :columns="columns"
    :items="templates"
    :hide-default-footer="true"
    :description="$t('pages.admin.tenants.notification_templates_description')"
    mobile-breakpoint="lg"
  >
    <template #mobile-item="{ item }">
      <div class="grid grid-cols-2 gap-y-3 border-b border-neutral-200 p-5">
        <div class="col-span-2 flex items-center justify-between">
          <span class="font-bold">{{ item.name }}</span>
          <VcBadge :color="channelColor(item.channel)" variant="solid" size="xs" rounded>
            {{ $t(`pages.admin.tenants.channel_${item.channel}`) }}
          </VcBadge>
        </div>

        <div class="col-span-2 flex flex-col">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.admin.tenants.template_subject_label") }}
          </span>
          <span class="text-sm">{{ item.subject }}</span>
        </div>

        <div class="flex flex-col">
          <span class="text-xs text-neutral-400">
            {{ $t("pages.admin.tenants.template_variables_label") }}
          </span>
          <div class="flex flex-wrap gap-1 mt-1">
            <VcBadge
              v-for="variable in item.variables"
              :key="variable"
              color="neutral"
              variant="outline"
              size="xs"
            >
              {{ variable }}
            </VcBadge>
          </div>
        </div>

        <div class="flex items-end justify-end">
          <button
            class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
            :class="item.enabled ? 'bg-primary-500' : 'bg-neutral-300'"
            @click="$emit('toggle', item.id)"
          >
            <span
              class="inline-block size-4 transform rounded-full bg-white shadow transition-transform duration-200"
              :class="item.enabled ? 'translate-x-4' : 'translate-x-0'"
            />
          </button>
        </div>
      </div>
    </template>

    <template #desktop-body>
      <tr
        v-for="item in templates"
        :key="item.id"
        class="even:bg-neutral-50"
      >
        <td class="px-4 py-3 font-medium">{{ item.name }}</td>
        <td class="px-4 py-3">
          <VcBadge :color="channelColor(item.channel)" variant="solid" size="xs" rounded>
            {{ $t(`pages.admin.tenants.channel_${item.channel}`) }}
          </VcBadge>
        </td>
        <td class="px-4 py-3 text-sm">{{ item.subject }}</td>
        <td class="px-4 py-3">
          <div class="flex flex-wrap gap-1">
            <VcBadge
              v-for="variable in item.variables"
              :key="variable"
              color="neutral"
              variant="outline"
              size="xs"
            >
              {{ variable }}
            </VcBadge>
          </div>
        </td>
        <td class="px-4 py-3">
          <button
            class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
            :class="item.enabled ? 'bg-primary-500' : 'bg-neutral-300'"
            @click="$emit('toggle', item.id)"
          >
            <span
              class="inline-block size-4 transform rounded-full bg-white shadow transition-transform duration-200"
              :class="item.enabled ? 'translate-x-4' : 'translate-x-0'"
            />
          </button>
        </td>
        <td class="px-4 py-3">
          <div class="flex gap-1">
            <VcButton size="sm" variant="outline" @click="$emit('edit', item.id)">
              <VcIcon name="pencil" size="xs" />
            </VcButton>
            <VcButton size="sm" variant="outline" color="danger" @click="$emit('delete', item.id)">
              <VcIcon name="delete-bin" size="xs" />
            </VcButton>
          </div>
        </td>
      </tr>
    </template>
  </VcTable>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { NotificationTemplateType } from "../../types";

interface IProps {
  templates: NotificationTemplateType[];
}

defineProps<IProps>();

defineEmits<{
  (event: "toggle", id: string): void;
  (event: "edit", id: string): void;
  (event: "delete", id: string): void;
}>();

const { t } = useI18n();

const columns = computed<VcTableColumnType[]>(() => [
  { id: "name", title: t("pages.admin.tenants.template_name_label") },
  { id: "channel", title: t("pages.admin.tenants.template_channel_label") },
  { id: "subject", title: t("pages.admin.tenants.template_subject_label") },
  { id: "variables", title: t("pages.admin.tenants.template_variables_label") },
  { id: "enabled", title: t("pages.admin.tenants.enabled_label") },
  { id: "actions", title: t("pages.admin.tenants.actions_label") },
]);

function channelColor(channel: NotificationTemplateType["channel"]): VcBadgeColorType {
  switch (channel) {
    case "email":
      return "primary";
    case "sms":
      return "info";
    case "push":
      return "warning";
    case "in_app":
      return "success";
    default:
      return "neutral";
  }
}
</script>
