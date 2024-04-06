import { Popover } from './Popover';
import type { Meta } from '@storybook/react';
import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Box } from '../Box/Box';
import { SelectInput } from '../SelectInput/SelectInput';
import { TextInput } from '../TextInput/TextInput';
import { Heading } from '../Heading/Heading';
import { useOpenClose } from '../../hooks/useOpenClose/useOpenClose';
import { FontColor } from '@hyphen/hyphen-design-tokens/build/types';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
};

export default meta;

export const BasicUsage = () => {
  const {
    isOpen: isPopoverOpen,
    handleToggle: togglePopover,
    handleClose: closePopover,
  } = useOpenClose();
  const popoverContent = <>Hello!</>;
  return (
    <>
      <Popover
        content={popoverContent}
        isOpen={isPopoverOpen}
        placement="right"
        contentContainerProps={{
          padding: 'sm',
        }}
        onClickOutside={closePopover}
      >
        <Button onClick={togglePopover} variant="secondary">
          Toggle Popover
        </Button>
      </Popover>
    </>
  );
};

type PopoverStylingType = {
  value: string;
  label: string;
} | null;

export const PopoverStyling = () => {
  const { isOpen: isPopoverOpen, handleToggle: togglePopover } = useOpenClose();
  const [popoverBackground, setPopoverBackground] =
    useState<PopoverStylingType>({
      value: 'primary-500',
      label: 'Primary 500',
    });
  const [popoverFontColor, setPopoverFontColor] = useState<PopoverStylingType>({
    value: 'black-500',
    label: 'Black 500',
  });
  const [popoverRadius, setPopoverRadius] = useState<PopoverStylingType>({
    value: 'sm',
    label: 'Small',
  });
  const backgroundOptions = [
    { value: 'primary-500', label: 'Primary 500' },
    { value: 'grey-500', label: 'Grey 500' },
    { value: 'purple-500', label: 'Purple 500' },
    { value: 'yellow-500', label: 'Yellow 500' },
    { value: 'blue-500', label: 'Blue 500' },
    { value: 'red-500', label: 'Red 500' },
  ];
  const fontColorOptions = [
    { value: 'black-500', label: 'Black 500' },
    { value: 'white-500', label: 'White 500' },
  ];
  const borderRadiusOptions = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ];
  return (
    <Box height="400px">
      <Box direction="row" gap="md" wrap>
        <Popover
          content={
            <>
              <p>Hello world!</p>
              <p>Style me any way you want</p>
            </>
          }
          isOpen={isPopoverOpen}
          placement={'right'}
          contentContainerProps={{
            padding: 'sm',
            background: popoverBackground!.value as FontColor,
            color: popoverFontColor!.value as FontColor,
            radius: popoverRadius!.value,
          }}
        >
          <Button onClick={togglePopover} variant="secondary">
            Toggle Popover
          </Button>
        </Popover>
      </Box>
      <Box direction="row" gap="sm" wrap margin="3xl 0 0 0">
        <Box width="200px">
          <SelectInput
            id="backgroundOptions"
            options={backgroundOptions}
            onChange={(event) => {
              // @ts-ignore
              setPopoverBackground(event.target.value);
            }}
            value={popoverBackground}
            label="Background Color"
          />
        </Box>
        <Box width="200px">
          <SelectInput
            id="fontColorOptions"
            options={fontColorOptions}
            onChange={(event) => {
              // @ts-ignore
              setPopoverFontColor(event.target.value);
            }}
            value={popoverFontColor}
            label="Font Color"
          />
        </Box>
        <Box width="200px">
          <SelectInput
            id="borderRadiusOptions"
            options={borderRadiusOptions}
            onChange={(event) => {
              // @ts-ignore
              setPopoverRadius(event.target.value);
            }}
            value={popoverRadius}
            label="Border Radius"
          />
        </Box>
      </Box>
    </Box>
  );
};

export const Placement = () => {
  const [isPopoverOpen, setPopoverOpen] = useState({
    auto: false,
    'auto-start': false,
    'auto-end': false,
    top: false,
    bottom: false,
    right: false,
    left: false,
    'top-start': false,
    'top-end': false,
    'bottom-start': false,
    'bottom-end': false,
    'right-start': false,
    'right-end': false,
    'left-start': false,
    'left-end': false,
  });
  const handleOpenPopover = (key: string) => {
    // @ts-ignore
    setPopoverOpen({ ...isPopoverOpen, [key]: !isPopoverOpen[key] });
  };
  const positions = [
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'bottom',
    'right',
    'left',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
  ];

  return (
    <Box direction="row" gap="md" wrap>
      {positions.map((position) => (
        <Box height="100px" padding="5xl" display="inline-block" key={position}>
          <Popover
            content={<>{position}</>}
            // @ts-ignore
            isOpen={isPopoverOpen[position]}
            // @ts-ignore
            placement={position}
            contentContainerProps={{
              padding: 'sm',
              background: 'blue-200',
              color: 'white-500',
            }}
          >
            <Button
              onClick={() => handleOpenPopover(position)}
              variant="secondary"
            >
              {position}
            </Button>
          </Popover>
        </Box>
      ))}
    </Box>
  );
};

