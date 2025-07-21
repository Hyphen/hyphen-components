import React from 'react';
import type { Meta } from '@storybook/react-vite';

import { Toggle } from './Toggle';
import { Icon } from '../Icon/Icon';
import { Box } from '../Box/Box';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
};

export default meta;

export const Basic = () => (
  <Toggle aria-label="list">
    <Icon name="list" />
  </Toggle>
);

export const WithText = () => (
  <Toggle aria-label="list">
    <Icon name="list" />
    List
  </Toggle>
);

export const DefaultPressed = () => (
  <Toggle defaultPressed aria-label="checked">
    Pressed
  </Toggle>
);

export const Outline = () => (
  <Toggle variant="outline" aria-label="list">
    <Icon name="list" />
  </Toggle>
);

export const Disabled = () => (
  <Toggle disabled aria-label="list">
    <Icon name="list" />
  </Toggle>
);

export const AsChild = () => (
  <Toggle asChild aria-label="list">
    <Box
      width="fit"
      justifyContent="flex-start"
      textAlign="left"
      alignItems="flex-start"
      gap="xs"
    >
      <Box fontSize="xl" fontWeight="semibold">
        99%
      </Box>
      <Box color="tertiary" fontSize="xs">
        Standard
      </Box>
    </Box>
  </Toggle>
);
