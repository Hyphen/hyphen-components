import React, { useState } from 'react';
import { TextInputInset } from './TextInputInset';
import type { Meta } from '@storybook/react';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof TextInputInset> = {
  title: 'Components/TextInputInset',
  component: TextInputInset,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const Default = () => {
  const [value, setValue] = useState('');
  const [valuePw, setValuePw] = useState('');
  return (
    <Box gap="md">
      <TextInputInset
        id="emailInput"
        value={value}
        label="Email"
        placeholder="Enter your email address"
        onChange={(event) => setValue(event.target.value)}
      />
      <TextInputInset
        id="passwordInput"
        value={valuePw}
        label="Password"
        type="password"
        placeholder="Enter your password"
        onChange={(event) => setValuePw(event.target.value)}
        helpText="Password must be at least 8 characters long"
      />
    </Box>
  );
};

export const Required = () => {
  const [value, setValue] = useState('');
  return (
    <Box gap="md">
      <TextInputInset
        id="requiredInput"
        value={value}
        label="Required Input"
        placeholder="Enter your email address"
        onChange={(event) => setValue(event.target.value)}
        isRequired
      />
      <TextInputInset
        id="customRequiredInput"
        value={value}
        label="Required Input"
        onChange={(event) => setValue(event.target.value)}
        isRequired
        requiredIndicator=" (required)"
      />
    </Box>
  );
};

export const HelpText = () => {
  const [value, setValue] = useState('');
  return (
    <TextInputInset
      id="helpTextStory"
      value={value}
      label="Inverter Manufacturer"
      onChange={(event) => setValue(event.target.value)}
      helpText="Must be from the approved vendor list"
    />
  );
};

export const ValidationError = () => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('Invalid Value');
  return (
    <Box gap="md">
      <TextInputInset
        id="error1"
        value={value}
        label="email"
        error="Required Input"
        onChange={(event) => setValue(event.target.value)}
        isRequired
      />
      <TextInputInset
        id="error2"
        value={value2}
        label="email"
        error="Must be a valid email address"
        helpText="e.g. name@email.com"
        onChange={(event) => setValue2(event.target.value)}
      />
    </Box>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('Value');
  return (
    <Box gap="md">
      <TextInputInset
        id="disabled"
        value={value}
        label="email"
        onChange={(event) => setValue(event.target.value)}
        isDisabled
      />
      <TextInputInset
        id="disabledValue"
        value={value2}
        label="Disabled with Value"
        onChange={(event) => setValue2(event.target.value)}
        isDisabled
      />
    </Box>
  );
};

export const Clearable = () => {
  const [value, setValue] = useState('clear me');
  return (
    <TextInputInset
      id="clearableTextInput"
      value={value}
      label="Clearable Input"
      onChange={(event) => setValue(event.target.value)}
      onClear={() => setValue('')}
      isRequired
    />
  );
};

export const PrefixAndSuffix = () => {
  const [prefixValue0, setPrefixValue0] = useState('');
  const [prefixValue1, setPrefixValue1] = useState('hyphen');
  const [prefixValue2, setPrefixValue2] = useState('2.51');
  const [prefixValue3, setPrefixValue3] = useState('');
  const [prefixValue4, setPrefixValue4] = useState('Pre-populated Value');
  return (
    <Box gap="md">
      <TextInputInset
        id="prefixSuffix0"
        value={prefixValue0}
        label="website address"
        onChange={(event) => setPrefixValue0(event.target.value)}
        prefix="https://"
        placeholder="Enter your website address"
      />
      <TextInputInset
        id="prefixSuffix1"
        value={prefixValue1}
        label="Social Media Handle"
        onChange={(event) => setPrefixValue1(event.target.value)}
        prefix="@"
      />
      <TextInputInset
        id="prefixSuffix2"
        value={prefixValue2}
        label="Price Per Watt"
        onChange={(event) => setPrefixValue2(event.target.value)}
        prefix="$"
        suffix="/watt"
      />
      <TextInputInset
        id="prefixSuffix3"
        value={prefixValue3}
        label="Suffix Without Value"
        onChange={(event) => setPrefixValue3(event.target.value)}
        suffix={<Icon name="book" />}
      />
      <TextInputInset
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

export const Sizes = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  return (
    <Box gap="md">
      <TextInputInset
        id="mdTextInput"
        value={value1}
        label="Medium Input"
        size="md"
        onChange={(event) => setValue1(event.target.value)}
      />
      <TextInputInset
        id="lgTextInput"
        value={value2}
        label="Large Input"
        size="lg"
        onChange={(event) => setValue2(event.target.value)}
      />
    </Box>
  );
};