export const WithAPortal = () => {
  const {
    isOpen: isPopoverOpen,
    handleToggle: togglePopover,
    handleClose: closePopover,
  } = useOpenClose();
  const popoverContent = (
    <>
      <Heading style={{ marginBottom: '0.5rem' }}>
        I am living in the body element!
      </Heading>
      <p>That's why I can break out of my container without getting cut off</p>
    </>
  );
  return (
    <Box display="inline-block">
      <Popover
        content={popoverContent}
        isOpen={isPopoverOpen}
        placement="right-start"
        contentContainerProps={{
          padding: 'md',
          background: 'red-200',
          color: 'primary-500',
        }}
        withPortal
        portalTarget={document.body}
        onClickOutside={closePopover}
      >
        <Button onClick={togglePopover} variant="primary">
          Toggle Popover
        </Button>
      </Popover>
    </Box>
  );
};

export const HoverTrigger = () => {
  const {
    isOpen: isPopoverOpen,
    handleClose: closePopover,
    handleOpen: openPopover,
  } = useOpenClose();
  const popoverContent = (
    <>
      <Heading style={{ marginBottom: '0.5rem' }}>
        I just appeared on hover!
      </Heading>
      <p>
        My visibility can easily be managed by attaching listeners to the
        trigger element
      </p>
    </>
  );
  return (
    <Box display="inline-block">
      <Popover
        content={popoverContent}
        isOpen={isPopoverOpen}
        placement="right-start"
        contentContainerProps={{
          padding: 'md',
          background: 'blue-500',
        }}
      >
        <Button
          onMouseOver={openPopover}
          onMouseOut={closePopover}
          variant="secondary"
        >
          Hover Me
        </Button>
      </Popover>
    </Box>
  );
};

export const RespondToOutsideClicks = () => {
  const {
    isOpen: isPopoverOpen,
    handleClose: closePopover,
    handleToggle: togglePopover,
  } = useOpenClose();
  const popoverContent = (
    <>
      <Heading style={{ marginBottom: '0.5rem' }}>
        I will close if you click outside!
      </Heading>
      <p>The event listener is attached to the document body.</p>
    </>
  );
  return (
    <Box display="inline-block">
      <Popover
        content={popoverContent}
        isOpen={isPopoverOpen}
        placement="right-start"
        withPortal
        portalTarget={document.body}
        onClickOutside={closePopover}
        contentContainerProps={{
          padding: 'md',
          background: 'green-500',
        }}
      >
        <Button onClick={togglePopover} variant="secondary">
          Toggle Popover
        </Button>
      </Popover>
    </Box>
  );
};

export const TrappingFocus = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const {
    isOpen: isPopoverOpen,
    handleClose: closePopover,
    handleToggle: togglePopover,
  } = useOpenClose();
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const popoverContent = (
    <>
      <Box direction="column" gap="sm">
        <Heading>Only the elements on this Popover can be tabbed into</Heading>
        <TextInput
          id="textInput"
          label="Text Input"
          onChange={handleInputChange}
          value={inputValue}
        />
        <Button>Submit</Button>
      </Box>
    </>
  );
  return (
    <Box display="inline-block">
      <Popover
        content={popoverContent}
        isOpen={isPopoverOpen}
        placement="right-start"
        contentContainerProps={{
          padding: 'md',
          background: 'white-500',
        }}
        withPortal
        portalTarget={document.body}
        onClickOutside={closePopover}
        trapFocus
      >
        <Button onClick={togglePopover} variant="secondary">
          Toggle Popover
        </Button>
      </Popover>
    </Box>
  );
};

export const WithoutAnArrow = () => {
  const {
    isOpen: isPopoverOpen,
    handleToggle: togglePopover,
    handleClose: closePopover,
  } = useOpenClose();
  const popoverContent = (
    <>
      <Box direction="column" gap="sm">
        <Heading>With no arrow</Heading>
        <p>I am floating in space</p>
      </Box>
    </>
  );
  return (
    <>
      <Popover
        content={popoverContent}
        isOpen={isPopoverOpen}
        placement="right"
        contentContainerProps={{
          padding: 'sm',
        }}
        onClickOutside={closePopover}
        hasArrow={false}
      >
        <Button onClick={togglePopover} variant="secondary">
          Toggle Popover
        </Button>
      </Popover>
    </>
  );
};

export const OffsetDistance = () => {
  const [offset, setOffset] = useState<number>(12);
  const { isOpen: isPopoverOpen, handleToggle: togglePopover } = useOpenClose();

  const popoverContent = (
    <>
      <Box direction="column" gap="sm">
        <Heading>Custom Offset</Heading>
        <p>Near, far, wherever your are...</p>
      </Box>
    </>
  );
  return (
    <>
      <Box display="inline-block">
        <Popover
          content={popoverContent}
          isOpen={isPopoverOpen}
          placement="right-start"
          contentContainerProps={{
            padding: 'md',
            background: 'grey-200',
          }}
          withPortal
          portalTarget={document.body}
          hasArrow={false}
          offsetFromTarget={offset}
        >
          <Button onClick={togglePopover} variant="secondary">
            Toggle Popover
          </Button>
        </Popover>
      </Box>
      <Box margin="2xl 0 0 0" maxWidth="300px">
        <label
          htmlFor="offset"
          style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}
        >
          Offset
        </label>
        <input
          type="range"
          id="offset"
          name="offset"
          min="0"
          max="24"
          step="1"
          value={offset}
          onChange={(event) => {
            setOffset(event.target.value as unknown as number);
          }}
          style={{ marginBottom: '0.25rem' }}
        />
        <span style={{ display: 'inline' }}>Value: {offset}</span>
      </Box>
    </>
  );
};
