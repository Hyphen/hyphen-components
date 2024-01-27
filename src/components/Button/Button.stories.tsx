import { Box } from '../Box/Box';
import { Button } from './Button';
import type { Meta } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

export const Default = () => (
  <Button onClick={() => alert('clicked')}>Button</Button>
);

export const Variants = () => (
  <Box childGap="md" style={{ backgroundColor: 'var(--background-primary)' }}>
    <Box childGap="sm" direction="row" alignItems="flex-start">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </Box>
    <Box childGap="sm" direction="row" alignItems="flex-start">
      <Button variant="primary-neutral">Primary-Neutral</Button>
      <Button variant="secondary-neutral">Secondary-Neutral</Button>
      <Button variant="tertiary-neutral">Tertiary-Neutral</Button>
    </Box>
    <Box childGap="sm" direction="row" alignItems="flex-start">
      <Button variant="primary-danger">Primary-Danger</Button>
      <Button variant="secondary-danger">Secondary-Danger</Button>
      <Button variant="tertiary-danger">Tertiary-Danger</Button>
    </Box>
  </Box>
);

export const Sizes = () => (
  <Box childGap="sm" direction="row" alignItems="flex-start">
    <Button size="xs">xs</Button>
    <Button size="sm">sm</Button>
    <Button size="md">md</Button>
    <Button size="lg">lg</Button>
    <Button
      size={{
        base: 'xs',
        tablet: 'sm',
        desktop: 'md',
        hd: 'lg',
      }}
      variant="primary-neutral"
    >
      responsive
    </Button>
  </Box>
);

export const FullWidth = () => (
  <Button variant="primary-neutral" fullWidth>
    Full Width
  </Button>
);

export const Icons = () => (
  <Box direction="row" childGap="xs">
    <Button variant="primary-neutral" iconPrefix="mail">
      Email
    </Button>
    <Button variant="secondary-neutral" iconSuffix="chat">
      Chat Now
    </Button>
  </Box>
);

export const IconButton = () => (
  <>
    <Button variant="tertiary" iconPrefix="add" aria-label="add" />
    <Button
      variant="tertiary-neutral"
      iconPrefix="dots"
      aria-label="open menu"
    />
    <Button variant="tertiary-danger" iconPrefix="trash" aria-label="remove" />
  </>
);

export const Loading = () => (
  <Box direction="row" childGap="sm">
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
  <Box direction="row" childGap="sm">
    <Button variant="primary-neutral" isDisabled>
      Primary Disabled
    </Button>
    <Button variant="secondary-neutral" isDisabled>
      Secondary Disabled
    </Button>
    <Button variant="tertiary-neutral" isDisabled>
      Tertiary Disabled
    </Button>
  </Box>
);

export const EventCallbacks = () => (
  <Button
    onBlur={action('blur')}
    onClick={action('click')}
    onFocus={action('focus')}
  >
    click, focus, blur events
  </Button>
);

export const Anchor = () => (
  <Button as="a" href="https://ux.palmetto.com" target="_blank">
    I'm an anchor tag
  </Button>
);

export const CustomTheme = () => (
  <Box
    childGap="sm"
    direction="row"
    alignItems="flex-start"
    style={
      {
        '--button-font-family': 'var(--asset-fonts-brand)',
        '--button-font-weight': 'var(--size-font-weight-bold)',
        '--button-size-xs-border-radius': '0',
        '--button-size-sm-border-radius': '0',
        '--button-size-md-border-radius': '0',
        '--button-size-lg-border-radius': '0',
      } as any
    }
  >
    <Button variant="primary" size="xs">
      Get Solar
    </Button>
    <Button variant="primary" size="sm">
      Get Solar
    </Button>
    <Button variant="primary" size="md">
      Get Solar
    </Button>
    <Button variant="primary" size="lg">
      Get Solar
    </Button>
  </Box>
);
