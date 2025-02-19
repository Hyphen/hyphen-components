import React, { useState } from 'react';
import { SelectInputNative } from './SelectInputNative';
import type { Meta } from '@storybook/react';
import { Box } from '../Box/Box';

const meta: Meta<typeof SelectInputNative> = {
  title: 'Components/SelectInputNative',
  component: SelectInputNative,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const Default = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div>
      <SelectInputNative
        id="default Select"
        label="Label"
        onChange={(event) => {
          setValue(event.target.value);
        }}
        options={options}
        value={value}
      />
    </div>
  );
};

export const PreSelected = () => {
  const [value, setValue] = useState(options[1].value);
  return (
    <div>
      <SelectInputNative
        id="preSelected"
        label="Label"
        onChange={(event) => setValue(event.target.value)}
        options={options}
        value={value}
      />
    </div>
  );
};

export const HelpText = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div>
      <SelectInputNative
        id="helpText"
        label="Flavor"
        helpText="Choose your favorite flavor"
        onChange={(event) => setValue(event.target.value)}
        options={options}
        value={value}
      />
    </div>
  );
};

export const Placeholder = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div>
      <SelectInputNative
        id="customPlaceholder"
        label="Label"
        onChange={(event) => setValue(event.target.value)}
        options={options}
        value={value}
        placeholder="Custom placeholder..."
      />
    </div>
  );
};

export const HiddenLabel = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div>
      <SelectInputNative
        id="labelHidden"
        label="My label is hidden"
        onChange={(event) => setValue(event.target.value)}
        options={options}
        value={value}
        hideLabel
      />
    </div>
  );
};

export const Autofocus = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div>
      <SelectInputNative
        id="autoFocus"
        label="Label"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        options={options}
        autoFocus
      />
    </div>
  );
};

export const Required = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <SelectInputNative
      id="required"
      label="Required Input"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      options={options}
      isRequired
    />
  );
};

export const CustomRequiredIndicator = () => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  return (
    <Box gap="md">
      <SelectInputNative
        id="withouRequiredIndicator"
        label="Required Without Indicator"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        options={options}
        isRequired
        requiredIndicator={null}
      />
      <SelectInputNative
        id="customRequiredIndicator"
        label="Required Custom Indicator"
        value={value2}
        onChange={(event) => setValue2(event.target.value)}
        options={options}
        isRequired
        requiredIndicator=" (required)"
      />
    </Box>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div style={{ height: '85px' }}>
      <SelectInputNative
        id="disabled"
        label="Label"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        options={options}
        isDisabled
      />
    </div>
  );
};

export const Error = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div style={{ height: '200px' }}>
      <SelectInputNative
        id="error"
        label="Label"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        options={options}
        isRequired
        error="Helpful validation message"
      />
    </div>
  );
};

export const Sizes = () => {
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  return (
    <Box gap="md">
      <SelectInputNative
        id="smallSelect"
        label="Small"
        onChange={(event) => setValue(event.target.value)}
        options={options}
        value={value}
        size="sm"
      />
      <SelectInputNative
        id="mediumSelect"
        label="Medium"
        onChange={(event) => setValue1(event.target.value)}
        options={options}
        value={value1}
        size="md"
      />
      <SelectInputNative
        id="largeSelect"
        label="Large"
        onChange={(event) => setValue2(event.target.value)}
        options={options}
        value={value2}
        size="lg"
      />
      <SelectInputNative
        id="responsiveSelect"
        label="Responsive"
        onChange={(event) => setValue3(event.target.value)}
        options={options}
        value={value3}
        size={{ base: 'sm', tablet: 'md', desktop: 'lg', hd: 'sm' }}
      />
    </Box>
  );
};
