import { Box } from '../Box/Box';
import { ICON_NAMES } from '../../lib/tokens';
import { Icon } from './Icon';
import type { Meta } from '@storybook/react';
import React from 'react';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
};

export default meta;

export const Default = () => <Icon name="star" />;

export const Sizes = () => (
  <>
    <Box direction="row" childGap="sm" margin="0 0 md 0" fontSize="xs">
      <Icon name="remove" color="danger-500" />
      <Box>Size is set by the Icon's parent</Box>
    </Box>
    <Box direction="row" fontSize="xl" childGap="sm">
      <Icon name="star" color="warning-400" />
      <Box>Size is set by the Icon's parent</Box>
    </Box>
  </>
);

export const Colors = () => (
  <>
    <Box direction="row" childGap="sm" margin="0 0 md 0">
      <Icon name="remove" color="danger-500" />
      <Box>Color is set at the Icon level</Box>
    </Box>
    <Box direction="row" childGap="sm" color="secondary-400">
      <Icon name="add" />
      <Box>Color is set by the Icon's parent</Box>
    </Box>
  </>
);

export const UnknownIcon = () => (
  <Icon name={'does-not-exist' as any} className="font-size-2xl" />
);

export const AvailableIcons = () => (
  <Box
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(6rem,1fr))',
      gridAutoRows: '6rem',
      gap: '1rem',
    }}
  >
    {ICON_NAMES.map((name) => (
      <Box
        key={name}
        fontSize="lg"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        childGap="sm"
      >
        <Icon className="neutral-500" name={name} />
        <Box as="p" color="grey-500" fontSize="sm">
          {name}
        </Box>
      </Box>
    ))}
  </Box>
);
