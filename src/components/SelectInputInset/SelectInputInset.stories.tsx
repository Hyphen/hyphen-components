import React, { useState } from 'react';
import { SelectInputInset } from './SelectInputInset';
import type { Meta } from '@storybook/react';
import { Box } from '../Box/Box';

const meta: Meta<typeof SelectInputInset> = {
  title: 'Components/SelectInputInset',
  component: SelectInputInset,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const Default = () => {
  const [value, setValue] = useState('');
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <SelectInputInset
      id="default Select"
      label="Label"
      onChange={(event) => {
        setValue(event.target.value);
      }}
      options={options}
      value={value}
    />
  );
};

export const Required = () => {
  const [value, setValue] = useState('');
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <Box gap="md">
      <SelectInputInset
        id="requiredSelect"
        label="Required Field"
        onChange={(event) => {
          setValue(event.target.value);
        }}
        options={options}
        value={value}
        isRequired
      />
      <SelectInputInset
        id="customRequiredSelect"
        label="Custom Required Indicator Field"
        onChange={(event) => {
          setValue(event.target.value);
        }}
        options={options}
        value={value}
        isRequired
        requiredIndicator=" (required)"
      />
    </Box>
  );
};

export const HelpText = () => {
  const [value, setValue] = useState('');
  const options = [
    { value: 'Enphase', label: 'Enphase' },
    { value: 'SolarEdge', label: 'SolarEdge' },
    { value: 'Tesla', label: 'Tesla' },
  ];
  return (
    <SelectInputInset
      id="helpTextSelect"
      label="Inverter Manufacturer"
      helpText="Must be from the approved vendor list"
      onChange={(event) => {
        setValue(event.target.value);
      }}
      options={options}
      value={value}
    />
  );
};

export const ValidationError = () => {
  const [value, setValue] = useState('');
  const options = [
    { value: 'Enphase', label: 'Enphase' },
    { value: 'SolarEdge', label: 'SolarEdge' },
    { value: 'Tesla', label: 'Tesla' },
  ];
  return (
    <SelectInputInset
      id="errorSelect"
      label="Inverter Manufacturer"
      helpText="Must be from the approved vendor list"
      onChange={(event) => {
        setValue(event.target.value);
      }}
      options={options}
      value={value}
      error="Required Input"
    />
  );
};

export const Disabled = () => {
  const [value, setValue] = useState('');
  const options = [
    { value: 'Enphase', label: 'Enphase' },
    { value: 'SolarEdge', label: 'SolarEdge' },
    { value: 'Tesla', label: 'Tesla' },
  ];
  return (
    <SelectInputInset
      id="disabledSelect"
      label="Disabled Input"
      onChange={(event) => {
        setValue(event.target.value);
      }}
      options={options}
      value={value}
      isDisabled
    />
  );
};

export const Clearable = () => {
  const [value, setValue] = useState('Clear Me');
  const options = [
    { value: 'clear', label: 'Clear Me' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  return (
    <SelectInputInset
      id="clearableSelect"
      label="Clearable Input"
      onChange={(event) => {
        setValue(event.target.value);
      }}
      options={options}
      value={value}
      onClear={() => setValue('')}
    />
  );
};

export const Sizes = () => {
  const [value, setValue] = useState('');
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <Box gap="md">
      <SelectInputInset
        id="mdFlavorInput"
        value={value}
        label="md size"
        onChange={(event) => setValue(event.target.value)}
        options={options}
      />
      <SelectInputInset
        id="lgFlavorInput"
        value={value}
        size="lg"
        label="lg size"
        onChange={(event) => setValue(event.target.value)}
        options={options}
      />
      <SelectInputInset
        id="responsiveFlavorInput"
        value={value}
        size={{ base: 'md', tablet: 'lg', desktop: 'md', hd: 'lg' }}
        label="responsive size"
        onChange={(event) => setValue(event.target.value)}
        options={options}
      />
    </Box>
  );
};
