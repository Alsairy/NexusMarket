<template>
  <div ref="demoPageAnchor">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-neutral-950 text-additional-50">
      <div
        class="animate-gradient absolute inset-0 opacity-15"
        style="
          background: linear-gradient(
            135deg,
            var(--color-primary-500) 0%,
            #000000 30%,
            var(--color-primary-500) 60%,
            #000000 100%
          );
          background-size: 400% 400%;
        "
      ></div>

      <div
        class="absolute inset-0 opacity-[0.03]"
        style="
          background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;1&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
        "
      ></div>

      <div class="relative mx-auto max-w-screen-2xl px-5 py-20 md:px-12 lg:py-32">
        <div class="mx-auto max-w-3xl text-center">
          <div
            class="mb-4 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-300"
          >
            <span class="relative flex size-2">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-primary-400 opacity-75"></span>

              <span class="relative inline-flex size-2 rounded-full bg-primary-500"></span>
            </span>
            {{ $t("pages.demo_landing.hero.badge") }}
          </div>

          <h1 class="mb-6 animate-fade-in-up text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {{ $t("pages.demo_landing.hero.title_line1") }}
            <span class="gradient-text">{{ $t("pages.demo_landing.hero.title_highlight") }}</span>
          </h1>

          <p class="mb-10 animate-fade-in-up text-lg text-neutral-400 delay-200 md:text-xl" style="opacity: 0">
            {{ $t("pages.demo_landing.hero.subtitle") }}
          </p>

          <div
            class="flex animate-fade-in-up flex-col items-center justify-center gap-4 delay-300 sm:flex-row"
            style="opacity: 0"
          >
            <VcButton size="lg" @click="$router.push('/catalog')">
              {{ $t("pages.demo_landing.hero.cta_primary") }}
            </VcButton>

            <VcButton variant="outline" size="lg" class="!border-neutral-600 !text-additional-50 hover:!bg-neutral-800">
              {{ $t("pages.demo_landing.hero.cta_secondary") }}
            </VcButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="border-b border-neutral-200 bg-additional-50 py-10">
      <div class="mx-auto max-w-screen-2xl px-5 md:px-12">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div class="text-center">
            <div class="mb-1 text-3xl font-black text-neutral-900 md:text-4xl">
              {{ $t("pages.demo_landing.stats.stat_1_value") }}
            </div>

            <div class="text-sm font-medium text-neutral-500">{{ $t("pages.demo_landing.stats.stat_1_label") }}</div>
          </div>

          <div class="text-center">
            <div class="mb-1 text-3xl font-black text-neutral-900 md:text-4xl">
              {{ $t("pages.demo_landing.stats.stat_2_value") }}
            </div>

            <div class="text-sm font-medium text-neutral-500">{{ $t("pages.demo_landing.stats.stat_2_label") }}</div>
          </div>

          <div class="text-center">
            <div class="mb-1 text-3xl font-black text-neutral-900 md:text-4xl">
              {{ $t("pages.demo_landing.stats.stat_3_value") }}
            </div>

            <div class="text-sm font-medium text-neutral-500">{{ $t("pages.demo_landing.stats.stat_3_label") }}</div>
          </div>

          <div class="text-center">
            <div class="mb-1 text-3xl font-black text-neutral-900 md:text-4xl">
              {{ $t("pages.demo_landing.stats.stat_4_value") }}
            </div>

            <div class="text-sm font-medium text-neutral-500">{{ $t("pages.demo_landing.stats.stat_4_label") }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-neutral-50 py-16 lg:py-24">
      <div class="mx-auto max-w-screen-xl px-5 md:px-12">
        <div class="mb-12 text-center lg:mb-16">
          <h2 class="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            {{ $t("pages.demo_landing.features.title") }}
          </h2>

          <p class="mx-auto max-w-2xl text-lg text-neutral-500">
            {{ $t("pages.demo_landing.features.subtitle") }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            class="card-hover group rounded-2xl border border-neutral-200 bg-additional-50 p-8 transition-colors hover:border-primary-200"
          >
            <div
              class="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary-50 transition-colors group-hover:bg-primary-100"
            >
              <svg
                class="size-7 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>

            <h3 class="mb-3 text-xl font-bold text-neutral-900">
              {{ $t("pages.demo_landing.features.feature_1.title") }}
            </h3>

            <p class="leading-relaxed text-neutral-500">{{ $t("pages.demo_landing.features.feature_1.text") }}</p>
          </div>

          <div
            class="card-hover group rounded-2xl border border-neutral-200 bg-additional-50 p-8 transition-colors hover:border-primary-200"
          >
            <div
              class="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary-50 transition-colors group-hover:bg-primary-100"
            >
              <svg
                class="size-7 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </div>

            <h3 class="mb-3 text-xl font-bold text-neutral-900">
              {{ $t("pages.demo_landing.features.feature_2.title") }}
            </h3>

            <p class="leading-relaxed text-neutral-500">{{ $t("pages.demo_landing.features.feature_2.text") }}</p>
          </div>

          <div
            class="card-hover group rounded-2xl border border-neutral-200 bg-additional-50 p-8 transition-colors hover:border-primary-200"
          >
            <div
              class="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary-50 transition-colors group-hover:bg-primary-100"
            >
              <svg
                class="size-7 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
            </div>

            <h3 class="mb-3 text-xl font-bold text-neutral-900">
              {{ $t("pages.demo_landing.features.feature_3.title") }}
            </h3>

            <p class="leading-relaxed text-neutral-500">{{ $t("pages.demo_landing.features.feature_3.text") }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="bg-additional-50 py-16 lg:py-24">
      <div class="mx-auto max-w-screen-2xl px-5 md:px-12">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            {{ $t("pages.demo_landing.products_block.title") }}
          </h2>

          <p class="mx-auto max-w-2xl text-lg text-neutral-500">
            {{ $t("pages.demo_landing.products_block.message") }}
          </p>
        </div>

        <VcProductsGrid
          :columns="{
            default: 1,
            xs: 2,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            '2xl': 4,
          }"
        >
          <ProductCard v-for="(item, index) in products" :key="index" :product="item" lazy />
        </VcProductsGrid>

        <div class="mt-10 text-center">
          <VcButton variant="outline" @click="$router.push('/catalog')">
            {{ $t("pages.demo_landing.products_block.choose_button") }}
          </VcButton>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative overflow-hidden bg-neutral-950 py-16 lg:py-24">
      <div
        class="absolute inset-0 opacity-10"
        style="background: radial-gradient(circle at 70% 50%, var(--color-primary-500), transparent 60%)"
      ></div>

      <div class="relative mx-auto max-w-screen-xl px-5 text-center md:px-12">
        <h2 class="mb-4 text-3xl font-bold text-additional-50 lg:text-4xl">
          {{ $t("pages.demo_landing.cta.title") }}
        </h2>

        <p class="mx-auto mb-8 max-w-2xl text-lg text-neutral-400">
          {{ $t("pages.demo_landing.cta.subtitle") }}
        </p>

        <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <VcButton size="lg" @click="$router.push('/sign-up')">
            {{ $t("pages.demo_landing.cta.button_primary") }}
          </VcButton>

          <VcButton variant="outline" size="lg" class="!border-neutral-600 !text-additional-50 hover:!bg-neutral-800">
            {{ $t("pages.demo_landing.cta.button_secondary") }}
          </VcButton>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="bg-neutral-50 py-16 lg:py-20">
      <div class="mx-auto max-w-screen-sm px-5 text-center md:px-12">
        <h2 class="mb-2 text-2xl font-bold text-neutral-900 lg:text-3xl">
          {{ $t("pages.demo_landing.subscription_block.primary_text") }}
        </h2>

        <p class="mb-8 text-neutral-500">
          {{ $t("pages.demo_landing.subscription_block.secondary_text") }}
        </p>

        <div class="flex flex-col gap-3 sm:flex-row">
          <VcInput class="grow" :placeholder="$t('pages.demo_landing.subscription_block.input_placeholder')" />

          <VcButton class="shrink-0">
            {{ $t("pages.demo_landing.subscription_block.submit_button") }}
          </VcButton>
        </div>

        <div class="mt-4">
          <VcCheckbox class="inline-flex text-sm text-neutral-500">
            {{ $t("pages.demo_landing.subscription_block.agreement_checkbox_label") }}
            <router-link class="text-[--link-color] hover:text-[--link-hover-color]" to="/terms">
              {{ $t("pages.demo_landing.subscription_block.terms_and_policy_link") }}
            </router-link>
          </VcCheckbox>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from "@unhead/vue";
import { useElementVisibility } from "@vueuse/core";
import { onMounted, shallowRef } from "vue";
import { useI18n } from "vue-i18n";
import { useBreadcrumbs, usePageTitle } from "@/core/composables";
import { ProductCard, useProducts } from "@/shared/catalog";

const { t } = useI18n();
const { products, fetchProducts } = useProducts();
const { title: pageTitle } = usePageTitle(t("pages.demo_landing.meta.title"));

const demoPageAnchor = shallowRef<HTMLElement | null>(null);
const demoPageAnchorIsVisible = useElementVisibility(demoPageAnchor);

useSeoMeta({
  title: () => (demoPageAnchorIsVisible.value ? pageTitle.value : undefined),
});

useBreadcrumbs([{ title: t("shared.layout.footer.demo_landing_link") }]);

onMounted(async () => {
  await fetchProducts({
    itemsPerPage: 8,
  });
});
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-400));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
