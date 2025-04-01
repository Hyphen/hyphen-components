import React, { useState } from 'react';

import { Box } from '../Box/Box';
import type { Meta } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
};

export default meta;

export const Overview = () => (
  <Switch id="example" label="Switch label" isChecked onChange={() => {}} />
);

export const Basic = () => {
  const [value, setValue] = useState(false);
  return (
    <Switch
      id="defaultStateIsUnchecked"
      label="Switch label"
      onChange={(event) => setValue(event.target.checked)}
      isChecked={value}
    />
  );
};

export const HelpText = () => {
  const [value, setValue] = useState(false);
  return (
    <Switch
      id="helpText"
      label="Switch label"
      helpText="descriptive help text"
      onChange={(event) => setValue(event.target.checked)}
      isChecked={value}
    />
  );
};

export const HiddenLabel = () => {
  const [value, setValue] = useState(false);
  return (
    <Switch
      id="hiddenLabelSwitch"
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
      <Switch
        id="smSwitch"
        label="small Switch"
        onChange={(event) => setValue(event.target.checked)}
        isChecked={value}
        size="sm"
      />
      <Switch
        id="mediumSwitch"
        label="medium Switch"
        onChange={(event) => setValue(event.target.checked)}
        isChecked={value}
        size="md"
      />
      <Switch
        id="largeSwitch"
        label="large Switch"
        onChange={(event) => setValue(event.target.checked)}
        isChecked={value}
        size="lg"
      />
      <Switch
        id="responsiveSwitch"
        label="responsive Switch"
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
    <Switch
      id="disabledSwitch"
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
      <Switch
        id="invalidSwitch"
        label="Agree to Terms and Conditions"
        isChecked={value}
        onChange={(event) => setValue(event.target.checked)}
        isRequired
        error="You must accept the Terms and Conditions"
      />
      <Switch
        id="invalidSwitch2"
        label="Roof Replacement"
        isChecked={value2}
        onChange={(event) => setValue2(event.target.checked)}
        error="Site Improvements can not be present with PPA"
      />
    </Box>
  );
};
