<template>
  <psypres-modal
    :ref="modalRef"
    :size="size"
    :title="title"
    :close-on-overlay="closeOnOverlay ? '' : null"
    :hide-close-button="hideCloseButton ? '' : null"
    v-bind="$attrs"
  >
    <slot></slot>
    <template v-if="$slots.footer">
      <div slot="footer">
        <slot name="footer"></slot>
      </div>
    </template>
  </psypres-modal>
</template>

<script>
import '@psypres/shared-ui';
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'PsypresModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large', 'auto'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    closeOnOverlay: {
      type: Boolean,
      default: true
    },
    hideCloseButton: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'open', 'close'],
  setup(props, { emit }) {
    const modalRef = ref(null);

    const updateModalState = () => {
      if (!modalRef.value) return;
      
      const modal = modalRef.value;
      if (props.modelValue) {
        modal.showModal();
      } else {
        modal.closeModal();
      }
    };

    // Watch for changes to modelValue prop
    watch(() => props.modelValue, () => {
      updateModalState();
    });

    // Create handlers outside lifecycle hooks so we can reference them in cleanup
    const handleModalOpen = () => {
      emit('update:modelValue', true);
      emit('open');
    };
    
    const handleModalClose = () => {
      emit('update:modelValue', false);
      emit('close');
    };

    // Setup event listeners
    onMounted(() => {
      if (!modalRef.value) return;
      
      const modal = modalRef.value;
      
      modal.addEventListener('modal-open', handleModalOpen);
      modal.addEventListener('modal-close', handleModalClose);
      
      // Set initial state
      updateModalState();
    });
    
    // Clean up event listeners
    onBeforeUnmount(() => {
      if (!modalRef.value) return;
      
      const modal = modalRef.value;
      modal.removeEventListener('modal-open', handleModalOpen);
      modal.removeEventListener('modal-close', handleModalClose);
    });

    return {
      modalRef
    };
  }
};
</script> 