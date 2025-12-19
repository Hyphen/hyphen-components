import React from 'react';
import { Box } from '../Box/Box';
import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { allModes } from '../../modes';
import { ICON_NAMES } from '@hyphen/hyphen-design-tokens/build/assets/icons';

const BUTTON_VARIANTS = ['primary', 'secondary', 'tertiary', 'danger', 'link'];
const BUTTON_SIZES = ['sm', 'md', 'lg'];
const BUTTON_SHADOWS = ['xs', 'sm', 'md'];

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: BUTTON_VARIANTS,
      description: 'Visual variant of the button',
    },
    size: {
      control: 'select',
      options: BUTTON_SIZES,
      description: 'Size of the button',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Displays a loading spinner and disables the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Button takes up the full width of its parent container',
    },
    iconPrefix: {
      control: 'select',
      options: ICON_NAMES,
      description: 'Icon displayed before the button label',
      mapping: {
        none: undefined,
      },
    },
    iconSuffix: {
      control: 'select',
      options: ICON_NAMES,
      description: 'Icon displayed after the button label',
      mapping: {
        none: undefined,
      },
    },
    shadow: {
      control: 'select',
      options: BUTTON_SHADOWS,
      description: 'Size of the drop shadow applied to the button',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child (e.g., anchor)',
    },
    className: {
      control: 'text',
      description: 'Custom class to apply to the button',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type attribute',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    isDisabled: false,
    isLoading: false,
    fullWidth: false,
    iconPrefix: undefined,
    iconSuffix: undefined,
    shadow: undefined,
    asChild: false,
    className: '',
    children: 'Button',
    type: 'button',
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

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    onClick: () => alert('clicked'),
  },
};

export const AsChild: Story = {
  args: {
    asChild: true,
    children: (
      <a href="https://ux.hyphen.ai" target="_blank" rel="noreferrer">
        I'm an anchor
      </a>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <Box
      gap="md"
      background="primary"
      direction="row"
      alignItems="center"
      fontSize="sm"
    >
      {BUTTON_VARIANTS.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const Sizes: Story = {
  render: () => (
    <Box gap="sm" direction="row" alignItems="flex-start">
      <Button variant="primary" size="sm">
        Label
      </Button>
      <Button variant="primary" size="md">
        Label
      </Button>
      <Button variant="primary" size="lg">
        Label
      </Button>
      <Button
        variant="primary"
        size={{
          base: 'sm',
          tablet: 'md',
          desktop: 'lg',
          hd: 'lg',
        }}
      >
        Label
      </Button>
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
    children: 'Full Width',
  },
};

export const Icons: Story = {
  render: () => (
    <Box direction="row" gap="md" alignItems="flex-start">
      <Button variant="primary" iconPrefix="mail">
        Email
      </Button>
      <Button variant="secondary" iconSuffix="chat">
        Chat Now
      </Button>
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const IconButton: Story = {
  render: () => (
    <Box gap="lg" direction="row" alignItems="center">
      <Button variant="tertiary" iconPrefix="add" aria-label="add" />
      <Button variant="tertiary" iconPrefix="dots" aria-label="open menu" />
      <Button variant="danger" iconPrefix="trash" aria-label="remove" />
      <Button variant="link" iconPrefix="chat" aria-label="chat" />
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const Loading: Story = {
  render: () => (
    <Box direction="row" gap="md" fontSize="sm">
      <Button isLoading aria-label="primary loading">
        Primary Loading
      </Button>
      <Button variant="secondary" isLoading aria-label="secondary loading">
        Secondary Loading
      </Button>
      <Button variant="tertiary" isLoading aria-label="tertiary loading">
        Tertiary Loading
      </Button>
      <Button variant="link" isLoading aria-label="link loading">
        Link Loading
      </Button>
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const Disabled: Story = {
  render: () => (
    <Box direction="row" gap="md" fontSize="sm">
      <Button variant="primary" isDisabled>
        Primary Disabled
      </Button>
      <Button variant="secondary" isDisabled>
        Secondary Disabled
      </Button>
      <Button variant="tertiary" isDisabled>
        Tertiary Disabled
      </Button>
      <Button variant="link" isDisabled>
        Link Disabled
      </Button>
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const Shadow: Story = {
  render: () => (
    <Box direction="row" gap="md">
      <Button variant="secondary" shadow="xs">
        xs shadow
      </Button>
      <Button variant="secondary" shadow="sm">
        sm shadow
      </Button>
      <Button variant="secondary" shadow="md">
        md shadow
      </Button>
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const InlineLink: Story = {
  render: () => (
    <Box display="block" as="p" fontSize="sm" color="base" width="8xl">
      This is an example of a button used as an inline link.{' '}
      <Button variant="link" size="md">
        Inline Link Button
      </Button>
      . It will wrap with text.
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};
