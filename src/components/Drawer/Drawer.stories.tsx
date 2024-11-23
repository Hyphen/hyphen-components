import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerPlacementType,
  DrawerTitle,
} from './Drawer';
import type { Meta, StoryObj } from '@storybook/react';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useOpenClose } from '../../hooks';
import { Button } from '../Button/Button';
import { Box } from '../Box/Box';
import { RadioGroup } from '../RadioGroup/RadioGroup';
import { WidthSize } from '../../types';
import { userEvent, within, expect } from '@storybook/test';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const drawerContent: JSX.Element[] = [];
for (let i = 0; i < 50; i++) {
  drawerContent.push(<Box key={i}>Drawer content&hellip;</Box>);
}

export const BasicUsage = () => {
  const {
    isOpen: isDrawerOpen,
    handleOpen: openDrawer,
    handleClose: closeDrawer,
  } = useOpenClose();

  const ref = useRef(null);

  return (
    <div id="drawerContainer" ref={ref} style={{ height: '240px' }}>
      <Button variant="primary" onClick={openDrawer}>
        Open Drawer
      </Button>
      <Drawer
        isOpen={isDrawerOpen}
        ariaLabel="drawer component example"
        containerRef={ref}
        onDismiss={closeDrawer}
      >
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerCloseButton onClick={closeDrawer} />
        </DrawerHeader>
        <DrawerContent>{drawerContent}</DrawerContent>
      </Drawer>
    </div>
  );
};

export const OpenDrawer: Story = {
  play: async ({ canvasElement, mount }) => {
    await mount(<BasicUsage />);
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Open Drawer'));

    await expect(canvas.getByText('Drawer Title')).toBeInTheDocument();
  },
};

export const Placement = () => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    isOpen: isDrawerOpen,
    handleOpen: openDrawer,
    handleClose: closeDrawer,
  } = useOpenClose();
  const [placement, setPlacement] = useState('bottom');
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
    <div
      id="placementStory"
      className="display-flex flex-direction-column align-items-flex-start g-lg"
      ref={ref}
    >
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
        isOpen={isDrawerOpen}
        onDismiss={closeDrawer}
        placement={placement as DrawerPlacementType}
        ariaLabel="drawer component example"
      >
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerCloseButton onClick={closeDrawer} />
        </DrawerHeader>
        <DrawerContent height="8xl">{drawerContent}</DrawerContent>
      </Drawer>
    </div>
  );
};

export const OpenBottomDrawer: Story = {
  play: async ({ canvasElement, mount }) => {
    await mount(<Placement />);
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Open Drawer'));
  },
};

export const CloseButtonOnly = () => {
  const {
    isOpen: isDrawerOpen,
    handleOpen: openDrawer,
    handleClose: closeDrawer,
  } = useOpenClose();

  return (
    <>
      <Button variant="primary" onClick={openDrawer}>
        Close Button Only
      </Button>
      <Drawer
        ariaLabel="drawer component example"
        isOpen={isDrawerOpen}
        onDismiss={closeDrawer}
      >
        <DrawerHeader>
          <DrawerCloseButton onClick={closeDrawer} />
        </DrawerHeader>
        <DrawerContent>{drawerContent}</DrawerContent>
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
  const widths = ['20rem', '400px', '100%'];
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
        isOpen={isDrawerOpen}
        onDismiss={closeDrawer}
        ariaLabel="drawer component example"
      >
        <DrawerHeader>
          {width} wide drawer
          <DrawerCloseButton onClick={closeDrawer} />
        </DrawerHeader>
        <DrawerContent>{drawerContent}</DrawerContent>
      </Drawer>
    </>
  );
};

export const ContentHeight = () => {
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
        ariaLabel="drawer component example"
      >
        <DrawerHeader>
          <DrawerTitle>Drawer Header</DrawerTitle>
          <DrawerCloseButton onClick={closeDrawer} />
        </DrawerHeader>
        <DrawerContent height="8xl">{drawerContent}</DrawerContent>
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
        <DrawerHeader>
          <DrawerCloseButton
            onClick={closeDrawer}
            ref={closeBtnRef as MutableRefObject<HTMLButtonElement>}
          />
        </DrawerHeader>
        <DrawerContent>{drawerContent}</DrawerContent>
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
    <div>
      <Button variant="primary" onClick={openDrawer}>
        Open Drawer
      </Button>
      <Drawer
        isOpen={isDrawerOpen}
        onDismiss={closeDrawer}
        initialFocusRef={ref}
        ariaLabel="drawer component example"
      >
        <DrawerHeader>
          <DrawerTitle>initialFocusRef</DrawerTitle>
          <DrawerCloseButton onClick={closeDrawer} />
        </DrawerHeader>
        <DrawerContent>
          drawer content
          <Button variant="primary" ref={ref} onClick={closeDrawer}>
            I receive focus
          </Button>
          {drawerContent}
        </DrawerContent>
      </Drawer>
    </div>
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
        Open Drawer
      </Button>
      <Drawer
        isOpen={isDrawerOpen}
        onDismiss={closeDrawer}
        containerRef={containerRef as MutableRefObject<HTMLDivElement>}
        dangerouslyBypassScrollLock
        hideOverlay
        ariaLabel="drawer component example"
      >
        <DrawerHeader>
          <DrawerTitle>containerRef</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          This drawer is rendered inside it&apos;s containing div, rather than
          the document.body
          {drawerContent}
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export const OpenContainedDrawer: Story = {
  play: async ({ canvasElement, mount }) => {
    await mount(<ContainedDrawer />);
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Open Drawer'));

    await expect(canvas.getByText('containerRef')).toBeInTheDocument();
  },
};
