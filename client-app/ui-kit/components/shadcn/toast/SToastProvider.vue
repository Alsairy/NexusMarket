<script setup lang="ts">
import { useToast } from "./useToast";
import SToast from "./SToast.vue";

withDefaults(
  defineProps<{
    /**
     * Maximum number of visible toasts. Older toasts are dismissed first.
     */
    max?: number;
  }>(),
  {
    max: 5,
  },
);

const { toasts, dismiss } = useToast();
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed bottom-4 right-4 z-[100] flex max-h-screen w-full max-w-sm flex-col-reverse gap-2"
    >
      <TransitionGroup
        name="s-toast"
        tag="div"
        class="flex flex-col-reverse gap-2"
      >
        <SToast
          v-for="toast in toasts.slice(-max)"
          :key="toast.id"
          :variant="toast.variant"
          :title="toast.title"
          :description="toast.description"
          :action="toast.action"
          @close="dismiss(toast.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.s-toast-enter-active {
  animation: s-toast-slide-in 300ms ease-out;
}

.s-toast-leave-active {
  animation: s-toast-slide-out 200ms ease-in forwards;
}

.s-toast-move {
  transition: transform 300ms ease;
}

@keyframes s-toast-slide-in {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes s-toast-slide-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
