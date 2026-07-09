import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { InputValidationMessage } from './InputValidationMessage';
import { Box } from '../Box/Box';

const meta = {
  component: InputValidationMessage,
  tags: ['ai-generated'],
} satisfies Meta<typeof InputValidationMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This field is required.',
  },
};

export const Sizes: Story = {
  args: {
    children: 'This field is required.',
  },
  render: () => (
    <Box gap="sm">
      <InputValidationMessage size="xs">
        Extra small validation message
      </InputValidationMessage>
      <InputValidationMessage size="sm">
        Small validation message
      </InputValidationMessage>
      <InputValidationMessage size="md">
        Medium validation message
      </InputValidationMessage>
    </Box>
  ),
};

export const CssCheck: Story = {
  args: {
    children: 'This field is required.',
  },
  play: async ({ canvas }) => {
    const message = canvas.getByText('This field is required.');
    // font-color-danger resolves to --color-font-danger (#dc2626 in the light
    // theme) — fails if the design-token CSS did not load in the preview.
    await expect(getComputedStyle(message).color).toBe('rgb(220, 38, 38)');
  },
};
