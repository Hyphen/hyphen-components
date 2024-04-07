import { FormLabel } from './FormLabel';

import type { Meta } from '@storybook/react';
import React from 'react';

const meta: Meta<typeof FormLabel> = {
  title: 'Components/FormLabel',
  component: FormLabel,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const BasicUsage = () => (
  <FormLabel inputId="inputId" helpText="More helpful text about the input">
    Default Label
  </FormLabel>
);
