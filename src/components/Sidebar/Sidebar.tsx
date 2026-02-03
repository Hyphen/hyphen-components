import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  forwardRef,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import { Button } from '../Button/Button';
import { Drawer } from '../Drawer/Drawer';
import { useIsMobile } from '../../hooks/useIsMobile/useIsMobile';
import { Box } from '../Box/Box';
import { IconName } from 'src/types';
import { Icon } from '../Icon/Icon';
import styles from './Sidebar.module.scss';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip/Tooltip';

const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_ICON = '44px';
const SIDEBAR_KEYBOARD_SHORTCUT_LEFT = '[';
const SIDEBAR_KEYBOARD_SHORTCUT_RIGHT = ']';

type SidebarSide = 'left' | 'right';

type SidebarOpenState = Record<SidebarSide, boolean>;

type SidebarOpenValue = boolean | Partial<SidebarOpenState>;

type SidebarStorageKey = string | Partial<Record<SidebarSide, string>>;

interface SidebarContextSideState {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean | ((open: boolean) => boolean)) => void;
  toggleSidebar: () => void;
}

const SidebarIsMobileContext = React.createContext<boolean | null>(null);
const SidebarLeftContext = React.createContext<SidebarContextSideState | null>(
  null
);
const SidebarRightContext = React.createContext<SidebarContextSideState | null>(
  null
);
const SidebarSideContext = React.createContext<SidebarSide>('left');

const resolveSideValue = (
  value: SidebarOpenValue | undefined,
  side: SidebarSide,
  fallback: boolean
) => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (value && typeof value === 'object' && typeof value[side] === 'boolean') {
    return value[side] as boolean;
  }

  return fallback;
};

const resolveControlledOpen = (
  value: SidebarOpenValue | undefined,
  side: SidebarSide
) => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (value && typeof value === 'object' && typeof value[side] === 'boolean') {
    return value[side] as boolean;
  }

  return undefined;
};

const resolveStorageKey = (
  storageKey: SidebarStorageKey,
  side: SidebarSide
) => {
  if (typeof storageKey === 'string') {
    return side === 'left' ? storageKey : `${storageKey}_right`;
  }

  if (storageKey && typeof storageKey === 'object') {
    return (
      storageKey[side] ??
      (side === 'left' ? 'sidebar_expanded' : 'sidebar_expanded_right')
    );
  }

  return side === 'left' ? 'sidebar_expanded' : 'sidebar_expanded_right';
};

const getSidebarWidth = (
  state: SidebarContextSideState['state'],
  collapsible: 'offcanvas' | 'icon' | 'none'
) =>
  state === 'collapsed' && collapsible === 'icon'
    ? 'var(--sidebar-width-icon)'
    : state === 'collapsed'
    ? '0'
    : 'var(--sidebar-width)';

const getSidebarOffsetStyles = (
  side: SidebarSide,
  state: SidebarContextSideState['state'],
  collapsible: 'offcanvas' | 'icon' | 'none'
) => {
  const isVisible = state === 'expanded' || collapsible === 'icon';
  return {
    left:
      side === 'left'
        ? isVisible
          ? '0'
          : 'calc(var(--sidebar-width)*-1)'
        : undefined,
    right:
      side === 'right'
        ? isVisible
          ? '0'
          : 'calc(var(--sidebar-width)*-1)'
        : undefined,
  };
};

const useSidebarSideState = ({
  side,
  isMobile,
  defaultOpen,
  openProp,
  onOpenChange,
  storageKey,
  lastToggledSideRef,
}: {
  side: SidebarSide;
  isMobile: boolean;
  defaultOpen: SidebarOpenValue | undefined;
  openProp: SidebarOpenValue | undefined;
  onOpenChange?: (open: boolean, side?: SidebarSide) => void;
  storageKey: SidebarStorageKey;
  lastToggledSideRef: React.MutableRefObject<SidebarSide>;
}): SidebarContextSideState => {
  const defaultFallback = typeof defaultOpen === 'boolean' ? defaultOpen : true;
  const initialDefaultOpen = resolveSideValue(
    defaultOpen,
    side,
    defaultFallback
  );
  const controlledOpen = resolveControlledOpen(openProp, side);
  const isControlled = typeof controlledOpen === 'boolean';

  const [uncontrolledOpen, setUncontrolledOpen] = useState(
    controlledOpen ?? initialDefaultOpen
  );
  const [openMobile, setOpenMobile] = useState(() =>
    isMobile ? false : controlledOpen ?? initialDefaultOpen
  );

  const open = controlledOpen ?? uncontrolledOpen;

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    } else {
      setUncontrolledOpen(controlledOpen ?? initialDefaultOpen);
    }
  }, [isMobile, controlledOpen, initialDefaultOpen]);

  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const newOpenState = typeof value === 'function' ? value(open) : value;
      if (newOpenState === open) {
        return;
      }

      if (!isControlled) {
        setUncontrolledOpen(newOpenState);
      }

      onOpenChange?.(newOpenState, side);

      const key = resolveStorageKey(storageKey, side);
      localStorage.setItem(key, `${newOpenState}`);
    },
    [open, isControlled, onOpenChange, side, storageKey]
  );

  const toggleSidebar = useCallback(() => {
    lastToggledSideRef.current = side;
    isMobile ? setOpenMobile((value) => !value) : setOpen((value) => !value);
  }, [isMobile, setOpen, side, lastToggledSideRef]);

  const state = open ? 'expanded' : 'collapsed';

  return useMemo(
    () => ({
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, openMobile, setOpenMobile, toggleSidebar]
  );
};

