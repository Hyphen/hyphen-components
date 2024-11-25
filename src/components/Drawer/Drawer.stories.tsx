import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerPlacementType,
  DrawerProvider,
  DrawerTitle,
  DrawerTrigger,
} from './Drawer';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
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

export const UncontrolledWithProvider = () => {
  const ref = useRef(null);

  return (
    <div id="drawerContainer" ref={ref} style={{ height: '240px' }}>
      <DrawerProvider defaultIsOpen={false}>
        <DrawerTrigger asChild>
          <Button variant="primary">Toggle Uncontrolled Drawer</Button>
        </DrawerTrigger>
        <Drawer ariaLabel="drawer component example" containerRef={ref}>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerContent>{drawerContent}</DrawerContent>
        </Drawer>
      </DrawerProvider>
    </div>
  );
};

export const OpenUncontrolledWithProvider: Story = {
  play: async ({ canvasElement, mount }) => {
    await mount(<UncontrolledWithProvider />);
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Toggle Uncontrolled Drawer'));

    await expect(canvas.getByText('Drawer Title')).toBeInTheDocument();

    await userEvent.click(canvas.getByLabelText('close'));

    await expect(canvas.queryByText('Drawer Title')).toBeNull();

    await userEvent.click(canvas.getByText('Toggle Uncontrolled Drawer'));
  },
};

export const ControlledWithoutProvider = () => {
  const {
    isOpen: isDrawerOpen,
    handleOpen: openDrawer,
    handleClose: closeDrawer,
  } = useOpenClose();

  const ref = useRef(null);

  return (
    <div id="drawerContainer" ref={ref} style={{ height: '240px' }}>
      <DrawerTrigger asChild onClick={openDrawer}>
        <Button variant="primary">Open Drawer</Button>
      </DrawerTrigger>
      <Drawer
        isOpen={isDrawerOpen}
        ariaLabel="drawer component example"
        containerRef={ref}
        onDismiss={closeDrawer}
      >
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerCloseButton onClose={closeDrawer} />
        </DrawerHeader>
        <DrawerContent>{drawerContent}</DrawerContent>
      </Drawer>
    </div>
  );
};

ControlledWithoutProvider.parameters = {
  chromatic: { disableSnapshot: true },
};

export const OpenControlledControlledWithoutProvider: Story = {
  play: async ({ canvasElement, mount }) => {
    await mount(<ControlledWithoutProvider />);
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Open Drawer'));

    await expect(canvas.getByText('Drawer Title')).toBeInTheDocument();

    await userEvent.click(canvas.getByLabelText('close'));

    await expect(canvas.queryByText('Drawer Title')).toBeNull();

    await userEvent.click(canvas.getByText('Open Drawer'));

    await userEvent.click(
      document.getElementsByClassName('ReactModal__Overlay')[0]
    );

    await expect(canvas.queryByText('Drawer Title')).toBeNull();

    await userEvent.click(canvas.getByText('Open Drawer'));
  },
};

export const DefaultIsOpen = () => {
  const {
    isOpen: isDrawerOpen,
    handleOpen: openDrawer,
    handleClose: closeDrawer,
  } = useOpenClose();

  const ref = useRef(null);

  return (
    <div id="drawerContainer" ref={ref} style={{ height: '240px' }}>
      <DrawerProvider defaultIsOpen>
        <DrawerTrigger asChild onClick={openDrawer}>
          <Button variant="primary">Open Drawer</Button>
        </DrawerTrigger>
        <Drawer
          isOpen={isDrawerOpen}
          ariaLabel="drawer component example"
          containerRef={ref}
          onDismiss={closeDrawer}
        >
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerCloseButton onClose={closeDrawer} />
          </DrawerHeader>
          <DrawerContent>{drawerContent}</DrawerContent>
        </Drawer>
      </DrawerProvider>
    </div>
  );
};

