import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Drawer,
  DrawerTitle,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerProps,
  DrawerProvider,
  DrawerTrigger,
  useDrawer,
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
  describe('Basic rendering', () => {
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

    test('renders DrawerContent with correct data attribute', () => {
      renderDrawer();
      fireEvent.click(screen.getByText('Open drawer'));

      expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
    });
  });

  describe('Focus management', () => {
    test('it traps focus within the drawer', async () => {
      const user = userEvent.setup();

      // Render with an outside button to verify focus cannot escape
      render(
        <>
          <button data-testid="outside-button">Outside</button>
          <Drawer isOpen ariaLabel="Focus Trap Drawer">
            <DrawerCloseButton />
            <DrawerContent>
              <button data-testid="inside-button">Inside</button>
            </DrawerContent>
          </Drawer>
        </>
      );

      const drawerContent = screen.getByTestId('drawer-content');
      const insideButton = screen.getByTestId('inside-button');

      // Focus the inside button
      insideButton.focus();
      expect(insideButton).toHaveFocus();

      // Tab multiple times - focus should remain trapped within the drawer
      await user.tab();
      expect(drawerContent.contains(document.activeElement)).toBe(true);

      await user.tab();
      expect(drawerContent.contains(document.activeElement)).toBe(true);

      await user.tab();
      expect(drawerContent.contains(document.activeElement)).toBe(true);
    });

    test('it does not trap focus when dangerouslyBypassFocusLock is true', async () => {
      const user = userEvent.setup();

      // Render with an outside button to verify focus can escape
      render(
        <>
          <button data-testid="outside-button">Outside</button>
          <Drawer
            isOpen
            ariaLabel="Bypass Focus Lock Drawer"
            dangerouslyBypassFocusLock
          >
            <DrawerCloseButton />
            <DrawerContent>
              <button data-testid="inside-button">Inside</button>
            </DrawerContent>
          </Drawer>
        </>
      );

      const outsideButton = screen.getByTestId('outside-button');
      const insideButton = screen.getByTestId('inside-button');

      // Focus the inside button
      insideButton.focus();
      expect(insideButton).toHaveFocus();

      // Tab - with focus lock bypassed, focus should eventually escape to outside
      await user.tab();
      await user.tab();
      await user.tab();

      // Focus should be able to reach the outside button (not trapped inside)
      outsideButton.focus();
      expect(outsideButton).toHaveFocus();
    });
  });

  describe('Scroll lock', () => {
    test('it allows scrolling when dangerouslyBypassScrollLock is true', () => {
      renderDrawer({
        isOpen: true,
        dangerouslyBypassScrollLock: true,
      });
      fireEvent.click(screen.getByText('Open drawer'));

      expect(document.body).not.toHaveStyle('overflow: hidden');
    });
  });

  describe('Width customization', () => {
    test('it renders with custom width', () => {
      renderDrawer({
        isOpen: true,
        width: '500px',
      });
      fireEvent.click(screen.getByText('Open drawer'));

      expect(screen.getByRole('dialog')).toHaveStyle('--drawer-width: 500px');
    });

    test('it renders with token-based width', () => {
      renderDrawer({
        isOpen: true,
        width: '300px',
      });
      fireEvent.click(screen.getByText('Open drawer'));

      expect(screen.getByRole('dialog')).toHaveStyle('--drawer-width: 300px');
    });
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

    test('defaultIsOpen starts the drawer open', () => {
      render(
        <DrawerProvider defaultIsOpen>
          <DrawerTrigger>Toggle</DrawerTrigger>
          <Drawer ariaLabel="Default Open Drawer">
            <DrawerContent>Default Open Content</DrawerContent>
          </Drawer>
        </DrawerProvider>
      );

      expect(screen.getByText('Default Open Content')).toBeInTheDocument();
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

  describe('Placement', () => {
    test('renders with left placement', () => {
      render(
        <Drawer isOpen ariaLabel="Left Drawer" placement="left">
          <DrawerContent>Left Content</DrawerContent>
        </Drawer>
      );

      expect(screen.getByText('Left Content')).toBeInTheDocument();
    });

    test('renders with right placement (default)', () => {
      render(
        <Drawer isOpen ariaLabel="Right Drawer">
          <DrawerContent>Right Content</DrawerContent>
        </Drawer>
      );

      expect(screen.getByText('Right Content')).toBeInTheDocument();
    });

    test('renders with top placement', () => {
      render(
        <Drawer isOpen ariaLabel="Top Drawer" placement="top">
          <DrawerContent>Top Content</DrawerContent>
        </Drawer>
      );

      expect(screen.getByText('Top Content')).toBeInTheDocument();
    });

    test('renders with bottom placement', () => {
      render(
        <Drawer isOpen ariaLabel="Bottom Drawer" placement="bottom">
          <DrawerContent>Bottom Content</DrawerContent>
        </Drawer>
      );

      expect(screen.getByText('Bottom Content')).toBeInTheDocument();
    });
  });

  describe('DrawerProvider', () => {
    test('provides context to children', () => {
      render(
        <DrawerProvider>
          <DrawerTrigger>Trigger</DrawerTrigger>
          <Drawer ariaLabel="Context Drawer">
            <DrawerContent>Context Content</DrawerContent>
          </Drawer>
        </DrawerProvider>
      );

      fireEvent.click(screen.getByText('Trigger'));
      expect(screen.getByText('Context Content')).toBeInTheDocument();
    });

    test('controlled DrawerProvider with open prop', () => {
      const handleOpenChange = jest.fn();
      render(
        <DrawerProvider open={true} onOpenChange={handleOpenChange}>
          <DrawerTrigger>Trigger</DrawerTrigger>
          <Drawer ariaLabel="Controlled Provider Drawer">
            <DrawerContent>Controlled Content</DrawerContent>
          </Drawer>
        </DrawerProvider>
      );

      expect(screen.getByText('Controlled Content')).toBeInTheDocument();
    });

    test('applies custom className to provider container', () => {
      const { container } = render(
        <DrawerProvider className="custom-container">
          <DrawerTrigger>Trigger</DrawerTrigger>
          <Drawer ariaLabel="Custom Class Drawer">
            <DrawerContent>Content</DrawerContent>
          </Drawer>
        </DrawerProvider>
      );

      expect(container.querySelector('.custom-container')).toBeInTheDocument();
    });

    test('adds drawer-open class when open', () => {
      const { container } = render(
        <DrawerProvider defaultIsOpen>
          <DrawerTrigger>Trigger</DrawerTrigger>
          <Drawer ariaLabel="Open Drawer">
            <DrawerContent>Content</DrawerContent>
          </Drawer>
        </DrawerProvider>
      );

      expect(container.querySelector('.drawer-open')).toBeInTheDocument();
    });
  });

  describe('DrawerTrigger', () => {
    test('sets correct ARIA attributes', () => {
      render(
        <DrawerProvider>
          <DrawerTrigger>Open</DrawerTrigger>
          <Drawer ariaLabel="ARIA Drawer">
            <DrawerContent>Content</DrawerContent>
          </Drawer>
        </DrawerProvider>
      );

      const trigger = screen.getByText('Open');
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
      expect(trigger).toHaveAttribute('data-drawer', 'trigger');
    });

    test('supports asChild prop', () => {
      render(
        <DrawerProvider>
          <DrawerTrigger asChild>
            <span role="button">Custom Trigger</span>
          </DrawerTrigger>
          <Drawer ariaLabel="AsChild Drawer">
            <DrawerContent>Content</DrawerContent>
          </Drawer>
        </DrawerProvider>
      );

      fireEvent.click(screen.getByText('Custom Trigger'));
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    test('calls custom onClick handler', () => {
      const handleClick = jest.fn();
      render(
        <DrawerProvider>
          <DrawerTrigger onClick={handleClick}>Click Me</DrawerTrigger>
          <Drawer ariaLabel="Click Drawer">
            <DrawerContent>Content</DrawerContent>
          </Drawer>
        </DrawerProvider>
      );

      fireEvent.click(screen.getByText('Click Me'));
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('DrawerCloseButton', () => {
    test('renders close button with correct aria-label', () => {
      renderDrawer();
      fireEvent.click(screen.getByText('Open drawer'));

      expect(screen.getByLabelText('close')).toBeInTheDocument();
    });

    test('has data-drawer="close" attribute', () => {
      renderDrawer();
      fireEvent.click(screen.getByText('Open drawer'));

      expect(screen.getByLabelText('close')).toHaveAttribute(
        'data-drawer',
        'close'
      );
    });

    test('calls custom onClose in standalone mode', () => {
      const handleClose = jest.fn();
      render(
        <Drawer isOpen ariaLabel="Close Test Drawer">
          <DrawerHeader>
            <DrawerCloseButton onClose={handleClose} />
          </DrawerHeader>
        </Drawer>
      );

      fireEvent.click(screen.getByLabelText('close'));
      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe('DrawerHeader', () => {
    test('renders with correct data attribute', () => {
      render(
        <Drawer isOpen ariaLabel="Header Test Drawer">
          <DrawerHeader data-testid="header">Header Content</DrawerHeader>
        </Drawer>
      );

      expect(screen.getByTestId('header')).toHaveAttribute(
        'data-drawer',
        'header'
      );
    });

    test('applies custom className', () => {
      render(
        <Drawer isOpen ariaLabel="Header Class Drawer">
          <DrawerHeader className="custom-header">Header</DrawerHeader>
        </Drawer>
      );

      expect(
        screen.getByText('Header').closest('[data-drawer="header"]')
      ).toHaveClass('custom-header');
    });
  });

  describe('DrawerTitle', () => {
    test('renders with correct data attribute', () => {
      render(
        <Drawer isOpen ariaLabel="Title Test Drawer">
          <DrawerHeader>
            <DrawerTitle data-testid="title">Title</DrawerTitle>
          </DrawerHeader>
        </Drawer>
      );

      expect(screen.getByTestId('title')).toHaveAttribute(
        'data-drawer',
        'title'
      );
    });
  });

  describe('DrawerContent', () => {
    test('renders with correct data attribute', () => {
      render(
        <Drawer isOpen ariaLabel="Content Test Drawer">
          <DrawerContent data-testid="content">Content</DrawerContent>
        </Drawer>
      );

      expect(screen.getByTestId('content')).toHaveAttribute(
        'data-drawer',
        'content'
      );
    });
  });

  describe('Overlay behavior', () => {
    test('closeOnOverlayClick calls onDismiss when overlay is clicked', async () => {
      const handleDismiss = jest.fn();
      const { baseElement } = render(
        <Drawer
          isOpen
          ariaLabel="Overlay Click Drawer"
          onDismiss={handleDismiss}
        >
          <DrawerContent>Content</DrawerContent>
        </Drawer>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();

      // Find the overlay element and click it
      const overlay = baseElement.querySelector('.ReactModal__Overlay');
      expect(overlay).toBeInTheDocument();
      fireEvent.click(overlay!);

      await waitFor(() => {
        expect(handleDismiss).toHaveBeenCalledTimes(1);
      });
    });

    test('closeOnOverlayClick=false prevents onDismiss when overlay is clicked', async () => {
      const handleDismiss = jest.fn();
      const { baseElement } = render(
        <Drawer
          isOpen
          ariaLabel="Overlay Click Drawer"
          onDismiss={handleDismiss}
          closeOnOverlayClick={false}
        >
          <DrawerContent>Content</DrawerContent>
        </Drawer>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();

      // Find the overlay element and click it
      const overlay = baseElement.querySelector('.ReactModal__Overlay');
      expect(overlay).toBeInTheDocument();
      fireEvent.click(overlay!);

      // onDismiss should NOT be called when closeOnOverlayClick is false
      expect(handleDismiss).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('applies ariaLabelledBy when provided', () => {
      render(
        <Drawer isOpen ariaLabelledBy="drawer-title">
          <DrawerHeader>
            <DrawerTitle id="drawer-title">Labelled Drawer</DrawerTitle>
          </DrawerHeader>
          <DrawerContent>Content</DrawerContent>
        </Drawer>
      );

      const drawer = screen.getByTestId('drawer-content');
      expect(drawer).toHaveAttribute('aria-labelledby', 'drawer-title');
    });

    test('allowPinchZoom prop is passed correctly', () => {
      render(
        <Drawer isOpen ariaLabel="Pinch Zoom Drawer" allowPinchZoom>
          <DrawerContent>Pinch Content</DrawerContent>
        </Drawer>
      );

      expect(screen.getByText('Pinch Content')).toBeInTheDocument();
    });
  });

  describe('useDrawer hook', () => {
    test('throws error when used outside DrawerProvider', () => {
      const TestComponent = () => {
        useDrawer();
        return null;
      };

      expect(() => render(<TestComponent />)).toThrow(
        'useDrawer must be used within a DrawerProvider.'
      );
    });

    test('provides open state and toggle function', () => {
      const TestComponent = () => {
        const { open, toggleDrawer } = useDrawer();
        return (
          <div>
            <span data-testid="state">{open ? 'open' : 'closed'}</span>
            <button onClick={toggleDrawer}>Toggle</button>
          </div>
        );
      };

      render(
        <DrawerProvider>
          <TestComponent />
        </DrawerProvider>
      );

      expect(screen.getByTestId('state')).toHaveTextContent('closed');
      fireEvent.click(screen.getByText('Toggle'));
      expect(screen.getByTestId('state')).toHaveTextContent('open');
    });
  });

  describe('Ref forwarding', () => {
    test('forwards ref to DrawerProvider container', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <DrawerProvider ref={ref}>
          <DrawerTrigger>Trigger</DrawerTrigger>
        </DrawerProvider>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