function useSidebar(sideOverride?: SidebarSide) {
  const isMobile = React.useContext(SidebarIsMobileContext);
  if (typeof isMobile !== 'boolean') {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  const contextSide = React.useContext(SidebarSideContext);
  const side = sideOverride ?? contextSide;
  const sideContext = React.useContext(
    side === 'left' ? SidebarLeftContext : SidebarRightContext
  );
  if (!sideContext) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return {
    ...sideContext,
    isMobile,
    side,
  };
}

const SidebarProvider = forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    defaultOpen?: SidebarOpenValue;
    open?: SidebarOpenValue;
    storageKey?: SidebarStorageKey;
    onOpenChange?: (open: boolean, side?: SidebarSide) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      storageKey = 'sidebar_expanded',
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile();
    const lastToggledSideRef = React.useRef<SidebarSide>('left');
    const leftToggleRef = React.useRef<
      SidebarContextSideState['toggleSidebar']
    >(() => undefined);
    const rightToggleRef = React.useRef<
      SidebarContextSideState['toggleSidebar']
    >(() => undefined);
    const leftState = useSidebarSideState({
      side: 'left',
      isMobile,
      defaultOpen,
      openProp,
      onOpenChange: setOpenProp,
      storageKey,
      lastToggledSideRef,
    });
    const rightState = useSidebarSideState({
      side: 'right',
      isMobile,
      defaultOpen,
      openProp,
      onOpenChange: setOpenProp,
      storageKey,
      lastToggledSideRef,
    });

    useEffect(() => {
      leftToggleRef.current = leftState.toggleSidebar;
    }, [leftState.toggleSidebar]);

    useEffect(() => {
      rightToggleRef.current = rightState.toggleSidebar;
    }, [rightState.toggleSidebar]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        const target = event.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'SELECT' ||
            target.isContentEditable)
        ) {
          return;
        }
        const shortcutSide =
          event.key === SIDEBAR_KEYBOARD_SHORTCUT_LEFT
            ? 'left'
            : event.key === SIDEBAR_KEYBOARD_SHORTCUT_RIGHT
            ? 'right'
            : null;

        if (!shortcutSide) {
          return;
        }

        event.preventDefault();

        const toggleSidebar =
          shortcutSide === 'left'
            ? leftToggleRef.current
            : rightToggleRef.current;
        toggleSidebar();
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
      <SidebarIsMobileContext.Provider value={isMobile}>
        <SidebarLeftContext.Provider value={leftState}>
          <SidebarRightContext.Provider value={rightState}>
            <TooltipProvider delayDuration={0}>
              <div
                style={
                  {
                    '--sidebar-width': SIDEBAR_WIDTH,
                    '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
                    minBlockSize: '100svh',
                    ...style,
                  } as React.CSSProperties
                }
                className={classNames(
                  'display-flex w-100 background-color-secondary',
                  className
                )}
                ref={ref}
                {...props}
              >
                {children}
              </div>
            </TooltipProvider>
          </SidebarRightContext.Provider>
        </SidebarLeftContext.Provider>
      </SidebarIsMobileContext.Provider>
    );
  }
);
SidebarProvider.displayName = 'SidebarProvider';

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    side?: 'left' | 'right';
    collapsible?: 'offcanvas' | 'icon' | 'none';
  }
