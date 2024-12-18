import React, {
  CSSProperties,
  RefObject,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import ReactModal from 'react-modal';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import classNames from 'classnames';
import { DimensionSize, CssDimensionValue } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import styles from './Drawer.module.scss';
import { Button, ButtonProps } from '../Button/Button';

interface DrawerContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextProps | null>(null);

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider.');
  }
  return context;
}

interface DrawerProviderProps extends React.ComponentProps<'div'> {
  defaultIsOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export const DrawerProvider = forwardRef<HTMLDivElement, DrawerProviderProps>(
  (
    {
      defaultIsOpen = false,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [_open, _setOpen] = useState(openProp ?? defaultIsOpen);
    const open = openProp ?? _open;

    const setOpen = useCallback(
      (value: boolean | ((prev: boolean) => boolean)) => {
        const newOpen = typeof value === 'function' ? value(open) : value;
        if (newOpen !== open) {
          if (setOpenProp) {
            setOpenProp(newOpen); // Controlled
          } else {
            _setOpen(newOpen); // Uncontrolled
          }
        }
      },
      [open, setOpenProp]
    );

    const toggleDrawer = useCallback(() => {
      setOpen((prev) => !prev);
    }, [setOpen]);

    const contextValue = useMemo(
      () => ({ open, setOpen, toggleDrawer }),
      [open, setOpen, toggleDrawer]
    );

    return (
      <DrawerContext.Provider value={contextValue}>
        <div
          className={classNames(
            'drawer-container',
            { 'drawer-open': open },
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </DrawerContext.Provider>
    );
  }
);

DrawerProvider.displayName = 'DrawerProvider';

const DrawerTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & {
    asChild?: boolean;
  }
>(({ asChild = false, onClick, ...triggerProps }, ref) => {
  const context = useContext(DrawerContext);
  const isStandalone = !context;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (!isStandalone) {
      // Use context to toggle the drawer
      context?.toggleDrawer();
    }
  };

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      data-drawer="trigger"
      aria-haspopup="dialog"
      aria-expanded={context?.open}
      data-state={context?.open}
      aria-label="toggle drawer"
      {...triggerProps}
      onClick={handleClick}
    />
  );
});
DrawerTrigger.displayName = 'SidebarTrigger';

export type DrawerPlacementType = 'left' | 'right' | 'top' | 'bottom';
export interface DrawerProps {
  /**
   * If the drawer is open (controlled mode)
   */
  isOpen?: boolean;
  /**
   * If the drawer starts open (uncontrolled mode)
   */
  defaultIsOpen?: boolean;
  /**
   * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
   */
  allowPinchZoom?: boolean;
  /**
   * A drawer needs to be properly labeled to provide context for users with
   * assistive technology such as screen readers. If a drawer is announced to
   * the user without a label, it can be confusing and difficult to navigate.
   */
  ariaLabel?: string;
  /**
   * The id of the element that should be used as the drawer's label by assistive technologies like screen readers.
   */
  ariaLabelledBy?: string;
  /**
   * Contents of the dialog.
   */
  children?: React.ReactNode;
  /**
   * Additional class names to add to the drawer content.
   */
  className?: string;
  /**
   * If true, the drawer will close when the overlay is clicked
   */
  closeOnOverlayClick?: boolean;
  /**
   * The ref of the container where the drawer will be inserted into the DOM.
   * By default, drawers are inserted in the document.body, but if need be they can
   * be scoped as necessary.
   */
  containerRef?: React.RefObject<Node>;
  /**
   * By default, focus is trapped within the drawer.
   * If true, focus will not be trapped within the contents of the drawer.
   */
  dangerouslyBypassFocusLock?: boolean;
  /**
   * By default, the drawer locks scrolling on the body, but in some cases you may want to allow for scrolling.
   * If true, this will allow the body to scroll while the drawer is open.
   */
  dangerouslyBypassScrollLock?: boolean;
  /**
   * If true, the overlay will not be rendered, scrolling for the entire page will remain enabled,
   * and focus will not be locked to the contents of the drawer
   */
  hideOverlay?: boolean;
  /**
   * By default the first focusable element will receive focus when the dialog
   * opens but you can provide a ref to focus instead.
   *
   * @see Docs https://reach.tech/dialog#dialog-initialfocusref
   */
  initialFocusRef?: RefObject<HTMLDivElement>;
  /**
   * Which edge of the viewport should the drawer appear from
   */
  placement?: DrawerPlacementType;
  /**
   * Function that is called whenever the user either hits
   *  the "Escape" key, clicks the close button icon, or clicks the overlay.
   */
  onDismiss?: (event?: React.SyntheticEvent) => void;
  /**
   * The width of the Drawer when opened. Can be given a standard css value (px, rem, em, %),
   * or a [width token](/?path=/story/design-tokens-design-tokens--page#width)
   */
  width?: DimensionSize | CssDimensionValue;
}
const Drawer: React.FC<DrawerProps> = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      ariaLabel = undefined,
      ariaLabelledBy = undefined,
      allowPinchZoom = false,
      children = undefined,
      className = undefined,
      closeOnOverlayClick = true,
      containerRef = undefined,
      dangerouslyBypassFocusLock = false,
      dangerouslyBypassScrollLock = false,
      hideOverlay = false,
      initialFocusRef = undefined,
      isOpen: controlledIsOpen,
      defaultIsOpen = false,
      onDismiss = undefined,
      placement = 'right',
      width = undefined,
    },
    ref
  ) => {
    const context = useContext(DrawerContext);
    const isStandalone = !context; // Determine if there's no provider

    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultIsOpen);
    const isOpen = isStandalone
      ? controlledIsOpen ?? uncontrolledOpen // Use internal or prop-based state
      : context.open; // Use context-provided state

    const setOpen = isStandalone
      ? setUncontrolledOpen // Update internal state
      : context.setOpen; // Update context state

    const handleDismiss = useCallback(
      (event?: React.SyntheticEvent) => {
        setOpen(false); // Update state (context or standalone)
        onDismiss?.(event); // Trigger external callback
      },
      [setOpen, onDismiss]
    );

    const activateFocusLock = useCallback(() => {
      setTimeout(() => {
        if (initialFocusRef && initialFocusRef.current) {
          initialFocusRef.current.focus();
        }
      }, 100);
    }, [initialFocusRef]);

    const dynamicWidth = width;

    const dynamicStyle: CSSProperties = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ['--drawer-width' as any]: dynamicWidth,
    };

    const overlayClassnames = classNames(styles.overlay, styles.drawer, {
      [styles['hide-overlay']]: hideOverlay,
      [styles[`hide-overlay-${placement}`]]: hideOverlay,
      'position-fixed': containerRef === undefined,
      'position-absolute': containerRef !== undefined,
    });

    const contentClassnames = classNames(
      styles['drawer-content'],
      styles[placement],
      {
        [styles['hide-overlay']]: hideOverlay,
      }
    );

    const parentElement = containerRef?.current
      ? (containerRef.current as HTMLElement)
      : document.body;

    const isDisabledFocusLock = hideOverlay || dangerouslyBypassFocusLock;
    const isDisabledRemoveScroll = hideOverlay || dangerouslyBypassScrollLock;

    return (
      <FocusLock
        autoFocus
        returnFocus
        disabled={isDisabledFocusLock || !isOpen}
        onActivation={activateFocusLock}
      >
        <RemoveScroll
          allowPinchZoom={allowPinchZoom}
          enabled={!isDisabledRemoveScroll && isOpen}
        >
          <Box ref={ref}>
            <ReactModal
              isOpen={isOpen}
              overlayClassName={overlayClassnames}
              className={contentClassnames}
              onRequestClose={closeOnOverlayClick ? handleDismiss : undefined}
              ariaHideApp={false}
              style={{
                content: dynamicStyle,
                overlay: dynamicStyle,
              }}
              parentSelector={() => parentElement}
            >
              <Box
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                height="100"
                data-testid="drawer-content"
                className={className}
              >
                {children}
              </Box>
            </ReactModal>
          </Box>
        </RemoveScroll>
      </FocusLock>
    );
  }
);

