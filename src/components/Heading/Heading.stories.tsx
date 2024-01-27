import { FONT_COLOR_OPTIONS, FONT_SIZE_OPTIONS } from '../../lib/tokens';

import { Heading } from './Heading';
import type { Meta } from '@storybook/react';
import React from 'react';
import { v4 as uuid } from 'uuid';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
};

export default meta;

export const Basic = () => <Heading as="h1">New Developer Operations Platform</Heading>;

export const AllLevels = () => (
  <>
    <Heading as="h1">h1 Heading</Heading>
    <Heading as="h2">h2 Heading</Heading>
    <Heading as="h3">h3 Heading</Heading>
    <Heading as="h4">h4 Heading</Heading>
    <Heading as="h5">h5 Heading</Heading>
    <Heading as="h6">h6 Heading</Heading>
  </>
);

export const Sizes = () => (
  <>
    {[...FONT_SIZE_OPTIONS].reverse().map(fontSize => (
      <Heading as="h3" size={fontSize} key={uuid()}>
        {`Size ${fontSize}`}
      </Heading>
    ))}
  </>
);

export const ResponsiveSizes = () => (
  <>
    <Heading
      as="h3"
      size={{ base: 'sm', tablet: 'lg', desktop: 'xl', hd: '3xl' }}
    >
      New Developer Operations Platform
    </Heading>
  </>
);

export const Colors = () => (
  <>
    {FONT_COLOR_OPTIONS.map(variant => (
      <Heading as="h3" variant={variant} key={uuid()}>
        {variant}
      </Heading>
    ))}
  </>
);
