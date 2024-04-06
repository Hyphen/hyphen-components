import { Meta } from '@storybook/react';
import { Badge, BadgeVariant } from './Badge';
import React from 'react';
import { Box } from '../Box/Box';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
};

export default meta;

export const Overview = () => <Badge variant="grey" message="Hello world!" />;

export const Variants = () => {
  const variants = [
    'grey',
    'primary',
    'purple',
    'blue',
    'green',
    'yellow',
    'red',
  ] as BadgeVariant[];
  return (
    <Box direction="row" gap="sm">
      {variants.map((variant) => (
        <Badge message={variant} variant={variant} key={variant} />
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
        message="Responsive"
      />
    </Box>
  </>
);
