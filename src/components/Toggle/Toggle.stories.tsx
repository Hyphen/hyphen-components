import React from 'react';
import type { Meta } from '@storybook/react';

import { Toggle } from './Toggle';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
};

export default meta;

export const Basic = () => (
  <Toggle aria-label="list">
    <Icon name="list" />
  </Toggle>
);

export const WithText = () => (
  <Toggle aria-label="list">
    <Icon name="list" />
    List
  </Toggle>
);

export const DefaultPressed = () => (
  <Toggle defaultPressed aria-label="checked">
    Pressed
  </Toggle>
);

export const Outline = () => (
  <Toggle variant="outline" aria-label="list">
    <Icon name="list" />
  </Toggle>
);

export const Disabled = () => (
  <Toggle disabled aria-label="list">
    <Icon name="list" />
  </Toggle>
);