>(
  (
    { side = 'left', collapsible = 'offcanvas', className, children, ...props },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar(side);

    if (isMobile) {
      return (
        <SidebarSideContext.Provider value={side}>
          <Drawer
            isOpen={openMobile}
            onDismiss={() => setOpenMobile(false)}
            placement={side}
          >
            <Box data-sidebar="sidebar" data-mobile="true" height="100">
              {children}
            </Box>
          </Drawer>
        </SidebarSideContext.Provider>
      );
    }

    if (collapsible === 'none') {
      return (
        <SidebarSideContext.Provider value={side}>
          <div
            className={classNames(
              'group display-flex h-100 font-size-xs flex-direction-column background-color-secondary font-color-base',
              className
            )}
            style={{
              width: 'var(--sidebar-width)',
            }}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </SidebarSideContext.Provider>
      );
    }

    return (
      <SidebarSideContext.Provider value={side}>
        <Box
          ref={ref}
          background="primary"
          display={{ base: 'none', desktop: 'block' }}
          color="base"
          fontSize="sm"
          position="relative"
          style={
            side === 'right' && collapsible === 'offcanvas'
              ? { overflowX: 'hidden' }
              : undefined
          }
          data-state={state}
          data-collapsible={collapsible}
          data-side={side}
          className="group"
        >
          <div
            style={{
              animationTimingFunction:
                'var(--sidebar-transition-timing, linear)',
              transitionTimingFunction:
                'var(--sidebar-transition-timing, linear)',
              transitionDuration: 'var(--sidebar-transition-duration, 200ms)',
              animationDuration: 'var(--sidebar-transition-duration, 200ms)',
              transitionProperty: 'width',
              width: getSidebarWidth(state, collapsible),
              height: '100svh',
            }}
            className={classNames('position-relative', className)}
          />
          <div
            className={classNames(
              'position-absolute display-none display-flex-desktop ',
              className
            )}
            style={{
              ...getSidebarOffsetStyles(side, state, collapsible),
              top: '0',
              bottom: '0',
              zIndex: 'var(--size-z-index-drawer)',
              animationTimingFunction:
                'var(--sidebar-transition-timing, linear)',
              transitionTimingFunction:
                'var(--sidebar-transition-timing, linear)',
              transitionDuration: 'var(--sidebar-transition-duration, 200ms)',
              animationDuration: 'var(--sidebar-transition-duration, 200ms)',
              transitionProperty: 'left, right, width',
              width:
                state === 'collapsed' && collapsible === 'icon'
                  ? 'var(--sidebar-width-icon)'
                  : 'var(--sidebar-width)',
              height: '100svh',
            }}
            {...props}
          >
            <div
              data-sidebar="sidebar"
              className={classNames(
                'display-flex h-100 w-100 flex-direction-column background-color-secondary font-color-base',
                {
                  'p-right-lg-desktop': side === 'right',
                }
              )}
            >
              {children}
            </div>
          </div>
        </Box>
      </SidebarSideContext.Provider>
    );
  }
);
Sidebar.displayName = 'Sidebar';

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button> & {
    side?: SidebarSide;
    iconName?: IconName;
  }
>(({ className, onClick, side, iconName = 'dock-left', ...props }, ref) => {
  const { toggleSidebar, side: contextSide } = useSidebar(side);

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="tertiary"
      size="sm"
      iconPrefix={iconName}
      className={classNames(
        {
          'm-left-sm m-left-0-tablet': contextSide === 'left',
          'm-right-sm m-right-0-tablet': contextSide === 'right',
        },
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      aria-label={`Toggle ${contextSide} sidebar`}
      {...props}
    />
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'main'>
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={classNames(
        'display-flex flex-auto flex-direction-column g-lg align-items-flex-start p-h-0 p-top-lg p-bottom-0 p-lg-tablet background-color-secondary',
        className
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = 'SidebarInset';

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  const { state } = useSidebar();

  const isCollapsed = state === 'collapsed';

  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={classNames(
        'display-flex g-sm p-v-md p-h-md p-right-0-desktop',
        { 'overflow-hidden': isCollapsed },
        className
      )}
      {...props}
    />
  );
});
SidebarHeader.displayName = 'SidebarHeader';

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={classNames(
        'display-flex g-sm  p-v-md p-h-md p-right-0-desktop overflow-hidden',
        className
      )}
      {...props}
    />
  );
});
SidebarFooter.displayName = 'SidebarFooter';

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={classNames(
        'display-flex flex-direction-column g-xl minh-0 flex-auto',
        className
      )}
      style={{ overflowX: 'hidden', overflowY: 'auto' }}
      {...props}
    />
  );
});
SidebarContent.displayName = 'SidebarContent';

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={classNames(
      'display-flex flex-direction-column w-100 minw-0 g-xs p-0 m-0',
      className
    )}
    style={{
      listStyle: 'none',
    }}
    {...props}
  />
));
SidebarMenu.displayName = 'SidebarMenu';

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={classNames('font-size-sm position-relative', className)}
    style={{ whiteSpace: 'nowrap' }}
    {...props}
  />
));
SidebarMenuItem.displayName = 'SidebarMenuItem';

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & {
    asChild?: boolean;
    isActive?: boolean;
    icon?: IconName;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  }
