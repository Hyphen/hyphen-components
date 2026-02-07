import { Badge, BadgeVariant } from './Badge';
import React from 'react';
import { Box } from '../Box/Box';
import type { Meta, StoryObj } from '@storybook/react-vite';

const BADGE_VARIANTS: BadgeVariant[] = [
  'light-grey',
  'dark-grey',
  'inverse',
  'purple',
  'blue',
  'green',
  'yellow',
  'red',
  'orange',
  'hyphen',
];

const BADGE_SIZES = ['sm', 'md', 'lg'];

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: BADGE_VARIANTS,
      description: 'The type/color of the badge to show',
    },
    size: {
      control: 'select',
      options: BADGE_SIZES,
      description: 'The size of the badge',
    },
    message: {
      control: 'text',
      description:
        'The text message to be rendered in the badge (deprecated, use children instead)',
    },
    className: {
      control: 'text',
      description: 'Custom class to apply to the badge',
    },
    children: {
      control: 'text',
      description: 'Badge content (preferred over message)',
    },
  },
  args: {
    variant: 'light-grey',
    size: 'md',
    message: '',
    className: '',
    children: undefined,
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Overview: Story = {
  args: {
    message: 'Hello world!',
  },
};

export const Variants: Story = {
  render: () => (
    <Box direction="row" gap="sm">
      {BADGE_VARIANTS.map((variant) => (
        <Badge variant={variant} key={variant}>
          {variant}
        </Badge>
      ))}
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const Sizes: Story = {
  render: () => (
    <Box direction="column" alignItems="flex-start" gap="md">
      <Badge size="sm" message="Small" />
      <Badge size="md" message="Medium" />
      <Badge size="lg" message="Large" />
      <Badge
        size={{
          base: 'sm',
          tablet: 'md',
          desktop: 'lg',
        }}
      >
        Responsive
      </Badge>
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};
