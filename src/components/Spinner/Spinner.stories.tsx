import { Box } from '../Box/Box';
import type { Meta } from '@storybook/react';
import React from 'react';
import { Spinner } from './Spinner';
import { FONT_COLOR_OPTIONS } from '../../lib';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
};

export default meta;

export const Default = () => <Spinner />;

export const Variants = () => (
  <Box display="block" childGap="md">
    {[...FONT_COLOR_OPTIONS].map((color) => (
      <Box direction="row" childGap="sm">
        <Spinner variant={color} />
        <div>{color}</div>
      </Box>
    ))}
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
