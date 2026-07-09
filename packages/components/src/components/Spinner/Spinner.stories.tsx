import { Box } from '../Box/Box';
import type { Meta } from '@storybook/react-vite';
import React from 'react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
};

export default meta;

export const Default = () => <Spinner />;

export const Color = () => (
  <Box display="block" childGap="md">
    <Box>
      <Spinner />
    </Box>
    <Box color="success">
      <Spinner />
    </Box>
    <Box color="inverse">
      <Spinner />
    </Box>
  </Box>
);

export const Sizes = () => (
  <Box direction="row" childGap="md">
    <Box direction="row" childGap="sm">
      <Spinner size="sm" />
      <div>sm</div>
    </Box>
    <Box direction="row" childGap="sm">
      <Spinner size="md" />
      <div>md</div>
    </Box>
    <Box direction="row" childGap="sm">
      <Spinner size="lg" />
      <div>lg</div>
    </Box>
    <Box direction="row" childGap="sm">
      <Spinner size="xl" />
      <div>xl</div>
    </Box>
  </Box>
);
