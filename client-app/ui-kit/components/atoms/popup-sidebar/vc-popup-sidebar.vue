<template>
  <teleport to="body">
    <div class="vc-popup-sidebar">
      <!-- Sidebar back cover -->
      <transition name="fade">
        <div
          v-if="isVisible"
          class="vc-popup-sidebar__backdrop"
          role="button"
          tabindex="0"
          @click="onHide"
          @keypress="onHide"
        />
      </transition>

      <!-- Sidebar content -->
      <transition
        :enter-from-class="isRtl ? 'translate-x-full' : '-translate-x-full'"
        :leave-to-class="isRtl ? 'translate-x-full' : '-translate-x-full'"
        enter-active-class="will-change-transform"
        leave-active-class="will-change-transform"
      >
        <VcDialog v-if="isVisible" v-bind="$attrs" class="vc-popup-sidebar__dialog" dividers>
          <VcDialogHeader @close="onHide">
            {{ title ?? $t("ui_kit.buttons.filters") }}
          </VcDialogHeader>

          <VcDialogContent>
            <slot />
          </VcDialogContent>

          <VcDialogFooter>
            <div class="vc-popup-sidebar__footer">
              <slot name="footer" />
            </div>
          </VcDialogFooter>
        </VcDialog>
      </transition>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { syncRefs, useScrollLock } from "@vueuse/core";
import { toRefs } from "vue";
import { useRtl } from "@/core/composables";

interface IEmits {
  (event: "hide"): void;
}

interface IProps {
  isVisible?: boolean;
  title?: string;
}

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits<IEmits>();
const props = defineProps<IProps>();

const { isVisible } = toRefs(props);
const { isRtl } = useRtl();

syncRefs(isVisible, useScrollLock(document.body));

function onHide() {
  emit("hide");
}
</script>

<style lang="scss">
.vc-popup-sidebar {
  &__backdrop {
    @apply fixed inset-0 z-50 size-full bg-neutral-900/30;
  }

  &__dialog {
    @apply fixed inset-y-2 start-2 z-50 w-[calc(100%-1rem)] max-w-[21.25rem];
  }

  &__footer {
    @apply flex flex-wrap items-center gap-x-3.5 gap-y-2 w-full;
  }
}
</style>
