import { Heading } from './Heading';
import type { Meta } from '@storybook/react-vite';
import React from 'react';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
};

export default meta;

export const Levels = () => (
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
    <Heading as="h3" size="sm">
      sm 16px
    </Heading>
    <Heading as="h3" size="md">
      md 20px
    </Heading>
    <Heading as="h3" size="lg">
      lg 24px
    </Heading>
    <Heading as="h3" size="xl">
      xl 32px
    </Heading>
    <Heading as="h3" size="2xl">
      2xl 40px
    </Heading>
    <Heading as="h3" size="3xl">
      3xl 48px
    </Heading>
    <Heading as="h3" size="4xl">
      4xl 56px
    </Heading>
    <Heading as="h3" size="5xl">
      5xl 64px
    </Heading>
    <Heading as="h3" size="6xl">
      6xl 72px
    </Heading>
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
    <Heading as="h3" color="base">
      base
    </Heading>
    <Heading as="h3" color="secondary">
      secondary
    </Heading>
    <Heading as="h3" color="inverse">
      inverse
    </Heading>
    <Heading as="h3" color="disabled">
      disabled
    </Heading>
    <Heading as="h3" color="success">
      success
    </Heading>
    <Heading as="h3" color="warning">
      warning
    </Heading>
    <Heading as="h3" color="danger">
      danger
    </Heading>
  </>
);
