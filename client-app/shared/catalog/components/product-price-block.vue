<template>
  <VcWidget class="product-price-block" :title="widgetTitle">
    <template v-if="!isMobile" #default>
      <ProductPrice
        class="product-price-block__product-price"
        :product="product"
        :variations="variations"
        :template-layout="templateLayout"
      />
    </template>

    <template #footer-container>
      <div class="product-price-block__actions">
        <AddToList class="product-price-block__add-to-list" :product="product" :icon-size="20" />

        <AddToCompareCatalog class="product-price-block__add-to-compare" :product="product" :icon-size="20" />

        <VcPopover class="product-price-block__share-popover" :offset-options="8" z-index="10" enable-teleport>
          <template #default="{ triggerProps, opened }">
            <button
              type="button"
              :aria-label="$t('common.buttons.share')"
              :class="['product-price-block__share-button', { 'product-price-block__share-button--active': opened }]"
              v-bind="triggerProps"
            >
              <VcIcon name="share" size="sm" aria-hidden="true" />
            </button>
          </template>

          <template #content="{ close }">
            <div class="product-price-block__share-content">
              <h3 class="product-price-block__share-header">
                <span class="product-price-block__share-title">
                  {{ $t("shared.catalog.product_details.share_product_label") }}
                </span>

                <button
                  class="product-price-block__share-close"
                  type="button"
                  :aria-label="$t('ui_kit.buttons.close')"
                  @click="close()"
                >
                  <VcIcon name="delete-thin" size="sm" aria-hidden="true" />
                </button>
              </h3>

              <div class="product-price-block__share-services">
                <a
                  v-for="socialSharingService in $cfg.social_sharing_services"
                  :key="socialSharingService.name"
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="getProductSocialShareUrl(socialSharingService.url_template, pageUrl)"
                  :aria-label="
                    $t('common.accessibility.share_via_opens_in_new_window', { service: socialSharingService.name })
                  "
                  class="product-price-block__share-service"
                >
                  <VcImage
                    class="product-price-block__share-icon"
                    width="40"
                    height="40"
                    :src="socialSharingService.icon"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </template>
        </VcPopover>

        <a
          :href="mailToLink"
          :aria-label="$t('common.buttons.send_link_email')"
          target="_blank"
          rel="noopener noreferrer"
          class="product-price-block__mail-link"
        >
          <VcIcon name="mail" size="sm" aria-hidden="true" />
        </a>

        <button
          :aria-label="$t('common.buttons.print')"
          class="product-price-block__print-button"
          type="button"
          @click="print()"
        >
          <VcIcon name="printer" size="sm" aria-hidden="true" />
        </button>
      </div>
    </template>
  </VcWidget>
</template>

<script setup lang="ts">
import { computed, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { stringFormat } from "@/core/utilities";
import { AddToCompareCatalog } from "@/shared/compare/components";
import { AddToList } from "@/shared/wishlists";
import { VcIcon } from "@/ui-kit/components";
import ProductPrice from "./product-price.vue";
import type { Product } from "@/core/api/graphql/types";

interface IProps {
  product: Product;
  isMobile?: boolean;
  variations?: Product[];
  templateLayout?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  isMobile: false,
});

const route = useRoute();
const { t } = useI18n();

const isMobile = toRef(props, "isMobile");

const widgetTitle = computed(() => {
  return isMobile.value
    ? t("shared.catalog.product_details.price_block.mobile_title")
    : t("shared.catalog.product_details.price_block.title");
});

const pageUrl = computed(() => location.origin + route.path);

const mailToLink = computed(
  () =>
    `mailto:?subject=${encodeURIComponent(
      t("shared.catalog.product_details.price_block.product_email_title", [props.product?.name]),
    )}&body=${encodeURIComponent(pageUrl.value)}`,
);

function getProductSocialShareUrl(urlTemplate: string, url: string): string {
  return stringFormat(urlTemplate, url);
}

function print() {
  window.print();
}
</script>

<style lang="scss" scoped>
.product-price-block {
  &__actions {
    @apply flex select-none divide-x divide-neutral-200 border-t border-neutral-200 print:hidden;
  }

  &__add-to-list,
  &__add-to-compare,
  &__share-popover {
    @apply w-1/5 transition-colors duration-200 hover:bg-primary-50;
  }

  &__share-button {
    @apply flex size-full cursor-pointer items-center justify-center text-neutral-500 transition-colors duration-200 hover:text-primary hover:bg-primary-50;

    &--active {
      @apply text-primary bg-primary-50;
    }
  }

  &__mail-link,
  &__print-button {
    @apply flex w-1/5 cursor-pointer items-center justify-center px-2 py-4 text-neutral-500 transition-colors duration-200 hover:text-primary hover:bg-primary-50;
  }

  &__share-content {
    @apply rounded-lg border border-neutral-200 bg-additional-50 p-5 shadow-xl;
  }

  &__share-header {
    @apply flex justify-between text-lg font-bold text-neutral-900;
  }

  &__share-title {
    @apply flex grow;
  }

  &__share-close {
    @apply -me-1 flex p-1.5 rounded-full text-neutral-400 transition-colors duration-200 hover:text-danger-600 hover:bg-danger-50;
  }

  &__share-services {
    @apply mt-5 flex items-center space-x-5;
  }

  &__share-icon {
    @apply rounded-md transition-transform duration-200 hover:scale-110;
  }
}
</style>
