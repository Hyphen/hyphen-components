import {
  Badge,
  BadgeHue,
  BadgeRadius,
  BadgeSemanticColor,
  BadgeSize,
  BadgeVariant,
} from './Badge';
import React from 'react';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
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
    className: {
      control: 'text',
      description: 'Custom class to apply to the badge',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
  args: {
    variant: 'soft',
    color: 'grey',
    radius: 'full',
    size: 'md',
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
    children: 'Hello world!',
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

export const WithIcons: Story = {
  render: () => (
    <Box direction="column" alignItems="flex-start" gap="md">
      <Box direction="row" gap="sm" alignItems="center" wrap>
        <Badge variant="solid" color="green">
          <Icon name="check" />
          Verified
        </Badge>
        <Badge variant="outline" color="yellow">
          Favorite
          <Icon name="star" />
        </Badge>
        <Badge variant="soft" color="danger">
          <Spinner />
          Deleting
        </Badge>
        <Badge variant="surface" color="blue">
          <Icon name="settings" />
        </Badge>
      </Box>
      {BADGE_SIZES.map((size) => (
        <Box direction="row" gap="sm" alignItems="center" key={size}>
          <Badge size={size as BadgeSize} variant="solid" color="green">
            <Icon name="check" />
            {size}
          </Badge>
          <Badge size={size as BadgeSize} variant="outline">
            {size}
            <Icon name="star" />
          </Badge>
          <Badge size={size as BadgeSize} variant="soft" color="danger">
            <Spinner />
            {size}
          </Badge>
        </Box>
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
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
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
