import React from 'react';
import type { Meta } from '@storybook/react';
import { UseOpenCloseProps, useOpenClose } from './useOpenClose';
import { Button } from '../../components/Button/Button';
import { Box } from '../../components/Box/Box';
import { Popover } from '../../components/Popover/Popover';

const meta: Meta<typeof useOpenClose> = {
  title: 'Hooks/useOpenClose',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const BasicUsage: React.FC<UseOpenCloseProps> = () => {
  const { isOpen, handleOpen, handleClose } = useOpenClose();
  const popoverContent = (
    <>
      <Box padding="lg" gap="md">
        <Box as="p">Hello!</Box>
      </Box>
    </>
  );
  return (
    <Popover
      placement="right-end"
      content={popoverContent}
      isOpen={isOpen}
      onClickOutside={handleClose}
      contentContainerProps={{
        padding: 'sm',
      }}
    >
      <Button variant="primary" type="button" onClick={handleOpen}>
        Open Popover
      </Button>
    </Popover>
  );
};
