<template>
  <div class="flex flex-col gap-6">
    <!-- Categories -->
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-neutral-700">
          {{ $t("pages.admin.tenants.categories_label") }}
        </span>
        <VcButton size="sm" variant="outline" @click="addCategory">
          <VcIcon name="plus" size="xs" />
          {{ $t("pages.admin.tenants.add_category_button") }}
        </VcButton>
      </div>

      <div class="flex flex-col gap-1">
        <div
          v-for="(category, index) in localCategories"
          :key="index"
          class="flex items-center gap-2 rounded-md border border-neutral-200 bg-additional-50 px-3 py-2"
        >
          <!-- Drag handle (simulated) -->
          <span class="cursor-grab text-neutral-300">
            <VcIcon name="drag-handler" size="xs" />
          </span>

          <input
            v-model="localCategories[index]"
            type="text"
            class="flex-1 bg-transparent text-sm focus:outline-none"
          />

          <button
            class="text-neutral-400 hover:text-danger-500 transition-colors"
            @click="removeCategory(index)"
          >
            <VcIcon name="delete-bin" size="xs" />
          </button>
        </div>
      </div>
    </div>

    <!-- Custom Attributes -->
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-neutral-700">
          {{ $t("pages.admin.tenants.custom_attributes_label") }}
        </span>
        <VcButton size="sm" variant="outline" @click="addAttribute">
          <VcIcon name="plus" size="xs" />
          {{ $t("pages.admin.tenants.add_attribute_button") }}
        </VcButton>
      </div>

      <VcTable
        :columns="attributeColumns"
        :items="localAttributes"
        :hide-default-footer="true"
        :description="$t('pages.admin.tenants.custom_attributes_description')"
        mobile-breakpoint="lg"
      >
        <template #mobile-item="{ item, index }">
          <div class="grid grid-cols-2 gap-y-3 border-b border-neutral-200 p-5">
            <div class="col-span-2 flex items-center justify-between">
              <input
                v-model="localAttributes[index].label"
                type="text"
                class="font-bold bg-transparent focus:outline-none"
              />
              <button
                class="text-neutral-400 hover:text-danger-500"
                @click="removeAttribute(index)"
              >
                <VcIcon name="delete-bin" size="xs" />
              </button>
            </div>

            <div class="flex flex-col">
              <span class="text-xs text-neutral-400">
                {{ $t("pages.admin.tenants.attribute_key_label") }}
              </span>
              <input
                v-model="localAttributes[index].key"
                type="text"
                class="bg-transparent text-sm font-mono focus:outline-none"
              />
            </div>

            <div class="flex flex-col items-end">
              <span class="text-xs text-neutral-400">
                {{ $t("pages.admin.tenants.attribute_type_label") }}
              </span>
              <select
                v-model="localAttributes[index].type"
                class="bg-transparent text-sm focus:outline-none"
              >
                <option value="text">{{ $t("pages.admin.tenants.type_text") }}</option>
                <option value="number">{{ $t("pages.admin.tenants.type_number") }}</option>
                <option value="boolean">{{ $t("pages.admin.tenants.type_boolean") }}</option>
                <option value="select">{{ $t("pages.admin.tenants.type_select") }}</option>
              </select>
            </div>

            <div class="col-span-2 flex items-center gap-2">
              <input
                v-model="localAttributes[index].required"
                type="checkbox"
                class="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
              />
              <span class="text-sm text-neutral-600">
                {{ $t("pages.admin.tenants.attribute_required_label") }}
              </span>
            </div>
          </div>
        </template>

        <template #desktop-body>
          <tr
            v-for="(item, index) in localAttributes"
            :key="index"
            class="even:bg-neutral-50"
          >
            <td class="px-4 py-2">
              <input
                v-model="localAttributes[index].key"
                type="text"
                class="w-full rounded-md border border-neutral-300 bg-transparent px-2 py-1 font-mono text-xs focus:border-primary-500 focus:outline-none"
              />
            </td>
            <td class="px-4 py-2">
              <input
                v-model="localAttributes[index].label"
                type="text"
                class="w-full rounded-md border border-neutral-300 bg-transparent px-2 py-1 text-sm focus:border-primary-500 focus:outline-none"
              />
            </td>
            <td class="px-4 py-2">
              <select
                v-model="localAttributes[index].type"
                class="rounded-md border border-neutral-300 px-2 py-1 text-sm focus:border-primary-500 focus:outline-none"
              >
                <option value="text">{{ $t("pages.admin.tenants.type_text") }}</option>
                <option value="number">{{ $t("pages.admin.tenants.type_number") }}</option>
                <option value="boolean">{{ $t("pages.admin.tenants.type_boolean") }}</option>
                <option value="select">{{ $t("pages.admin.tenants.type_select") }}</option>
              </select>
            </td>
            <td class="px-4 py-2 text-center">
              <input
                v-model="localAttributes[index].required"
                type="checkbox"
                class="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
              />
            </td>
            <td class="px-4 py-2">
              <button
                class="text-neutral-400 hover:text-danger-500 transition-colors"
                @click="removeAttribute(index)"
              >
                <VcIcon name="delete-bin" size="xs" />
              </button>
            </td>
          </tr>
        </template>
      </VcTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import type { TenantTaxonomyType } from "../../types";

interface IProps {
  taxonomy: TenantTaxonomyType;
}

const props = defineProps<IProps>();

const { t } = useI18n();

const localCategories = reactive<string[]>([...props.taxonomy.categories]);
const localAttributes = reactive<TenantTaxonomyType["customAttributes"]>(
  props.taxonomy.customAttributes.map((a) => ({ ...a })),
);

const attributeColumns = computed<VcTableColumnType[]>(() => [
  { id: "key", title: t("pages.admin.tenants.attribute_key_label") },
  { id: "label", title: t("pages.admin.tenants.attribute_label_label") },
  { id: "type", title: t("pages.admin.tenants.attribute_type_label") },
  { id: "required", title: t("pages.admin.tenants.attribute_required_label"), align: "center" },
  { id: "actions", title: t("pages.admin.tenants.actions_label") },
]);

function addCategory(): void {
  localCategories.push("");
}

function removeCategory(index: number): void {
  localCategories.splice(index, 1);
}

function addAttribute(): void {
  localAttributes.push({ key: "", label: "", type: "text", required: false });
}

function removeAttribute(index: number): void {
  localAttributes.splice(index, 1);
}
</script>
