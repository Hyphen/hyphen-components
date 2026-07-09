import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { FormControl } from './FormControl';

const meta = {
  component: FormControl,
  tags: ['ai-generated'],
} satisfies Meta<typeof FormControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'first-name',
    label: 'First name',
  },
  render: (args) => (
    <FormControl {...args}>
      <input id={args.id} type="text" />
    </FormControl>
  ),
  play: async ({ canvas }) => {
    // Proves the FormLabel htmlFor/input id wiring, not just that it mounted.
    await expect(canvas.getByLabelText('First name')).toBeVisible();
  },
};

export const WithHelpText: Story = {
  args: {
    id: 'email',
    label: 'Email address',
    helpText: 'We will never share your email.',
  },
  render: (args) => (
    <FormControl {...args}>
      <input id={args.id} type="email" />
    </FormControl>
  ),
};

export const WithError: Story = {
  args: {
    id: 'password',
    label: 'Password',
    error: 'Password must be at least 8 characters.',
  },
  render: (args) => (
    <FormControl {...args}>
      <input id={args.id} type="password" />
    </FormControl>
  ),
  play: async ({ canvas }) => {
    // The error prop renders as an InputValidationMessage below the input.
    await expect(
      canvas.getByText('Password must be at least 8 characters.')
    ).toBeVisible();
  },
};

export const Required: Story = {
  args: {
    id: 'username',
    label: 'Username',
    isRequired: true,
  },
  render: (args) => (
    <FormControl {...args}>
      <input id={args.id} type="text" required />
    </FormControl>
  ),
};

export const HiddenLabel: Story = {
  args: {
    id: 'search',
    label: 'Search',
    hideLabel: true,
  },
  render: (args) => (
    <FormControl {...args}>
      <input id={args.id} type="search" aria-label={args.label} />
    </FormControl>
  ),
  play: async ({ canvas }) => {
    // hideLabel suppresses the visible FormLabel entirely.
    await expect(canvas.queryByText('Search')).not.toBeInTheDocument();
    // The input must still be accessible via its aria-label.
    await expect(canvas.getByLabelText('Search')).toBeVisible();
  },
};
