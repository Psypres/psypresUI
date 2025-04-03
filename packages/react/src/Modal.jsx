import React, { useEffect, useRef, forwardRef } from 'react';
import '@psypres/shared-ui';

const Modal = forwardRef(({
  children,
  open = false,
  size = 'medium',
  title = '',
  closeOnOverlay = true,
  hideCloseButton = false,
  onOpen,
  onClose,
  footer,
  ...props
}, ref) => {
  const modalRef = useRef(null);
  const combinedRef = (el) => {
    modalRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (open) {
      modal.showModal();
    } else {
      modal.closeModal();
    }
  }, [open]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const handleModalOpen = () => {
      if (onOpen) onOpen();
    };

    const handleModalClose = () => {
      if (onClose) onClose();
    };

    modal.addEventListener('modal-open', handleModalOpen);
    modal.addEventListener('modal-close', handleModalClose);

    return () => {
      modal.removeEventListener('modal-open', handleModalOpen);
      modal.removeEventListener('modal-close', handleModalClose);
    };
  }, [onOpen, onClose]);

  return (
    <psypres-modal
      ref={combinedRef}
      size={size}
      title={title}
      close-on-overlay={closeOnOverlay ? '' : null}
      hide-close-button={hideCloseButton ? '' : null}
      {...props}
    >
      {children}
      {footer && <div slot="footer">{footer}</div>}
    </psypres-modal>
  );
});

Modal.displayName = 'Modal';

export default Modal; 