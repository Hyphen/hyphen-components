import React, { useRef } from 'react';
import { Modal } from './Modal';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { useOpenClose } from '../../hooks/useOpenClose/useOpenClose';
import { userEvent, within } from '@storybook/test';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

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
          <Button variant="secondary" onClick={closeModal} shadow="sm">
            Cancel
          </Button>
          <Button variant="primary" shadow="sm">
            Primary Action
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const OpenModal: Story = {
  play: async ({ canvasElement, mount }) => {
    await mount(<BasicUsage />);
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Show Modal'));
  },
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
          <Button variant="secondary" onClick={closeModal} shadow="sm">
            Cancel
          </Button>
          <Button variant="primary" shadow="sm">
            Primary Action
          </Button>
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
          <Button variant="secondary" onClick={closeModal} shadow="sm">
            Cancel
          </Button>
          <Button variant="primary" shadow="sm">
            Primary Action
          </Button>
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
        maxWidth={{ tablet: '8xl', desktop: '9xl' }}
        initialFocusRef={ref}
      >
        <Modal.Header
          id="titleFooterBody"
          title="The Modal Title"
          onDismiss={closeModal}
        />
        <Modal.Body>Modal body content</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            ref={ref}
            onClick={closeModal}
            shadow="sm"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
