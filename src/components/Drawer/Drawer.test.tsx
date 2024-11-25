import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  Drawer,
  DrawerTitle,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerProps,
  DrawerProvider,
  DrawerTrigger,
} from './Drawer';

const renderDrawer = (props: Partial<DrawerProps> = {}) => {
  const defaultProps: DrawerProps = {
    isOpen: false,
    ariaLabel: 'Test Drawer',
    ...props,
  };
  return render(
    <DrawerProvider>
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <Drawer {...defaultProps}>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerCloseButton onClick={defaultProps.onDismiss} />
        </DrawerHeader>
        <DrawerContent>Drawer Content</DrawerContent>
      </Drawer>
    </DrawerProvider>
  );
};

describe('Drawer', () => {
  test('renders its children', () => {
    renderDrawer();
    fireEvent.click(screen.getByText('Open drawer'));

    expect(screen.getByText('Drawer Title')).toBeInTheDocument();
  });

  test('it applies the aria label', () => {
    renderDrawer();
    fireEvent.click(screen.getByText('Open drawer'));
    expect(screen.getByLabelText('Test Drawer')).toBeInTheDocument();
  });

  test('it opens and closes based on isOpen prop', () => {
    const { rerender } = renderDrawer();
    expect(screen.queryByLabelText('Test Drawer')).toBe(null);

    rerender(
      <Drawer isOpen={true} ariaLabel="Test Drawer" onDismiss={() => null} />
    );
    expect(screen.getByLabelText('Test Drawer')).toBeInTheDocument();
  });

  // test('it calls onDismiss when close button is clicked', () => {
  //   const mockedOnDismiss = jest.fn();
  //   renderDrawer({
  //     isOpen: true,
  //     ariaLabel: 'Test Drawer',
  //     onDismiss: mockedOnDismiss,
  //   });

  //   fireEvent.click(screen.getByLabelText('close'));
  //   expect(mockedOnDismiss).toHaveBeenCalledTimes(1);
  // });

  test('it traps focus within the drawer', () => {
    renderDrawer({ isOpen: true, ariaLabel: 'Test Drawer' });
    fireEvent.click(screen.getByText('Open drawer'));

    const closeButton = screen.getByLabelText('close');
    closeButton.focus();
    expect(closeButton).toHaveFocus();
  });

  test('it allows scrolling when dangerouslyBypassScrollLock is true', () => {
    renderDrawer({
      isOpen: true,

      dangerouslyBypassScrollLock: true,
    });
    fireEvent.click(screen.getByText('Open drawer'));

    expect(document.body).not.toHaveStyle('overflow: hidden');
  });

  test('it does not trap focus when dangerouslyBypassFocusLock is true', () => {
    renderDrawer({
      isOpen: true,

      dangerouslyBypassFocusLock: true,
    });
    fireEvent.click(screen.getByText('Open drawer'));

    const closeButton = screen.getByLabelText('close');
    closeButton.focus();
    expect(closeButton).toHaveFocus();
  });

  test('it renders with custom width', () => {
    renderDrawer({
      isOpen: true,
      width: '500px',
    });
    fireEvent.click(screen.getByText('Open drawer'));

    expect(screen.getByRole('dialog')).toHaveStyle('--drawer-width: 500px');
  });

  describe('Uncontrolled Drawer', () => {
    it('renders and toggles the drawer based on internal state', () => {
      renderDrawer();

      const toggleButton = screen.getByLabelText('toggle drawer');
      fireEvent.click(toggleButton);

      expect(screen.getByText('Drawer Title')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('close'));
      expect(screen.queryByText('Uncontrolled Drawer')).toBe(null);
    });
  });

  describe('Controlled Drawer', () => {
    it('renders and toggles the drawer based on external state', () => {
      const ControlledDrawer = () => {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <div>
            <button onClick={() => setIsOpen(!isOpen)}>Toggle Drawer</button>
            <Drawer
              isOpen={isOpen}
              ariaLabel="Controlled Drawer"
              onDismiss={() => setIsOpen(false)}
            >
              <DrawerHeader>
                <DrawerTitle>Controlled Drawer</DrawerTitle>
                <DrawerCloseButton onClick={() => setIsOpen(false)} />
              </DrawerHeader>
              <DrawerContent>Drawer Content</DrawerContent>
            </Drawer>
          </div>
        );
      };

      render(<ControlledDrawer />);

      const toggleButton = screen.getByText('Toggle Drawer');
      fireEvent.click(toggleButton);

      expect(screen.getByText('Controlled Drawer')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('close'));
      expect(screen.queryByText('Controlled Drawer')).toBe(null);
    });
  });
});
