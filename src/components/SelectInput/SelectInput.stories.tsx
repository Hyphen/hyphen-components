import React, { useState } from 'react';
import { SelectInput } from './SelectInput';
import type { Meta } from '@storybook/react';
import { Box } from '../Box/Box';

const meta: Meta<typeof SelectInput> = {
  title: 'Components/SelectInput',
  component: SelectInput,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const Default = () => {
  const [value, setValue] = useState(null);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <div style={{ height: '200px' }}>
      <SelectInput
        id="singleSelectWithLabel"
        label="Label"
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        value={value}
      />
    </div>
  );
};

export const PreSelected = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [value, setValue] = useState(options[1]);
  return (
    <div style={{ height: '200px' }}>
      <SelectInput
        id="preSelected"
        label="Label"
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        value={value}
      />
    </div>
  );
};

export const HelpText = () => {
  const [value, setValue] = useState(null);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <div style={{ height: '200px' }}>
      <SelectInput
        id="helpText"
        label="Flavor"
        helpText="Choose your favorite flavor"
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        value={value}
        placeholder="Custom placeholder..."
      />
    </div>
  );
};

export const Placeholder = () => {
  const [value, setValue] = useState(null);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <div style={{ height: '200px' }}>
      <SelectInput
        id="customPlaceholder"
        label="Label"
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        value={value}
        placeholder="Custom placeholder..."
      />
    </div>
  );
};

export const HiddenLabel = () => {
  const [value, setValue] = useState(null);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <div style={{ height: '175px' }}>
      <SelectInput
        id="labelHidden"
        label="My label is hidden"
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        value={value}
        hideLabel
      />
    </div>
  );
};

export const CreatableSelect = () => {
  const [value, setValue] = useState(null);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
  ];
  return (
    <div style={{ height: '200px' }}>
      <SelectInput
        id="creatableSelect"
        label="Label"
        value={value}
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        isCreatable
      />
    </div>
  );
}

export const MultiSelect = () => {
  const [value, setValue] = useState(null);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <div style={{ height: '200px' }}>
      <SelectInput
        id="multiSelect"
        label="Label"
        value={value}
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        isMulti
      />
    </div>
  );
};

export const MultiSelectAndPreSelected = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [value, setValue] = useState([options[0], options[2]]);
  return (
    <div style={{ height: '200px' }}>
      <SelectInput
        id="preSelectMultiSelect"
        label="Label"
        value={value}
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        isMulti
      />
    </div>
  );
};

export const MultiSelectCreatable = () => {
  const [value, setValue] = useState(null);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
  ];

  console.log(value);
  return (
    <div style={{ height: '200px' }}>
      <SelectInput
        id="creatableMultiSelect"
        label="Label"
        value={value}
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        isMulti
        isCreatable
      />
    </div>
  );
}

export const Autofocus = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [value, setValue] = useState(null);
  return (
    <div style={{ height: '200px' }}>
      <SelectInput
        id="autoFocus"
        label="Label"
        value={value}
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        autoFocus
      />
    </div>
  );
};

export const Required = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [value, setValue] = useState(null);
  return (
    <div style={{ height: '200px' }}>
      <SelectInput
        id="required"
        label="Label"
        value={value}
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        isRequired
      />
    </div>
  );
};

export const Disabled = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [value, setValue] = useState(null);
  return (
    <div style={{ height: '85px' }}>
      <SelectInput
        id="disabled"
        label="Label"
        value={value}
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        isDisabled
      />
    </div>
  );
};

export const Clearable = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [value, setValue] = useState(options[0]);
  return (
    <div style={{ height: '200px' }}>
      <SelectInput
        id="clearable"
        label="Label"
        value={value}
        name="myClearableSelect"
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        isClearable
      />
    </div>
  );
};

export const Error = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [value, setValue] = useState(null);
  return (
    <div style={{ height: '200px' }}>
      <SelectInput
        id="error"
        label="Label"
        value={value}
        // @ts-ignore - TS is not recognizing the value as a valid option
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
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <Box gap="md" height="360px">
      <SelectInput
        id="smallSelect"
        label="Small"
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        value={value}
        size="sm"
      />
      <SelectInput
        id="mediumSelect"
        label="Medium"
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue1(event.target.value)}
        options={options}
        value={value1}
        size="md"
      />
      <SelectInput
        id="largeSelect"
        label="Large"
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue2(event.target.value)}
        options={options}
        value={value2}
        size="lg"
      />
      <SelectInput
        id="responsiveSelect"
        label="Responsive"
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue3(event.target.value)}
        options={options}
        value={value3}
        size={{ base: 'sm', tablet: 'md', desktop: 'lg', hd: 'sm' }}
      />
    </Box>
  );
};

export const WithPortal = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [value, setValue] = useState(null);
  return (
    <SelectInput
      id="portal"
      label="Flavors"
      value={value}
      // @ts-ignore - TS is not recognizing the value as a valid option
      onChange={(event) => setValue(event.target.value)}
      options={options}
      menuPortalTarget={document.body}
    />
  );
};

export const CustomClasses = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [value, setValue] = useState(null);
  return (
    <div style={{ height: '200px' }}>
      <SelectInput
        id="customClasses"
        label="Label"
        value={value}
        // @ts-ignore - TS is not recognizing the value as a valid option
        onChange={(event) => setValue(event.target.value)}
        options={options}
        className="background-color-primary"
      />
    </div>
  );
};
