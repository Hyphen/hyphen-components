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

export const DefaultFormLabel = () => (
  <FormLabel inputId="inputId">Default Label</FormLabel>
);

export const OverviewFormLabel = () => (
  <FormLabel inputId="inputId">Form Label</FormLabel>
);

export const InteractiveFormLabel = () => (
  <FormLabel inputId="customText">
    This label has a span with
    <span style={{ fontStyle: 'italic' }}>&nbsp;Italic&nbsp;</span>
    and also a&nbsp;
    <a href="https://hyphen.ai" target="_blank" rel="noreferrer">
      Link
    </a>
  </FormLabel>
);

export const HelpTextFormLabel = () => (
  <FormLabel inputId="required" helpText="More helpful text about the input">
    Required input label
  </FormLabel>
);
