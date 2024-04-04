import React, { useRef } from 'react';
import { Modal } from './Modal';
import type { Meta } from '@storybook/react';
import { Button } from '../Button/Button';
import { useOpenClose } from '../../hooks/useOpenClose/useOpenClose';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;

export const BasicUsage = () => {
  const {
    isOpen: isModalOpen,
    handleOpen: openModal,
    handleClose: closeModal,
  } = useOpenClose();
  return (
    <div>
      <Button variant="primary" onClick={openModal}>
        Show Modal
      </Button>
      <Modal
        ariaLabelledBy="titleBasic"
        isOpen={isModalOpen}
        onDismiss={closeModal}
      >
        <Modal.Header
          id="titleBasic"
          title="The Modal Title"
          onDismiss={closeModal}
        />
        <Modal.Body>Modal content</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary-neutral" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary">Primary Action</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const BodyAndFooter = () => {
  const {
    isOpen: isModalOpen,
    handleOpen: openModal,
    handleClose: closeModal,
  } = useOpenClose();
  return (
    <div>
      <Button variant="primary" onClick={openModal}>
        Show Modal With Body and Footer
      </Button>
      <Modal
        ariaLabelledBy="titleFooterBody"
        isOpen={isModalOpen}
        onDismiss={closeModal}
      >
        <Modal.Header
          id="titleFooterBody"
          title="The Modal Title"
          onDismiss={closeModal}
        />
        <Modal.Body>Modal body content</Modal.Body>
        <Modal.Footer>This is content in the modal footer</Modal.Footer>
      </Modal>
    </div>
  );
};

export const CloseButton = () => {
  const {
    isOpen: isModalOpen,
    handleOpen: openModal,
    handleClose: closeModal,
  } = useOpenClose();
  return (
    <div>
      <Button variant="primary" onClick={openModal}>
        Show Modal With Close Button
      </Button>
      <Modal
        ariaLabel="modal with close button"
        isOpen={isModalOpen}
        onDismiss={closeModal}
      >
        <Modal.Header id="header" onDismiss={closeModal} />
        <Modal.Body>Modal content</Modal.Body>
      </Modal>
    </div>
  );
};

export const WithoutHeader = () => {
  const {
    isOpen: isModalOpen,
    handleOpen: openModal,
    handleClose: closeModal,
  } = useOpenClose();
  return (
    <div>
      <Button variant="primary" onClick={openModal}>
        Show Modal Without Header
      </Button>
      <Modal
        ariaLabel="Modal without a header"
        isOpen={isModalOpen}
        onDismiss={closeModal}
      >
        <Modal.Body>Modal content</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary-neutral" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary">Primary Action</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const FullscreenMobile = () => {
  const {
    isOpen: isModalOpen,
    handleOpen: openModal,
    handleClose: closeModal,
  } = useOpenClose();
  return (
    <div>
      <Button variant="primary" onClick={openModal}>
        Show Fullscreen On Mobile Modal
      </Button>
      <Modal
        ariaLabelledBy="titleFullscreen"
        fullScreenMobile
        isOpen={isModalOpen}
        onDismiss={closeModal}
      >
        <Modal.Header
          id="titleFullscreen"
          title="Fullscreen Modal on Mobile"
          onDismiss={closeModal}
        />
        <Modal.Body>Modal content</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary-neutral" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary">Primary Action</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const MaxWidth = () => {
  const {
    isOpen: isModalOpen,
    handleOpen: openModal,
    handleClose: closeModal,
  } = useOpenClose();
  const ref = useRef(null);

  return (
    <div>
      <Button variant="primary" onClick={openModal}>
        Open Max Width Modal
      </Button>
      <Modal
        ariaLabelledBy="titleFooterBody"
        isOpen={isModalOpen}
        onDismiss={closeModal}
        maxWidth={{ tablet: '3xl', desktop: '4xl', hd: '5xl' }}
        initialFocusRef={ref}
      >
        <Modal.Header
          id="titleFooterBody"
          title="The Modal Title"
          onDismiss={closeModal}
        />
        <Modal.Body>Modal body content</Modal.Body>
        <Modal.Footer>
          This is content in the modal footer
          <Button variant="secondary-neutral" ref={ref} onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
