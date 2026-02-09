<template>
  <div ref="homePageAnchor">
    <!-- Hero Section - Animated gradient background -->
    <section class="relative overflow-hidden bg-neutral-950 text-additional-50">
      <!-- Animated gradient overlay -->
      <div
        class="animate-gradient absolute inset-0 opacity-20"
        style="
          background: linear-gradient(135deg, #ff6037 0%, #000000 25%, #ff6037 50%, #000000 75%, #ff6037 100%);
          background-size: 400% 400%;
        "
      ></div>
      <!-- Subtle grid pattern -->
      <div
        class="absolute inset-0 opacity-[0.03]"
        style="
          background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;1&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
        "
      ></div>

      <div class="relative mx-auto max-w-screen-2xl px-5 py-20 md:px-12 lg:py-32">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <!-- Left content -->
          <div class="animate-fade-in-up">
            <div
              class="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-300"
            >
              <span class="relative flex size-2">
                <span class="absolute inline-flex size-full animate-ping rounded-full bg-primary-400 opacity-75"></span>

                <span class="relative inline-flex size-2 rounded-full bg-primary-500"></span>
              </span>
              {{ $t("pages.home.hero.badge") }}
            </div>

            <h1 class="mb-6 text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {{ $t("pages.home.hero.title_line1") }}
              <span class="gradient-text">{{ $t("pages.home.hero.title_highlight") }}</span>
              {{ $t("pages.home.hero.title_line2") }}
            </h1>

            <p class="mb-8 max-w-xl text-lg text-neutral-400 md:text-xl">
              {{ $t("pages.home.hero.subtitle") }}
            </p>

            <div class="flex flex-col gap-4 sm:flex-row">
              <VcButton size="lg" @click="$router.push('/catalog')">
                {{ $t("pages.home.hero.cta_primary") }}
              </VcButton>

              <VcButton
                variant="outline"
                size="lg"
                class="!border-neutral-600 !text-additional-50 hover:!bg-neutral-800"
                @click="$router.push('/sign-up')"
              >
                {{ $t("pages.home.hero.cta_secondary") }}
              </VcButton>
            </div>

            <!-- Trust indicators -->
            <div class="mt-10 flex flex-wrap items-center gap-6 text-sm text-neutral-500">
              <div class="flex items-center gap-2">
                <VcIcon name="check-circle" class="fill-success-500" size="sm" />
                {{ $t("pages.home.hero.trust_1") }}
              </div>

              <div class="flex items-center gap-2">
                <VcIcon name="check-circle" class="fill-success-500" size="sm" />
                {{ $t("pages.home.hero.trust_2") }}
              </div>

              <div class="flex items-center gap-2">
                <VcIcon name="check-circle" class="fill-success-500" size="sm" />
                {{ $t("pages.home.hero.trust_3") }}
              </div>
            </div>
          </div>

          <!-- Right - Sign in form or stats -->
          <div class="animate-fade-in-right delay-200" style="opacity: 0">
            <div
              v-if="!isAuthenticated"
              class="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-8 shadow-2xl backdrop-blur-sm"
            >
              <VcTypography tag="h2" class="mb-6 !text-additional-50">
                {{ $t("pages.home.sign_in_form_title") }}
              </VcTypography>

              <SignInForm grow-buttons />
            </div>

            <div v-else class="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-8 shadow-2xl backdrop-blur-sm">
              <h3 class="mb-6 text-2xl font-bold text-additional-50">{{ $t("pages.home.hero.welcome_back") }}</h3>

              <div class="grid grid-cols-2 gap-4">
                <router-link
                  to="/account/dashboard"
                  class="card-hover rounded-xl border border-neutral-700 bg-neutral-800/50 p-4 text-center transition-colors hover:border-primary-500/50"
                >
                  <VcIcon name="outline-case" class="mx-auto mb-2 fill-primary-500" />

                  <span class="text-sm font-medium text-neutral-300">{{ $t("pages.home.hero.quick_orders") }}</span>
                </router-link>

                <router-link
                  to="/catalog"
                  class="card-hover rounded-xl border border-neutral-700 bg-neutral-800/50 p-4 text-center transition-colors hover:border-primary-500/50"
                >
                  <VcIcon name="outline-products" class="mx-auto mb-2 fill-primary-500" />

                  <span class="text-sm font-medium text-neutral-300">{{ $t("pages.home.hero.browse_catalog") }}</span>
                </router-link>

                <router-link
                  to="/cart"
                  class="card-hover rounded-xl border border-neutral-700 bg-neutral-800/50 p-4 text-center transition-colors hover:border-primary-500/50"
                >
                  <VcIcon name="cart" class="mx-auto mb-2 fill-primary-500" />

                  <span class="text-sm font-medium text-neutral-300">{{ $t("pages.home.hero.my_cart") }}</span>
                </router-link>

                <router-link
                  to="/account/orders"
                  class="card-hover rounded-xl border border-neutral-700 bg-neutral-800/50 p-4 text-center transition-colors hover:border-primary-500/50"
                >
                  <VcIcon name="outline-document" class="mx-auto mb-2 fill-primary-500" />

                  <span class="text-sm font-medium text-neutral-300">{{ $t("pages.home.hero.track_orders") }}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="border-b border-neutral-200 bg-additional-50 py-12">
      <div class="mx-auto max-w-screen-2xl px-5 md:px-12">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div v-for="(stat, idx) in stats" :key="idx" class="text-center">
            <div class="mb-1 text-3xl font-black text-neutral-900 md:text-4xl">
              {{ stat.value }}
            </div>

            <div class="text-sm font-medium text-neutral-500">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-neutral-50 py-16 lg:py-24">
      <div class="mx-auto max-w-screen-2xl px-5 md:px-12">
        <div class="mb-12 text-center lg:mb-16">
          <h2 class="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            {{ $t("pages.home.features.title") }}
          </h2>

          <p class="mx-auto max-w-2xl text-lg text-neutral-500">
            {{ $t("pages.home.features.subtitle") }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(feature, idx) in features"
            :key="idx"
            class="card-hover group rounded-2xl border border-neutral-200 bg-additional-50 p-6 transition-colors hover:border-primary-200"
          >
            <div
              class="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary-50 transition-colors group-hover:bg-primary-100"
            >
              <VcIcon :name="feature.icon" class="fill-primary-500" />
            </div>

            <h3 class="mb-2 text-lg font-bold text-neutral-900">{{ feature.title }}</h3>

            <p class="text-sm leading-relaxed text-neutral-500">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative overflow-hidden bg-neutral-950 py-16 lg:py-24">
      <div
        class="absolute inset-0 opacity-10"
        style="background: radial-gradient(circle at 30% 50%, #ff6037, transparent 60%)"
      ></div>

      <div class="relative mx-auto max-w-screen-xl px-5 text-center md:px-12">
        <h2 class="mb-4 text-3xl font-bold text-additional-50 lg:text-4xl">
          {{ $t("pages.home.cta.title") }}
        </h2>

        <p class="mx-auto mb-8 max-w-2xl text-lg text-neutral-400">
          {{ $t("pages.home.cta.subtitle") }}
        </p>

        <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <VcButton size="lg" @click="$router.push('/sign-up')">
            {{ $t("pages.home.cta.button_primary") }}
          </VcButton>

          <VcButton
            variant="outline"
            size="lg"
            class="!border-neutral-600 !text-additional-50 hover:!bg-neutral-800"
            @click="$router.push('/catalog')"
          >
            {{ $t("pages.home.cta.button_secondary") }}
          </VcButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from "@unhead/vue";
import { useElementVisibility } from "@vueuse/core";
import { computed, shallowRef } from "vue";
import { useI18n } from "vue-i18n";
import { usePageTitle } from "@/core/composables/usePageTitle";
import { SignInForm, useUser } from "@/shared/account";

const { t } = useI18n();
const { isAuthenticated } = useUser();

const homePageAnchor = shallowRef<HTMLElement | null>(null);
const homePageAnchorIsVisible = useElementVisibility(homePageAnchor);

const { title: pageTitle } = usePageTitle(t("pages.home.meta.title"));

useSeoMeta({
  title: () => (homePageAnchorIsVisible.value ? pageTitle.value : undefined),
  keywords: () => (homePageAnchorIsVisible.value ? t("pages.home.meta.keywords") : undefined),
  description: () => (homePageAnchorIsVisible.value ? t("pages.home.meta.description") : undefined),
  ogUrl: () => (homePageAnchorIsVisible.value ? window.location.toString() : undefined),
  ogTitle: () => (homePageAnchorIsVisible.value ? t("pages.home.meta.title") : undefined),
  ogDescription: () => (homePageAnchorIsVisible.value ? t("pages.home.meta.description") : undefined),
  ogType: () => (homePageAnchorIsVisible.value ? "website" : undefined),
});

const stats = computed(() => [
  { value: "188+", label: t("pages.home.stats.products") },
  { value: "53", label: t("pages.home.stats.categories") },
  { value: "100%", label: t("pages.home.stats.verified") },
  { value: "24/7", label: t("pages.home.stats.support") },
]);

const features = computed(() => [
  {
    icon: "outline-case",
    title: t("pages.home.features.feature_1_title"),
    description: t("pages.home.features.feature_1_desc"),
  },
  {
    icon: "outline-payments",
    title: t("pages.home.features.feature_2_title"),
    description: t("pages.home.features.feature_2_desc"),
  },
  {
    icon: "outline-products",
    title: t("pages.home.features.feature_3_title"),
    description: t("pages.home.features.feature_3_desc"),
  },
  {
    icon: "outline-document",
    title: t("pages.home.features.feature_4_title"),
    description: t("pages.home.features.feature_4_desc"),
  },
]);
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #ff6037, #ff8a6d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