export const Placement = () => {
  const ref = useRef<HTMLDivElement>(null);
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
      <DrawerProvider>
        <DrawerTrigger asChild>
          <Button variant="primary">Open Drawer</Button>
        </DrawerTrigger>
        <Drawer
          placement={placement as DrawerPlacementType}
          ariaLabel="drawer component example"
        >
          <DrawerHeader>
            <DrawerTitle>{placement} placement</DrawerTitle>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerContent height="8xl">{drawerContent}</DrawerContent>
        </Drawer>
      </DrawerProvider>
    </div>
  );
};

Placement.parameters = {
  chromatic: { disableSnapshot: true },
};

export const OpenBottomDrawer: Story = {
  play: async ({ canvasElement, mount }) => {
    await mount(<Placement />);
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Open Drawer'));
  },
};

export const Width = () => {
  const [width, setWidth] = React.useState('default');
  const handleClick = (newWidth: WidthSize) => {
    setWidth(newWidth);
  };
  const widths = ['16rem', '400px', '100%'];
  return (
    <DrawerProvider defaultIsOpen={false}>
      <Box gap="md" direction="row">
        {widths.map((width: string) => (
          <DrawerTrigger asChild>
            <Button
              variant="primary"
              onClick={() => handleClick(width as WidthSize)}
              key={width}
            >
              {`Open ${width} Drawer `}
            </Button>
          </DrawerTrigger>
        ))}
      </Box>
      <Drawer width={width as WidthSize} ariaLabel="drawer component example">
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerContent>{drawerContent}</DrawerContent>
      </Drawer>
    </DrawerProvider>
  );
};

Width.parameters = {
  chromatic: { disableSnapshot: true },
};

export const HiddenOverlay = () => {
  return (
    <DrawerProvider defaultIsOpen={false}>
      <DrawerTrigger asChild>
        <Button variant="primary">Toggle Drawer</Button>
      </DrawerTrigger>
      <Drawer hideOverlay ariaLabel="drawer component example">
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerContent>{drawerContent}</DrawerContent>
      </Drawer>
    </DrawerProvider>
  );
};

HiddenOverlay.parameters = {
  chromatic: { disableSnapshot: true },
};

export const OpenHiddenOverlay: Story = {
  play: async ({ canvasElement, mount }) => {
    await mount(<HiddenOverlay />);
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Toggle Drawer'));
  },
};

export const InitialFocusRef = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  return (
    <div ref={containerRef}>
      <DrawerProvider defaultIsOpen={false}>
        <DrawerTrigger asChild>
          <Button variant="primary">Toggle Drawer</Button>
        </DrawerTrigger>
        <Drawer
          initialFocusRef={ref}
          containerRef={containerRef}
          ariaLabel="drawer component example"
        >
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerContent>
            <DrawerTrigger asChild>
              <Button variant="primary" ref={ref} data-testid="focus-button">
                I receive focus
              </Button>
            </DrawerTrigger>
          </DrawerContent>
        </Drawer>
      </DrawerProvider>
    </div>
  );
};

InitialFocusRef.parameters = {
  chromatic: { disableSnapshot: true },
};

export const OpenInitialFocusRef: Story = {
  play: async ({ canvasElement, mount }) => {
    await mount(<InitialFocusRef />);
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Toggle Drawer'));
  },
};

export const ContainedDrawer = () => {
  const containerRef = useRef(null);
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
      borderWidth="sm"
    >
      <DrawerProvider defaultIsOpen={false}>
        <DrawerTrigger asChild>
          <Button variant="primary">Toggle Drawer</Button>
        </DrawerTrigger>
        <Drawer
          containerRef={containerRef}
          ariaLabel="drawer component example"
        >
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerContent>{drawerContent}</DrawerContent>
        </Drawer>
      </DrawerProvider>
    </Box>
  );
};

ContainedDrawer.parameters = {
  chromatic: { disableSnapshot: true },
};

export const OpenContainedDrawer: Story = {
  play: async ({ canvasElement, mount }) => {
    await mount(<ContainedDrawer />);
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Toggle Drawer'));

    await expect(canvas.getByText('Drawer Title')).toBeInTheDocument();
  },
};
