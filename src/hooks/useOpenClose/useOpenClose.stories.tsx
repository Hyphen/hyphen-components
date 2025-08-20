import React from 'react';
import type { Meta } from '@storybook/react-vite';
import { UseOpenCloseProps, useOpenClose } from './useOpenClose';
import { Button } from '../../components/Button/Button';
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from '../../components/Popover/Popover';
import { Box } from '../../components/Box/Box';

const meta: Meta<typeof useOpenClose> = {
  title: 'Hooks/useOpenClose',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const BasicUsage: React.FC<UseOpenCloseProps> = () => {
  const { isOpen, handleOpen, handleClose } = useOpenClose();

  return (
    <Box gap="2xl" direction="row">
      <Popover open={isOpen}>
        <PopoverTrigger asChild>
          <Button variant="primary" type="button" onClick={handleOpen}>
            Open Popover
          </Button>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent onInteractOutside={handleClose}>
            <p>Hello!</p>
          </PopoverContent>
        </PopoverPortal>
      </Popover>
      <Button variant="secondary" onClick={handleOpen}>
        also opens
      </Button>
    </Box>
  );
};
