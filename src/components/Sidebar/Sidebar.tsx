import React, { useCallback, useMemo, useState } from 'react';

import classNames from 'classnames';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { useIsMobile } from '../../hooks/useIsMobile/useIsMobile';
import { Box, BoxProps } from '../Box/Box';

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
const SIDEBAR_WIDTH_MOBILE = '18rem';
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
    // variant?: 'sidebar' | 'floating' | 'inset';
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
            'display-flex h-100 flex-direction-column background-color-secondary font-color-base',
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
        <div>TODO: mobile</div>
        // <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        //   <SheetContent
        //     data-sidebar="sidebar"
        //     data-mobile="true"
        //     className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
        //     style={
        //       {
        //         "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
        //       } as React.CSSProperties
        //     }
        //     side={side}
        //   >
        //     <div className="flex h-full w-full flex-col">{children}</div>
        //   </SheetContent>
        // </Sheet>
      );
    }

    return (
      <Box
        ref={ref}
        background="primary"
        display={{ base: 'none', desktop: 'block' }}
        color="base"
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        // data-variant={variant}
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
            // TODO: variant === 'floating' || variant === 'inset'
            //   ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
            //   : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]'
          )}
        />
        <div
          style={{
            left: state === 'expanded' ? '0' : 'calc(var(--sidebar-width)*-1)',
            top: '0',
            bottom: '0',
            zIndex: 'var(--size-z-index-drawer)',
            transitionProperty: 'left, right, width',
            width: 'var(--sidebar-width)',
            height: '100svh',
          }}
          className={classNames(
            'duration-200 position-fixed display-none display-flex-desktop ',
            side === 'left'
              ? 'group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
              : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
            // Adjust the padding for floating and inset variants.
            // TODO: variant === 'floating' || variant === 'inset'
            //   ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
            //   : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="display-flex h-100 w-100 flex-direction-column background-color-secondary group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
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
      variant="secondary"
      size="sm"
      className={classNames(className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <Icon name="menu" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
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
        'display-flex w-100 flex-direction-column p-lg background-color-secondary',
        className
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = 'SidebarInset';

export {
  Sidebar,
  // SidebarContent,
  // SidebarFooter,
  // SidebarGroup,
  // SidebarGroupAction,
  // SidebarGroupContent,
  // SidebarGroupLabel,
  // SidebarHeader,
  // SidebarInput,
  SidebarInset,
  // SidebarMenu,
  // SidebarMenuAction,
  // SidebarMenuBadge,
  // SidebarMenuButton,
  // SidebarMenuItem,
  // SidebarMenuSkeleton,
  // SidebarMenuSub,
  // SidebarMenuSubButton,
  // SidebarMenuSubItem,
  SidebarProvider,
  // SidebarRail,
  // SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
