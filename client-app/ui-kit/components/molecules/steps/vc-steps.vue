<template>
  <ul class="vc-steps">
    <transition-group :name="transitionName">
      <li
        v-for="(step, index) in steps.filter((step) => !step.hidden)"
        :key="step.text"
        :class="[
          'vc-steps__item',
          {
            'vc-steps__item--active': isActiveStep(index),
            'vc-steps__item--completed': isCompletedStep(index),
            'vc-steps__item--disabled': !isCompletedStep(index) && isDisabledStep(step),
          },
        ]"
      >
        <component
          :is="step.route && isCompletedStep(index) && !isDisabledStep(step) ? 'router-link' : 'span'"
          :to="step.route"
          class="vc-steps__step"
        >
          <span class="vc-steps__icon">
            <!-- Custom icon -->
            <VcIcon v-if="step.icon" :name="step.icon" size="xxs" />

            <!-- Completed icon -->
            <VcIcon v-else-if="isCompletedStep(index)" name="check-bold" size="xxs" />

            <!-- Step number -->
            <template v-else>{{ index + startStepIndex }}</template>
          </span>

          <span class="vc-steps__text">{{ step.text }}</span>
        </component>
      </li>
    </transition-group>
  </ul>
</template>

<script setup lang="ts">
interface IProps {
  steps?: IStepsItem[];
  currentStepIndex?: number;
  startStepIndex?: number;
  disabled?: boolean;
  transitionName?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  steps: () => [],
  currentStepIndex: -1,
  startStepIndex: 1,
});

function isActiveStep(index: number) {
  return index + props.startStepIndex === props.currentStepIndex;
}

function isCompletedStep(index: number) {
  return index + props.startStepIndex < props.currentStepIndex;
}

function isDisabledStep(step: IStepsItem) {
  return step.disabled || props.disabled;
}
</script>

<style lang="scss">
.vc-steps {
  $itemActive: "";
  $itemCompleted: "";
  $itemDisabled: "";

  @apply flex flex-wrap items-center gap-y-2.5;

  &__item {
    @apply flex items-center;

    &:not(:last-child)::after {
      content: "";
      @apply block w-8 h-px bg-neutral-300 mx-2;

      @media (min-width: theme("screens.md")) {
        @apply w-12 mx-3;
      }
    }

    &--active {
      $itemActive: &;

      &:not(:last-child)::after {
        @apply bg-neutral-300;
      }
    }

    &--completed {
      $itemCompleted: &;

      &:not(:last-child)::after {
        @apply bg-primary-300;
      }
    }

    &--disabled {
      $itemDisabled: &;
    }
  }

  &__step {
    @apply flex items-center gap-2;
  }

  &__icon {
    @apply flex shrink-0 items-center justify-center w-7 h-7 rounded-full
    text-xs font-black text-additional-50 bg-neutral-300 transition-colors duration-200;

    #{$itemActive}:not(#{$itemDisabled}) & {
      @apply bg-primary ring-4 ring-primary-100;
    }

    #{$itemCompleted}:not(#{$itemDisabled}) & {
      @apply bg-primary-600;
    }
  }

  &__text {
    @apply text-sm font-semibold text-neutral-500 transition-colors duration-200;

    #{$itemActive}:not(#{$itemDisabled}) & {
      @apply text-neutral-950 font-bold;
    }

    #{$itemCompleted}:not(#{$itemDisabled}) & {
      @apply text-primary-700;
    }
  }
}
</style>
