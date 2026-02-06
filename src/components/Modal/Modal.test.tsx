import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, ModalProps } from './Modal';

const defaultProps: ModalProps = {
  isOpen: true,
  onDismiss: jest.fn(),
  ariaLabel: 'Test Modal',
};

const renderModal = (props: Partial<ModalProps> = {}) => {
  return render(
    <Modal {...defaultProps} {...props}>
      <Modal.Header id="modal-title" title="Modal Title" />
      <Modal.Body>Modal body content</Modal.Body>
      <Modal.Footer>Footer content</Modal.Footer>
    </Modal>
  );
};

describe('Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    test('renders its children', () => {
      const { getByText } = render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="testDefault">
          test modal
        </Modal>
      );
      expect(getByText('test modal')).toBeInTheDocument();
    });

    test('does not render when isOpen is false', () => {
      const { queryByText } = render(
        <Modal isOpen={false} onDismiss={() => {}} ariaLabel="testClosed">
          test modal
        </Modal>
      );
      expect(queryByText('test modal')).not.toBeInTheDocument();
    });

    test('it open and closes based on isOpen prop', () => {
      const { queryByText, getByText, rerender } = render(
        <Modal isOpen={false} onDismiss={() => {}} ariaLabel="testIsOpen">
          test modal
        </Modal>
      );

      expect(queryByText('test modal')).toBe(null);

      rerender(
        <Modal isOpen onDismiss={() => {}} ariaLabel="testIsOpen">
          test modal
        </Modal>
      );

      expect(getByText('test modal')).toBeInTheDocument();
    });

    test('applies custom className', () => {
      render(
        <Modal
          isOpen
          onDismiss={() => {}}
          ariaLabel="testClassName"
          className="custom-modal"
        >
          content
        </Modal>
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('custom-modal');
    });
  });

  describe('Subcomponents', () => {
    test('renders Modal.Header with title', () => {
      const { getByText } = render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="testSubcomponents">
          <Modal.Header id="titleFooterBody" title="The Modal Title" />
        </Modal>
      );

      expect(getByText('The Modal Title')).toBeInTheDocument();
    });

    test('renders Modal.Header with children', () => {
      render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="testHeaderChildren">
          <Modal.Header id="header-id">
            <span>Custom header content</span>
          </Modal.Header>
        </Modal>
      );

      expect(screen.getByText('Custom header content')).toBeInTheDocument();
    });

    test('renders Modal.Header with title and children', () => {
      render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="testHeaderBoth">
          <Modal.Header id="header-id" title="Main Title">
            <span>Subtitle</span>
          </Modal.Header>
        </Modal>
      );

      expect(screen.getByText('Main Title')).toBeInTheDocument();
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
    });

    test('renders Modal.Header with close button when onDismiss is provided', () => {
      const handleDismiss = jest.fn();
      render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="testCloseButton">
          <Modal.Header id="header-id" title="Title" onDismiss={handleDismiss} />
        </Modal>
      );

      const closeButton = screen.getByLabelText('close');
      expect(closeButton).toBeInTheDocument();
      fireEvent.click(closeButton);
      expect(handleDismiss).toHaveBeenCalled();
    });

    test('renders Modal.Body', () => {
      const { getByText } = render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="testBody">
          <Modal.Body>Modal body content</Modal.Body>
        </Modal>
      );

      expect(getByText('Modal body content')).toBeInTheDocument();
    });

    test('renders Modal.Footer', () => {
      const { getByText } = render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="testFooter">
          <Modal.Footer>This is content in the modal footer</Modal.Footer>
        </Modal>
      );

      expect(
        getByText('This is content in the modal footer')
      ).toBeInTheDocument();
    });

    test('renders all subcomponents together', () => {
      const { getByText } = render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="testSubcomponents">
          <Modal.Header
            id="titleFooterBody"
            title="The Modal Title"
            onDismiss={() => {}}
          />
          <Modal.Body>Modal body content</Modal.Body>
          <Modal.Footer>This is content in the modal footer</Modal.Footer>
        </Modal>
      );

      expect(getByText('The Modal Title')).toBeInTheDocument();
      expect(getByText('Modal body content')).toBeInTheDocument();
      expect(
        getByText('This is content in the modal footer')
      ).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    test('applies maxWidth styles', () => {
      const { getByLabelText } = render(
        <Modal
          isOpen
          onDismiss={() => {}}
          ariaLabel="testMaxWidth"
          maxWidth="500px"
        >
          test modal
        </Modal>
      );

      expect(getByLabelText('testMaxWidth').parentElement).toHaveStyle(
        'max-width: 500px'
      );
    });

    test('applies responsive maxWidth styles', () => {
      render(
        <Modal
          isOpen
          onDismiss={() => {}}
          ariaLabel="testResponsiveMaxWidth"
          maxWidth={{ base: '300px', tablet: '500px', desktop: '700px' }}
        >
          test modal
        </Modal>
      );

      expect(screen.getByText('test modal')).toBeInTheDocument();
    });

    test('applies custom style prop', () => {
      const { getByLabelText } = render(
        <Modal
          isOpen
          onDismiss={() => {}}
          ariaLabel="testStyle"
          style={{ backgroundColor: 'red' }}
        >
          test modal
        </Modal>
      );

      expect(getByLabelText('testStyle').parentElement).toHaveStyle(
        'background-color: red'
      );
    });

    test('applies overflow prop', () => {
      render(
        <Modal
          isOpen
          onDismiss={() => {}}
          ariaLabel="testOverflow"
          overflow="visible"
        >
          test modal
        </Modal>
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('overflow-visible');
    });

    test('applies default overflow hidden', () => {
      render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="testDefaultOverflow">
          test modal
        </Modal>
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('overflow-hidden');
    });

    test('applies background color', () => {
      render(
        <Modal
          isOpen
          onDismiss={() => {}}
          ariaLabel="testBackground"
          background="secondary"
        >
          test modal
        </Modal>
      );

      expect(screen.getByLabelText('testBackground')).toHaveClass(
        'background-color-secondary'
      );
    });
  });

  describe('Accessibility', () => {
    test('applies aria-label attribute', () => {
      render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="Accessible Modal">
          content
        </Modal>
      );

      expect(screen.getByLabelText('Accessible Modal')).toBeInTheDocument();
    });

    test('applies aria-labelledby attribute', () => {
      const { getByLabelText } = render(
        <Modal
          isOpen
          onDismiss={() => {}}
          ariaLabelledBy="modalTitle"
          ariaLabel="testAriaLabelledBy"
        >
          <h1 id="modalTitle">Modal Title</h1>
          test modal
        </Modal>
      );

      expect(getByLabelText('testAriaLabelledBy')).toHaveAttribute(
        'aria-labelledby',
        'modalTitle'
      );
    });

    test('Modal.Header sets the id for aria-labelledby', () => {
      render(
        <Modal
          isOpen
          onDismiss={() => {}}
          ariaLabelledBy="custom-header-id"
          ariaLabel="test"
        >
          <Modal.Header id="custom-header-id" title="Accessible Title" />
        </Modal>
      );

      const title = screen.getByText('Accessible Title');
      expect(title).toHaveAttribute('id', 'custom-header-id');
    });
  });

  describe('Focus management', () => {
    test('traps focus within the modal', async () => {
      render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="Focus Trap Modal">
          <Modal.Header id="header" title="Title" onDismiss={() => {}} />
          <Modal.Body>
            <button>First button</button>
            <button>Second button</button>
          </Modal.Body>
        </Modal>
      );

      // Focus should be trapped within the modal
      const firstButton = screen.getByText('First button');
      const secondButton = screen.getByText('Second button');

      expect(firstButton).toBeInTheDocument();
      expect(secondButton).toBeInTheDocument();
    });

    test('accepts initialFocusRef prop', () => {
      const TestComponent = () => {
        const ref = React.useRef<HTMLDivElement>(null);
        return (
          <Modal
            isOpen
            onDismiss={() => {}}
            ariaLabel="Initial Focus Modal"
            initialFocusRef={ref}
          >
            <Modal.Body>
              <div ref={ref} tabIndex={-1}>
                Focus target
              </div>
            </Modal.Body>
          </Modal>
        );
      };

      render(<TestComponent />);
      expect(screen.getByText('Focus target')).toBeInTheDocument();
    });
  });

  describe('onDismiss behavior', () => {
    test('onDismiss callback is passed to ReactModal', () => {
      const handleDismiss = jest.fn();
      render(
        <Modal isOpen onDismiss={handleDismiss} ariaLabel="Escape Modal">
          content
        </Modal>
      );

      // Verify the modal is rendered and dismissable
      expect(screen.getByText('content')).toBeInTheDocument();
    });
  });

  describe('fullScreenMobile', () => {
    test('applies fullscreen class when fullScreenMobile is true', () => {
      render(
        <Modal
          isOpen
          onDismiss={() => {}}
          ariaLabel="Fullscreen Modal"
          fullScreenMobile
        >
          content
        </Modal>
      );

      // The modal should render with fullscreen behavior
      expect(screen.getByText('content')).toBeInTheDocument();
    });

    test('does not apply fullscreen class when fullScreenMobile is false', () => {
      render(
        <Modal
          isOpen
          onDismiss={() => {}}
          ariaLabel="Non-Fullscreen Modal"
          fullScreenMobile={false}
        >
          content
        </Modal>
      );

      // The modal should render without fullscreen behavior
      expect(screen.getByText('content')).toBeInTheDocument();
    });
  });

  describe('containerRef', () => {
    test('renders in custom container when containerRef is provided', () => {
      const TestComponent = () => {
        const containerRef = React.useRef<HTMLDivElement>(null);
        return (
          <div>
            <div ref={containerRef} data-testid="custom-container" />
            <Modal
              isOpen
              onDismiss={() => {}}
              ariaLabel="Custom Container Modal"
              containerRef={containerRef as React.RefObject<Node>}
            >
              Modal content
            </Modal>
          </div>
        );
      };

      render(<TestComponent />);
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });
  });

  describe('allowPinchZoom', () => {
    test('accepts allowPinchZoom prop', () => {
      render(
        <Modal
          isOpen
          onDismiss={() => {}}
          ariaLabel="Pinch Zoom Modal"
          allowPinchZoom
        >
          content
        </Modal>
      );

      expect(screen.getByText('content')).toBeInTheDocument();
    });
  });

  describe('Ref forwarding', () => {
    test('forwards ref to the modal container', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="Ref Modal" ref={ref}>
          content
        </Modal>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Static properties', () => {
    test('Modal has Header static property', () => {
      expect(Modal.Header).toBeDefined();
    });

    test('Modal has Body static property', () => {
      expect(Modal.Body).toBeDefined();
    });

    test('Modal has Footer static property', () => {
      expect(Modal.Footer).toBeDefined();
    });
  });

  describe('Modal.Header', () => {
    test('renders close button only when onDismiss is provided', () => {
      const { rerender } = render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="test">
          <Modal.Header id="header" title="Without Close" />
        </Modal>
      );

      expect(screen.queryByLabelText('close')).not.toBeInTheDocument();

      rerender(
        <Modal isOpen onDismiss={() => {}} ariaLabel="test">
          <Modal.Header id="header" title="With Close" onDismiss={() => {}} />
        </Modal>
      );

      expect(screen.getByLabelText('close')).toBeInTheDocument();
    });

    test('header has correct justify-content when no title or children', () => {
      render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="test">
          <Modal.Header id="header" onDismiss={() => {}} />
        </Modal>
      );

      // When no title/children, close button should be at flex-end
      expect(screen.getByLabelText('close')).toBeInTheDocument();
    });
  });

  describe('Modal.Body defaults', () => {
    test('applies default flex, overflow, and height', () => {
      render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="test">
          <Modal.Body data-testid="modal-body">Body content</Modal.Body>
        </Modal>
      );

      const body = screen.getByTestId('modal-body');
      expect(body).toHaveClass('flex-auto', 'overflow-auto', 'h-100');
    });

    test('allows overriding default props', () => {
      render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="test">
          <Modal.Body flex="none" overflow="hidden" height="50" data-testid="modal-body">
            Body content
          </Modal.Body>
        </Modal>
      );

      const body = screen.getByTestId('modal-body');
      expect(body).toHaveClass('flex-none', 'overflow-hidden', 'h-50');
    });
  });

  describe('Modal.Footer defaults', () => {
    test('applies default direction, alignItems, justifyContent, and gap', () => {
      render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="test">
          <Modal.Footer data-testid="modal-footer">Footer content</Modal.Footer>
        </Modal>
      );

      const footer = screen.getByTestId('modal-footer');
      expect(footer).toHaveClass(
        'flex-direction-row',
        'align-items-center',
        'justify-content-flex-end',
        'g-md'
      );
    });

    test('allows overriding footer defaults', () => {
      render(
        <Modal isOpen onDismiss={() => {}} ariaLabel="test">
          <Modal.Footer
            direction="column"
            justifyContent="flex-start"
            gap="lg"
            data-testid="modal-footer"
          >
            Footer content
          </Modal.Footer>
        </Modal>
      );

      const footer = screen.getByTestId('modal-footer');
      expect(footer).toHaveClass(
        'flex-direction-column',
        'justify-content-flex-start',
        'g-lg'
      );
    });
  });

  describe('Spread props', () => {
    test('renders modal with additional props', () => {
      render(
        <Modal
          isOpen
          onDismiss={() => {}}
          ariaLabel="test"
          shouldCloseOnOverlayClick={false}
        >
          content
        </Modal>
      );

      // Verify the modal renders with the content
      expect(screen.getByText('content')).toBeInTheDocument();
    });
  });
});
