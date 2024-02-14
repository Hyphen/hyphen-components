import React, { useState } from 'react';

import { Box } from '../Box/Box';
import type { Meta } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
};

export default meta;

export const Overview = () => (
  <Toggle id="example" label="toggle label" isChecked onChange={() => {}} />
);

export const Basic = () => {
  const [value, setValue] = useState(false);
  return (
    <Toggle
      id="defaultStateIsUnchecked"
      label="toggle label"
      onChange={(event) => setValue(event.target.checked)}
      isChecked={value}
    />
  );
};

export const HelpText = () => {
  const [value, setValue] = useState(false);
  return (
    <Toggle
      id="helpText"
      label="toggle label"
      helpText="descriptive help text"
      onChange={(event) => setValue(event.target.checked)}
      isChecked={value}
    />
  );
};

export const HiddenLabel = () => {
  const [value, setValue] = useState(false);
  return (
    <Toggle
      id="hiddenLabelToggle"
      label="Hidden Label"
      helpText="hidden help text too"
      hideLabel
      onChange={(event) => setValue(event.target.checked)}
      isChecked={value}
    />
  );
};

export const Sizes = () => {
  const [value, setValue] = useState(true);
  return (
    <Box gap="md">
      <Toggle
        id="smToggle"
        label="small toggle"
        onChange={(event) => setValue(event.target.checked)}
        isChecked={value}
        size="sm"
      />
      <Toggle
        id="mediumToggle"
        label="medium toggle"
        onChange={(event) => setValue(event.target.checked)}
        isChecked={value}
        size="md"
      />
      <Toggle
        id="largeToggle"
        label="large toggle"
        onChange={(event) => setValue(event.target.checked)}
        isChecked={value}
        size="lg"
      />
      <Toggle
        id="responsiveToggle"
        label="responsive toggle"
        onChange={(event) => setValue(event.target.checked)}
        isChecked={value}
        size={{ base: 'sm', tablet: 'md', desktop: 'lg', hd: 'sm' }}
      />
    </Box>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState(false);
  return (
    <Toggle
      id="disabledToggle"
      label="Label"
      onChange={(event) => setValue(event.target.checked)}
      isChecked={value}
      isDisabled
    />
  );
};

export const Error = () => {
  const [value, setValue] = useState(false);
  const [value2, setValue2] = useState(true);
  return (
    <Box gap="md">
      <Toggle
        id="invalidToggle"
        label="Agree to Terms and Conditions"
        isChecked={value}
        onChange={(event) => setValue(event.target.checked)}
        isRequired
        error="You must accept the Terms and Conditions"
      />
      <Toggle
        id="invalidToggle2"
        label="Roof Replacement"
        isChecked={value2}
        onChange={(event) => setValue2(event.target.checked)}
        error="Site Improvements can not be present with PPA"
      />
    </Box>
  );
};
