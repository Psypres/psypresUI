<template>
  <psypres-button
    :variant="variant"
    :size="size"
    :disabled="disabled"
    v-bind="$attrs"
    @click="onClick"
  >
    <slot></slot>
  </psypres-button>
</template>

<script>
import '@psypres/shared-ui';

export default {
  name: 'PsypresButton',
  inheritAttrs: false,
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick(event) {
      this.$emit('click', event.detail.originalEvent);
    }
  }
};
</script> 