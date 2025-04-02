<template>
  <psypres-header
    :level="level"
    :variant="variant"
    v-bind="$attrs"
  >
    <slot></slot>
  </psypres-header>
</template>

<script>
import '@psypres/shared-ui';

export default {
  name: 'PsypresHeader',
  inheritAttrs: false,
  props: {
    level: {
      type: [String, Number],
      default: '1',
      validator: (value) => {
        const numValue = parseInt(value, 10);
        return numValue >= 1 && numValue <= 6;
      }
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'primary', 'secondary', 'success', 'danger'].includes(value)
    }
  }
};
</script> 