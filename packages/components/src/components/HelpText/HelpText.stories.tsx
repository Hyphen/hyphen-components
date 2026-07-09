import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelpText } from './HelpText';
import { Box } from '../Box/Box';

const meta = {
  component: HelpText,
  tags: ['ai-generated'],
} satisfies Meta<typeof HelpText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Additional clarifying text to help describe the input.',
  },
};

export const BelowAnInput: Story = {
  render: () => (
    <Box gap="2xs">
      <label htmlFor="help-text-example">Email address</label>
      <input id="help-text-example" type="email" />
      <HelpText>We will only use this to send your receipt.</HelpText>
    </Box>
  ),
};

export const WithRichContent: Story = {
  args: {
    children: (
      <>
        Must contain at least <strong>8 characters</strong>.
      </>
    ),
  },
};
