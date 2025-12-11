import { Meta } from '@storybook/react-vite';
import { Badge, BadgeVariant } from './Badge';
import React from 'react';
import { Box } from '../Box/Box';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
};

export default meta;

export const Overview = () => <Badge message="Hello world!" />;

export const Variants = () => {
  const variants = [
    'light-grey',
    'dark-grey',
    'inverse',
    'purple',
    'blue',
    'green',
    'yellow',
    'red',
    'hyphen',
  ] as BadgeVariant[];
  return (
    <Box direction="row" gap="sm">
      {variants.map((variant) => (
        <Badge variant={variant} key={variant}>
          {variant}
        </Badge>
      ))}
    </Box>
  );
};

export const Sizes = () => (
  <>
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
  </>
);
