<template>
  <psypres-theme-provider
    :theme="theme"
    v-bind="$attrs"
  >
    <slot></slot>
  </psypres-theme-provider>
</template>

<script>
import '@psypres/shared-ui';

export default {
  name: 'PsypresThemeProvider',
  inheritAttrs: false,
  props: {
    theme: {
      type: String,
      default: null
    }
  }
};
</script> 