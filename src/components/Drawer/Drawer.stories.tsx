import { Drawer, DrawerPlacementType } from './Drawer';
import type { Meta } from '@storybook/react';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useOpenClose } from '../../hooks';
import { Button } from '../Button/Button';
import { Box } from '../Box/Box';
import { RadioGroup } from '../RadioGroup/RadioGroup';
import { WidthSize } from '../../types';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
};

export default meta;

export const BasicUsage = () => {
  const {
    isOpen: isDrawerOpen,
    handleOpen: openDrawer,
    handleClose: closeDrawer,
  } = useOpenClose();
  return (
    <>
      <Button variant="primary" onClick={openDrawer}>
        Open Drawer
      </Button>
      <Drawer
        isOpen={isDrawerOpen}
        title="Drawer Title"
        onDismiss={closeDrawer}
        ariaLabel="drawer component example"
      >
        <Box padding="lg" display="block" childGap="md">
          <Box>Drawer content&hellip;</Box>
          <Box>Drawer content&hellip;</Box>
          <Box>Drawer content&hellip;</Box>
        </Box>
      </Drawer>
    </>
  );
};

export const Placement = () => {
  const {
    isOpen: isDrawerOpen,
    handleOpen: openDrawer,
    handleClose: closeDrawer,
  } = useOpenClose();
  const [placement, setPlacement] = useState('right');
  const placementOptions = [
    {
      id: 'top',
      value: 'top',
      label: 'top',
    },
    {
      id: 'right',
      value: 'right',
      label: 'right',
    },
    {
      id: 'bottom',
      value: 'bottom',
      label: 'bottom',
    },
    {
      id: 'left',
      value: 'left',
      label: 'left',
    },
  ];
  return (
    <Box display="block" childGap="md">
      <RadioGroup
        title="Placement"
        direction="row"
        name="placement"
        onChange={(event) => setPlacement(event.target.value)}
        value={placement}
        options={placementOptions}
      />
      <Button variant="primary" onClick={openDrawer}>
        Open Drawer
      </Button>
      <Drawer
        title="test"
        isOpen={isDrawerOpen}
        onDismiss={closeDrawer}
        placement={placement as DrawerPlacementType}
        ariaLabel="drawer component example"
      >
        <Box padding="lg" display="block" childGap="md">
          <Box as="p">drawer content</Box>
          <Box as="p">drawer content</Box>
          <Box as="p">drawer content</Box>
          <Box as="p">drawer content</Box>
          <Box as="p">drawer content</Box>
          <Box as="p">drawer content</Box>
          <Box as="p">drawer content</Box>
          <Box as="p">drawer content</Box>
          <Box as="p">drawer content</Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export const DrawerHeader = () => {
  const {
    isOpen: isDrawerOpen,
    handleOpen: openDrawer,
    handleClose: closeDrawer,
  } = useOpenClose();
  const drawerContent = [];
  for (let i = 0; i < 50; i++) {
    drawerContent.push(<Box key={i}>Drawer content&hellip;</Box>);
  }
  return (
    <>
      <Button variant="primary" onClick={openDrawer}>
        Title and Close Button
      </Button>
      <Drawer
        ariaLabel="drawer component example"
        isOpen={isDrawerOpen}
        onDismiss={closeDrawer}
        title="Drawer Title"
      >
        <Box padding="lg" display="block" childGap="md">
          {drawerContent}
        </Box>
      </Drawer>
    </>
  );
};

export const TitleAndCloseButton = () => {
  const {
    isOpen: isDrawerOpen,
    handleOpen: openDrawer,
    handleClose: closeDrawer,
  } = useOpenClose();
  const drawerContent = [];
  for (let i = 0; i < 50; i++) {
    drawerContent.push(<Box key={i}>Drawer content&hellip;</Box>);
  }
  return (
    <>
      <Button variant="primary" onClick={openDrawer}>
        Title and Close Button
      </Button>
      <Drawer
        ariaLabel="drawer component example"
        isOpen={isDrawerOpen}
        onDismiss={closeDrawer}
        title="Drawer Title"
      >
        <Box padding="lg" display="block" childGap="md">
          {drawerContent}
        </Box>
      </Drawer>
    </>
  );
};

export const CloseButtonOnly = () => {
  const {
    isOpen: isDrawerOpen,
    handleOpen: openDrawer,
    handleClose: closeDrawer,
  } = useOpenClose();
  const drawerContent = [];
  for (let i = 0; i < 50; i++) {
    drawerContent.push(<Box key={i}>Drawer content&hellip;</Box>);
  }
  return (
    <>
      <Button variant="primary" onClick={openDrawer}>
        Close Button Only
      </Button>
      <Drawer
        ariaLabel="drawer component example"
        isOpen={isDrawerOpen}
        onDismiss={closeDrawer}
        closeButton
      >
        <Box padding="lg" display="block" childGap="md">
          {drawerContent}
        </Box>
      </Drawer>
    </>
  );
};

export const Width = () => {
  const {
    isOpen: isDrawerOpen,
    handleOpen: openDrawer,
    handleClose: closeDrawer,
  } = useOpenClose();
  const [width, setWidth] = React.useState('default');
  const handleClick = (newWidth: WidthSize) => {
    setWidth(newWidth);
    openDrawer();
  };
  const widths = ['3xl', '6xl', '100%'];
  return (
    <>
      <Box gap="sm" direction="row">
        {widths.map((width: string) => (
          <Button
            variant="primary"
            onClick={() => handleClick(width as WidthSize)}
            key={width}
          >
            {`Open ${width} Drawer `}
          </Button>
        ))}
      </Box>
      <Drawer
        width={width as WidthSize}
        title={`${width} wide drawer`}
        isOpen={isDrawerOpen}
        onDismiss={closeDrawer}
        closeButton
        ariaLabel="drawer component example"
      >
        <Box padding="lg" display="block" childGap="md">
          <Box>drawer content</Box>
        </Box>
      </Drawer>
    </>
  );
};

export const Height = () => {
  const {
    isOpen: isDrawerOpen,
    handleOpen: openDrawer,
    handleClose: closeDrawer,
  } = useOpenClose();
  return (
    <>
      <Button variant="primary" onClick={openDrawer}>
        Open Drawer
      </Button>
      <Drawer
        placement="top"
        isOpen={isDrawerOpen}
        onDismiss={closeDrawer}
        closeButton
        ariaLabel="drawer component example"
      >
        <Box padding="lg" height="3xl" display="block" childGap="md">
          <Box>3xl Height</Box>
        </Box>
      </Drawer>
    </>
  );
};

export const HiddenOverlay = () => {
  const closeBtnRef = useRef<HTMLButtonElement>();
  const returnFocusRef = useRef<HTMLButtonElement>();
  const returnFocus = () => {
    if (returnFocusRef && returnFocusRef.current) {
      returnFocusRef.current.focus();
    }
  };
  const {
    isOpen: isDrawerOpen,
    handleToggle: handleDrawerToggle,
    handleClose: closeDrawer,
  } = useOpenClose({ onClose: returnFocus });
  useEffect(() => {
    setTimeout(() => {
      if (closeBtnRef && closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 100);
  }, [isDrawerOpen]);
  return (
    <>
      <Button
        variant="primary"
        onClick={handleDrawerToggle}
        ref={returnFocusRef as MutableRefObject<HTMLButtonElement>}
      >
        Toggle Drawer
      </Button>
      <Drawer
        isOpen={isDrawerOpen}
        onDismiss={closeDrawer}
        ariaLabel="drawer component example"
        hideOverlay
      >
        <Box padding="lg" display="block" childGap="md">
          <Button
            ref={closeBtnRef as MutableRefObject<HTMLButtonElement>}
            onClick={closeDrawer}
            variant="primary"
          >
            close
          </Button>
          <Box>drawer content</Box>
        </Box>
      </Drawer>
    </>
  );
};

export const InitialFocusRef = () => {
  const {
    isOpen: isDrawerOpen,
    handleOpen: openDrawer,
    handleClose: closeDrawer,
  } = useOpenClose();
  const ref = useRef(null);
  return (
    <>
      <Button variant="primary" onClick={openDrawer}>
        Open Drawer
      </Button>
      <Drawer
        isOpen={isDrawerOpen}
        onDismiss={closeDrawer}
        initialFocusRef={ref}
        title="initialFocusRef"
        ariaLabel="drawer component example"
      >
        <Box padding="lg" display="block" childGap="md">
          <Box>drawer content</Box>
          <Button variant="primary" ref={ref} onClick={closeDrawer}>
            I receive focus
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export const ContainedDrawer = () => {
  const containerRef = useRef<HTMLDivElement>();
  const {
    isOpen: isDrawerOpen,
    handleOpen: openDrawer,
    handleClose: closeDrawer,
  } = useOpenClose();
  return (
    <Box
      position="relative"
      display="block"
      height="500px"
      id="myContainer"
      ref={containerRef}
      background="info"
      padding="lg"
      overflow="hidden"
    >
      <Button variant="primary" onClick={openDrawer}>
        Show Drawer
      </Button>
      <Drawer
        isOpen={isDrawerOpen}
        onDismiss={closeDrawer}
        containerRef={containerRef as MutableRefObject<HTMLDivElement>}
        dangerouslyBypassScrollLock
        hideOverlay
        title="containerRef"
        ariaLabel="drawer component example"
      >
        <Box padding="lg" as="p">
          This drawer is rendered inside it&apos;s containing div, rather than
          the document.body
        </Box>
      </Drawer>
    </Box>
  );
};
