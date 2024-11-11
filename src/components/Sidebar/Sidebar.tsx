import React, { useCallback, useMemo, useState } from 'react';
import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import { Button } from '../Button/Button';
import { Drawer } from '../Drawer/Drawer';
import { useIsMobile } from '../../hooks/useIsMobile/useIsMobile';
import { Box } from '../Box/Box';
import { IconName } from 'src/types';
import { Icon } from '../Icon/Icon';

type SidebarContext = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SIDEBAR_COOKIE_NAME = 'sidebar:state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
// const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === 'function' ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? 'expanded' : 'collapsed';

    const contextValue = useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        {/* <TooltipProvider delayDuration={0}> */}
        <div
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
              minBlockSize: '100svh',
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
        {/* </TooltipProvider> */}
      </SidebarContext.Provider>
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
    {
      side = 'left',
      //   variant = 'sidebar',
      collapsible = 'offcanvas',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === 'none') {
      return (
        <div
          className={classNames(
            'display-flex h-100 font-size-xs flex-direction-column background-color-secondary font-color-base',
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
      );
    }

    if (isMobile) {
      return (
        <Drawer
          isOpen={openMobile}
          onDismiss={() => setOpenMobile(false)}
          placement={side}
          //   style={{
          //     width: SIDEBAR_WIDTH_MOBILE
          //   }}
        >
          <Box data-sidebar="sidebar" data-mobile="true">
            {children}
          </Box>
        </Drawer>
      );
    }

    return (
      <Box
        ref={ref}
        background="primary"
        display={{ base: 'none', desktop: 'block' }}
        color="base"
        fontSize="sm"
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          style={{
            animationTimingFunction: 'linear',
            transitionTimingFunction: 'linear',
            transitionDuration: '200ms',
            animationDuration: '200ms',
            transitionProperty: 'width',
            width: state === 'collapsed' ? '0' : 'var(--sidebar-width)',
            height: '100svh',
          }}
          className={classNames(
            'position-relative',
            'group-data-[side=right]:rotate-180'
          )}
        />
        <div
          className={classNames(
            'duration-200 position-fixed display-none display-flex-desktop ',
            side === 'right' &&
              'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
            className
          )}
          style={{
            left: state === 'expanded' ? '0' : 'calc(var(--sidebar-width)*-1)',
            top: '0',
            bottom: '0',
            zIndex: 'var(--size-z-index-drawer)',
            transitionProperty: 'left, right, width',
            width: 'var(--sidebar-width)',
            height: '100svh',
          }}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="display-flex h-100 w-100 flex-direction-column background-color-secondary"
          >
            {children}
          </div>
        </div>
      </Box>
    );
  }
);
Sidebar.displayName = 'Sidebar';

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="tertiary"
      size="sm"
      iconPrefix="dock-left"
      className={classNames(className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      //   style={{ marginLeft: 'calc(var(--size-spacing-sm) * -1)' }}
      aria-label="toggle sidebar"
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
        'display-flex w-100 flex-direction-column g-lg align-items-flex-start p-lg background-color-secondary',
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
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={classNames('display-flex g-sm p-v-md p-left-md', className)}
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
      className={classNames('display-flex g-sm  p-v-md p-left-md', className)}
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
        'display-flex flex-direction-column g-xl minh-0 flex-auto overflow-auto',
        className
      )}
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
  }
>(({ asChild = false, isActive = false, icon, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  const button = (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-active={isActive}
      className={classNames(
        'p-sm br-sm g-md flex-direction-row display-flex align-items-center align-self-flex-start font-size-sm bw-0 font-weight-medium text-align-left text-decoration-none hover:background-color-tertiary background-color-transparent font-color-base cursor-pointer display-flex w-100',
        className
      )}
      {...props}
    >
      <Box
        flex="auto"
        direction="row"
        gap="md"
        alignItems="center"
        color="base"
      >
        {icon && <Icon name={icon} color="tertiary" />}
        {props.children}
      </Box>
    </Comp>
  );

  return button;
});
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
        'position-relative p-left-md p-left-md display-flex w-100 minw-0 flex-direction-column',
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
        'display-flex h-3xl align-items-center br-sm p-h-sm font-size-xs font-weight-medium outline-none',
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
    size?: 'sm' | 'md';
    isActive?: boolean;
  }
>(({ asChild = false, size = 'sm', isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={classNames(
        'display-flex text-decoration-none h-4xl p-left-sm font-color-base minw-0 align-items-center gap-sm overflow-hidden br-sm outline-none hover:background-color-tertiary',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        size === 'sm' && 'text-sm',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton';

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  // SidebarGroupAction,
  // SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  // SidebarInput,
  SidebarInset,
  SidebarMenu,
  // SidebarMenuAction,
  // SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  // SidebarRail,
  // SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
