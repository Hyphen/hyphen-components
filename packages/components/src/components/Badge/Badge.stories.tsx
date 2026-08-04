import {
  Badge,
  BadgeHue,
  BadgeRadius,
  BadgeSemanticColor,
  BadgeVariant,
} from './Badge';
import React from 'react';
import { Box } from '../Box/Box';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { allModes } from '../../modes';

const BADGE_VARIANTS: BadgeVariant[] = ['solid', 'soft', 'surface', 'outline'];

const BADGE_HUES: BadgeHue[] = [
  'grey',
  'blue',
  'green',
  'yellow',
  'red',
  'purple',
  'orange',
  'brand',
];

const BADGE_SEMANTIC_COLORS: BadgeSemanticColor[] = [
  'danger',
  'success',
  'warning',
  'info',
];

const BADGE_RADII: BadgeRadius[] = ['none', 'sm', 'md', 'lg', 'full'];

const BADGE_SIZES = ['sm', 'md', 'lg'];

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: BADGE_VARIANTS,
      description: 'The visual style of the badge',
    },
    color: {
      control: 'select',
      options: [...BADGE_HUES, ...BADGE_SEMANTIC_COLORS],
      description:
        'The color of the badge. Semantic names map onto a hue: danger, success, warning, info',
    },
    radius: {
      control: 'select',
      options: BADGE_RADII,
      description: "The roundness of the badge's corners",
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
    variant: 'soft',
    color: 'grey',
    radius: 'full',
    size: 'md',
    message: '',
    className: '',
    children: undefined,
  },
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light'],
        dark: allModes['dark'],
      },
    },
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
        <Badge variant={variant} color="blue" key={variant}>
          {variant}
        </Badge>
      ))}
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const Colors: Story = {
  render: () => (
    <Box direction="column" gap="sm">
      {BADGE_VARIANTS.map((variant) => (
        <Box direction="row" gap="sm" wrap key={variant}>
          {BADGE_HUES.map((color) => (
            <Badge variant={variant} color={color} key={color}>
              {color}
            </Badge>
          ))}
        </Box>
      ))}
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const SemanticColors: Story = {
  render: () => (
    <Box direction="row" gap="sm" wrap>
      {BADGE_SEMANTIC_COLORS.map((color) => (
        <Badge color={color} key={color}>
          {color}
        </Badge>
      ))}
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const Radii: Story = {
  render: () => (
    <Box direction="row" gap="sm" wrap>
      {BADGE_RADII.map((radius) => (
        <Badge radius={radius} variant="surface" color="blue" key={radius}>
          {radius}
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
