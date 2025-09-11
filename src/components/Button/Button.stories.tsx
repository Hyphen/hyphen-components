import React from 'react';
import { Box } from '../Box/Box';
import { Button } from './Button';
import type { Meta } from '@storybook/react-vite';
import { allModes } from '../../modes';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
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

export const Default = () => (
  <Button onClick={() => alert('clicked')}>Button</Button>
);

export const AsChild = () => (
  <Button asChild>
    <a href="https://ux.hyphen.ai" target="_blank" rel="noreferrer">
      I'm an anchor
    </a>
  </Button>
);

export const Variants = () => (
  <Box
    gap="md"
    background="primary"
    direction="row"
    alignItems="center"
    fontSize="sm"
  >
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="tertiary">Tertiary</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="link">Link</Button>
  </Box>
);

export const Sizes = () => (
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
);

export const FullWidth = () => (
  <Button variant="primary" fullWidth>
    Full Width
  </Button>
);

export const Icons = () => (
  <Box direction="row" gap="md" alignItems="flex-start">
    <Button variant="primary" iconPrefix="mail">
      Email
    </Button>
    <Button variant="secondary" iconSuffix="chat">
      Chat Now
    </Button>
  </Box>
);

export const IconButton = () => (
  <Box gap="lg" direction="row" alignItems="center">
    <Button variant="tertiary" iconPrefix="add" aria-label="add" />
    <Button variant="tertiary" iconPrefix="dots" aria-label="open menu" />
    <Button variant="danger" iconPrefix="trash" aria-label="remove" />
    <Button variant="link" iconPrefix="chat" aria-label="chat" />
  </Box>
);

export const Loading = () => (
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
);

export const Disabled = () => (
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
);

export const Shadow = () => (
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
);

export const InlineLink = () => (
  <Box display="block" as="p" fontSize="sm" color="base" width="8xl">
    This is an example of a button used as an inline link.{' '}
    <Button variant="link" size="md">
      Inline Link Button
    </Button>
    . It will wrap with text.
  </Box>
);
