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
      <input
        id="help-text-example"
        type="email"
        aria-describedby="help-text-example-hint"
      />
      {/* HelpText doesn't forward an id, so associate via a wrapper. */}
      <div id="help-text-example-hint">
        <HelpText>We will only use this to send your receipt.</HelpText>
      </div>
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
