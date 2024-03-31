import type { Meta } from '@storybook/react';
import React, { useState } from 'react';
import { TextInput } from './TextInput';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const Basic = () => (
  <TextInput id="demo" label="TextInput Label" onChange={() => {}} value="" />
);

export const Examples = () => {
  const [value, setValue] = useState('');
  return (
    <TextInput
      id="default"
      value={value}
      label="TextInput Label"
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export const Required = () => {
  const [value, setValue] = useState('');
  return (
    <TextInput
      id="required"
      value={value}
      label="Required Text Input"
      onChange={(event) => setValue(event.target.value)}
      isRequired
    />
  );
};

export const CustomRequiredIndicator = () => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  return (
    <Box gap="md">
      <TextInput
        id="requiredWithoutIndicator"
        label="Required Without Indicator"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        isRequired
        requiredIndicator={null}
      />
      <TextInput
        id="requiredCustomIndicator"
        label="Required Custom Indicator"
        value={value2}
        onChange={(event) => setValue2(event.target.value)}
        isRequired
        requiredIndicator=" (required)"
      />
    </Box>
  );
};

export const WithHelpText = () => {
  const [value, setValue] = useState('');
  return (
    <TextInput
      id="helpText"
      value={value}
      label="Mobile Phone"
      helpText="We willl use this phone number to contact you via text"
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export const Placeholder = () => {
  const [value, setValue] = useState('');
  return (
    <TextInput
      id="placeholder"
      value={value}
      label="TextInput with placeholder"
      onChange={(event) => setValue(event.target.value)}
      placeholder="Custom placeholder..."
    />
  );
};

export const Autofocus = () => {
  const [value, setValue] = useState('');
  return (
    <TextInput
      id="autofocus"
      value={value}
      label="Label"
      onChange={(event) => setValue(event.target.value)}
      autoFocus
    />
  );
};

export const HiddenLabel = () => {
  const [value, setValue] = useState('');
  return (
    <TextInput
      id="hiddenLabel"
      value={value}
      label="Hidden Label"
      onChange={(event) => setValue(event.target.value)}
      hideLabel
    />
  );
};

export const Disabled = () => {
  const [value, setValue] = useState('Preset value');
  return (
    <TextInput
      id="disabledWithValue"
      value={value}
      label="Label"
      onChange={(event) => setValue(event.target.value)}
      isDisabled
    />
  );
};

export const PrefixAndSuffix = () => {
  const [prefixValue1, setPrefixValue1] = useState('');
  const [prefixValue2, setPrefixValue2] = useState('49');
  const [prefixValue3, setPrefixValue3] = useState('');
  const [prefixValue4, setPrefixValue4] = useState('Pre-populated Value');
  return (
    <Box gap="md">
      <TextInput
        id="prefixSuffix1"
        value={prefixValue1}
        label="Prefix"
        onChange={(event) => setPrefixValue1(event.target.value)}
        prefix="@"
      />
      <TextInput
        id="prefixSuffix2"
        value={prefixValue2}
        label="Prefix and Suffix"
        onChange={(event) => setPrefixValue2(event.target.value)}
        prefix="$"
        suffix="per watt"
      />
      <TextInput
        id="prefixSuffix3"
        value={prefixValue3}
        label="Suffix"
        placeholder="Contact name"
        onChange={(event) => setPrefixValue3(event.target.value)}
        suffix={<Icon name="user" />}
      />
      <TextInput
        id="prefixSuffix4"
        value={prefixValue4}
        label="Suffix with Clear"
        placeholder="Contact name"
        onChange={(event) => setPrefixValue4(event.target.value)}
        onClear={() => setPrefixValue4('')}
        suffix={<Icon name="search" />}
      />
    </Box>
  );
};

export const Clearable = () => {
  const [value, setValue] = useState('clear me');
  return (
    <TextInput
      id="required"
      value={value}
      label="Label"
      onChange={(event) => setValue(event.target.value)}
      onClear={() => setValue('')}
      isRequired
    />
  );
};

export const Sizes = () => {
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [valueResponsive, setValueResponsive] = useState('');
  return (
    <Box
      direction={{
        base: 'column',
      }}
      gap={{
        base: 'sm',
        tablet: 'md',
        desktop: 'lg',
        hd: 'lg',
      }}
      width="100%"
    >
      <TextInput
        id="sizeSmall"
        value={value}
        label="Small Size"
        size="sm"
        onChange={(event) => setValue(event.target.value)}
      />
      <TextInput
        id="sizeMedium"
        value={value1}
        label="Medium Size"
        onChange={(event) => setValue1(event.target.value)}
      />
      <TextInput
        id="sizeLarge"
        value={value2}
        label="Large Size"
        size="lg"
        onChange={(event) => setValue2(event.target.value)}
      />
      <TextInput
        id="responsiveSize"
        value={valueResponsive}
        label="Responsive Size"
        size={{ base: 'sm', tablet: 'md', desktop: 'lg' }}
        onChange={(event) => setValueResponsive(event.target.value)}
      />
    </Box>
  );
};

export const MaxLength = () => {
  const [value, setValue] = useState('');
  return (
    <TextInput
      id="maxLength"
      value={value}
      label="Label"
      maxLength={5}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Can't enter more than 5 characters..."
    />
  );
};

export const ValidationError = () => {
  const [value, setValue] = useState('');
  return (
    <TextInput
      id="requiredWithValidationMessage"
      value={value}
      label="Label"
      onChange={(event) => setValue(event.target.value)}
      isRequired
      error="Helpful validation message"
    />
  );
};
