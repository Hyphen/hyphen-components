import React from 'react';
import { Box } from '../Box/Box';
import { Button } from './Button';
import type { Meta } from '@storybook/react';
import { allModes } from '../../../.storybook/modes';

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

export const Variants = () => (
  <Box gap="md" style={{ backgroundColor: 'var(--background-primary)' }}>
    <Box gap="sm" direction="row" alignItems="flex-start">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="danger">Danger</Button>
    </Box>
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
  <Box direction="row" gap="xs" alignItems="flex-start">
    <Button variant="primary" iconPrefix="mail">
      Email
    </Button>
    <Button variant="secondary" iconSuffix="chat">
      Chat Now
    </Button>
  </Box>
);

export const IconButton = () => (
  <>
    <Button variant="tertiary" iconPrefix="add" aria-label="add" />
    <Button variant="tertiary" iconPrefix="dots" aria-label="open menu" />
    <Button variant="danger" iconPrefix="trash" aria-label="remove" />
  </>
);

export const Loading = () => (
  <Box direction="row" gap="sm">
    <Button isLoading>Primary Loading</Button>
    <Button variant="secondary" isLoading>
      Secondary Loading
    </Button>
    <Button variant="tertiary" isLoading>
      Tertiary Loading
    </Button>
  </Box>
);

export const Disabled = () => (
  <Box direction="row" gap="sm">
    <Button variant="primary" isDisabled>
      Primary Disabled
    </Button>
    <Button variant="secondary" isDisabled>
      Secondary Disabled
    </Button>
    <Button variant="tertiary" isDisabled>
      Tertiary Disabled
    </Button>
  </Box>
);

export const Anchor = () => (
  <Button as="a" href="https://ux.hyphen.ai" target="_blank">
    I'm an anchor tag
  </Button>
);
