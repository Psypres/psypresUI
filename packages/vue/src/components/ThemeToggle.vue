<template>
  <psypres-theme-toggle
    :size="size"
    v-bind="$attrs"
  />
</template>

<script>
import '@psypres/shared-ui';

export default {
  name: 'PsypresThemeToggle',
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  }
};
</script> 