<template>
  <div class="badges-wrapper">
    <slot />
  </div>
</template>

<style lang="scss">
.badges-wrapper {
  --radius: var(--badges-wrapper-radius, calc(var(--vc-radius, 0.5rem) + 2px));

  @apply absolute -start-px -top-px flex items-center gap-1 z-[1] bg-additional-50 max-w-full rounded-ee-[--radius] pb-0.5 pe-0.5 ps-px pt-px;

  &:empty {
    @apply hidden;
  }

  &::after,
  &::before {
    @apply content-[''] absolute size-[--radius];

    background-image: radial-gradient(
      circle at right bottom,
      transparent var(--radius),
      var(--color-additional-50) var(--radius)
    );
  }

  &::after {
    @apply top-0 -right-[--radius];
  }

  &::before {
    @apply start-0 -bottom-[--radius];
  }
}
</style>