const DrawerHeader = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        data-drawer="header"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding={{ base: '2xl 2xl 0 2xl', tablet: '3xl 3xl 0 3xl' }}
        {...props}
      />
    );
  }
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerTitle = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ ...props }, ref) => {
    return <Box ref={ref} data-drawer="title" fontWeight="bold" {...props} />;
  }
);

const DrawerCloseButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & { onClose?: () => void }
>(({ className, onClick, onClose, ...rest }, ref) => {
  const context = useContext(DrawerContext);
  const isStandalone = !context;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (isStandalone) {
      // Fallback to onClose if provided
      onClose?.();
    } else {
      // Use context to toggle the drawer
      context?.toggleDrawer();
    }
  };

  return (
    <Button
      variant="tertiary"
      aria-label="close"
      type="button"
      iconPrefix="remove"
      data-drawer="close"
      className={classNames('m-left-auto', className)}
      size="sm"
      onClick={handleClick}
      ref={ref}
      {...rest}
    />
  );
});
DrawerCloseButton.displayName = 'DrawerCloseButton';

const DrawerContent = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        data-drawer="content"
        flex="auto"
        overflow="auto"
        alignItems="flex-start"
        padding={{ base: '2xl', tablet: '3xl' }}
        gap="md"
        {...props}
      />
    );
  }
);

export {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerCloseButton,
};