>(
  (
    { asChild = false, isActive = false, icon, tooltip, className, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const { isMobile, state, side } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-active={isActive}
        className={classNames(
          'display-flex w-100 flex-auto p-sm br-sm g-lg flex-direction-row flex-auto align-items-center font-size-sm bw-0 font-weight-medium text-align-left td-none hover:background-color-tertiary font-color-base cursor-pointer',
          {
            'background-color-tertiary': isActive,
            'background-color-transparent': !isActive,
          },
          className
        )}
        {...props}
      >
        {props.children}
      </Comp>
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === 'string') {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side={side === 'right' ? 'left' : 'right'}
          align="center"
          hidden={state !== 'collapsed' || isMobile}
          {...tooltip}
        />
      </Tooltip>
    );
  }
);
SidebarMenuButton.displayName = 'SidebarMenuButton';

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={classNames(
        'position-relative p-h-md p-right-0-desktop display-flex w-100 minw-0 flex-direction-column ',
        className
      )}
      {...props}
    />
  );
});
SidebarGroup.displayName = 'SidebarGroup';

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group-label"
      className={classNames(
        'group-data-collapsible-icon-hidden display-flex h-3xl align-items-center br-sm p-h-sm font-color-secondary font-size-xs font-weight-medium outline-none',
        className
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={classNames(
      'display-flex min-w-0 m-left-xl p-left-sm flex-direction-column g-2xs bw-left-sm border-color-default',
      className
    )}
    style={{
      listStyle: 'none',
    }}
    {...props}
  />
));
SidebarMenuSub.displayName = 'SidebarMenuSub';

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem';

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<'a'> & {
    asChild?: boolean;
    isActive?: boolean;
  }
>(({ asChild = false, isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-active={isActive}
      className={classNames(
        'display-flex td-none h-4xl p-left-lg font-color-base minw-0 align-items-center gap-sm overflow-hidden br-sm outline-none hover:background-color-tertiary',
        {
          'background-color-tertiary': isActive,
          'background-color-transparent': !isActive,
        },
        className
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton';

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={classNames(
        'position-absolute lh-none p-xs font-color-secondary cursor-pointer hover:font-color-base minw-0 align-items-center bw-0 br-sm outline-none background-color-transparent hover:background-color-tertiary',
        className
      )}
      style={{
        top: 'var(--size-spacing-xs)',
        right: 'var(--size-spacing-xs)',
      }}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = 'SidebarMenuAction';

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => {
  const { open, toggleSidebar, side } = useSidebar();
  const shortcutLabel =
    side === 'left'
      ? SIDEBAR_KEYBOARD_SHORTCUT_LEFT
      : SIDEBAR_KEYBOARD_SHORTCUT_RIGHT;

  const caretIcon = open
    ? side === 'right'
      ? 'caret-sm-right'
      : 'caret-sm-left'
    : side === 'right'
    ? 'caret-sm-left'
    : 'caret-sm-right';

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title={`Toggle Sidebar ${shortcutLabel}`}
      className={classNames(
        styles.rail,
        'hover-show-child background-color-transparent display-flex p-top-5xl p-left-xl p-right-0 justify-content-center position-absolute',
        {
          'cursor-w-resize':
            (open && side === 'left') || (!open && side === 'right'),
          'cursor-e-resize':
            (!open && side === 'left') || (open && side === 'right'),
        },
        className
      )}
      style={{
        top: '20px',
        bottom: '20px',
        right: side === 'left' ? '-14px' : undefined,
        left: side === 'right' ? '-14px' : undefined,
        width: '10px',
      }}
      {...props}
    >
      <Box
        radius="xl"
        background="primary"
        color="secondary"
        borderWidth="sm"
        padding="xs"
        margin="0"
        shadow="xs"
        width="3xl"
        height="3xl"
        alignItems="center"
        justifyContent="center"
        className={classNames(
          'hover-child',
          {
            'cursor-w-resize':
              (open && side === 'left') || (!open && side === 'right'),
            'cursor-e-resize':
              (!open && side === 'left') || (open && side === 'right'),
          },
          className
        )}
      >
        <Icon name={caretIcon} />
      </Box>
    </button>
  );
});
SidebarRail.displayName = 'SidebarRail';

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={classNames(
      'group-data-collapsible-icon-hidden position-absolute font-size-xs cursor-default lh-none p-xs font-color-base minw-0 align-items-center bw-0 br-sm outline-none background-color-transparent',
      className
    )}
    style={{
      top: 'var(--size-spacing-sm)',
      right: 'var(--size-spacing-xs)',
    }}
    {...props}
  />
));
SidebarMenuBadge.displayName = 'SidebarMenuBadge';

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
};
