import React, { ChangeEvent, useState } from 'react';
import type { Meta } from '@storybook/react';
import { CheckboxInput } from './CheckboxInput';
import { Box } from '../Box/Box';
import { FormLabel } from '../FormLabel/FormLabel';

const meta: Meta<typeof CheckboxInput> = {
  title: 'Components/CheckboxInput',
  component: CheckboxInput,
};

export default meta;

export const Basic = () => (
  <CheckboxInput
    id="example"
    label="Checkbox with a label"
    isChecked
    onChange={() => {}}
  />
);

export const Default = () =>
  (() => {
    const [value, setValue] = useState(false);
    return (
      <CheckboxInput
        id="defaultStateIsUnchecked"
        label="Label"
        onChange={(event) => setValue(event.target.checked)}
        isChecked={value}
      />
    );
  })();

export const States = () => (
  <Box gap="md">
    <CheckboxInput
      id="statesUnchecked"
      label="Unchecked"
      onChange={() => {}}
      isChecked={false}
    />
    <CheckboxInput
      id="statesCHecked"
      label="Checked"
      onChange={() => {}}
      isChecked={true}
    />
    <CheckboxInput
      id="statesUnchecked"
      label="Indeterminate"
      onChange={() => {}}
      isChecked={true}
      isIndeterminate={true}
    />
  </Box>
);

export const IndeterminateCheckboxes = () =>
  (() => {
    const [exampleOneChildOne, setExampleOneChildOne] = useState(false);
    const [exampleOneChildTwo, setExampleOneChildTwo] = useState(true);
    const handleParentChange = (event: ChangeEvent<HTMLInputElement>) => {
      setExampleOneChildOne(event.target.checked);
      setExampleOneChildTwo(event.target.checked);
    };
    return (
      <Box gap="md">
        <Box display="block" fontWeight="bold">
          Nested Checkboxes (select all)
        </Box>
        <Box gap="sm">
          <CheckboxInput
            id="statesUnchecked"
            label="Parent"
            onChange={handleParentChange}
            isChecked={exampleOneChildOne || exampleOneChildTwo}
            isIndeterminate={exampleOneChildOne !== exampleOneChildTwo}
          />
          <Box padding="0 0 0 sm" gap="sm">
            <CheckboxInput
              id="statesUnchecked"
              label="Child One"
              onChange={(event) => setExampleOneChildOne(event.target.checked)}
              isChecked={exampleOneChildOne}
            />
            <CheckboxInput
              id="statesUnchecked"
              label="Child Two"
              onChange={(event) => setExampleOneChildTwo(event.target.checked)}
              isChecked={exampleOneChildTwo}
            />
          </Box>
        </Box>
      </Box>
    );
  })();

export const Required = () =>
  (() => {
    const [value, setValue] = useState(false);
    return (
      <CheckboxInput
        id="requiredCheckboxIsUnchecked"
        label="Required Checkbox"
        isChecked={value}
        onChange={(event) => setValue(event.target.checked)}
        isRequired
      />
    );
  })();

export const CustomRequiredIndicator = () =>
  (() => {
    const [value, setValue] = useState(false);
    const [value2, setValue2] = useState(false);
    return (
      <Box gap="md">
        <CheckboxInput
          id="requiredCheckboxNull"
          label="Required Without Indicator"
          isChecked={value}
          onChange={(event) => setValue(event.target.checked)}
          isRequired
          requiredIndicator={null}
        />
        <CheckboxInput
          id="requiredCheckboxCustom"
          label="Required Custom Indicator"
          isChecked={value2}
          onChange={(event) => setValue2(event.target.checked)}
          isRequired
          requiredIndicator=" (required)"
        />
      </Box>
    );
  })();

export const Sizes = () =>
  (() => {
    const [sm, setSm] = useState(false);
    const [md, setMd] = useState(false);
    const [lg, setLg] = useState(false);
    const [responsive, setResponsive] = useState(false);
    return (
      <Box gap="md">
        <CheckboxInput
          id="smCheckboxInput"
          label="Small checkbox"
          helpText="More helpful text about this checkbox"
          isChecked={sm}
          onChange={(event) => setSm(event.target.checked)}
          size="sm"
        />
        <CheckboxInput
          id="mdCheckboxInput"
          label="Medium checkbox"
          helpText="More helpful text about this checkbox"
          isChecked={md}
          onChange={(event) => setMd(event.target.checked)}
          size="md"
        />
        <CheckboxInput
          id="lgCheckboxInput"
          label="Large checkbox"
          helpText="More helpful text about this checkbox"
          isChecked={lg}
          onChange={(event) => setLg(event.target.checked)}
          size="lg"
        />
        <CheckboxInput
          id="responsiveCheckboxInput"
          label="Responsive checkbox"
          helpText="Will change sizes depending on viewport width"
          isChecked={responsive}
          onChange={(event) => setResponsive(event.target.checked)}
          size={{ base: 'sm', tablet: 'md', desktop: 'lg', hd: 'sm' }}
        />
      </Box>
    );
  })();

export const HelpText = () =>
  (() => {
    const [value, setValue] = useState(false);
    return (
      <CheckboxInput
        id="helpTextCheckbox"
        label="Checkbox with help text"
        helpText="More helpful text about this checkbox"
        isChecked={value}
        onChange={(event) => setValue(event.target.checked)}
      />
    );
  })();

export const CheckedInitialState = () =>
  (() => {
    const [value, setValue] = useState(true);
    return (
      <CheckboxInput
        id="initialStateChecked"
        label="Label"
        onChange={(event) => setValue(event.target.checked)}
        isChecked={value}
      />
    );
  })();

export const HiddenLabel = () =>
  (() => {
    const [value, setValue] = useState(false);
    return (
      <CheckboxInput
        id="hiddenLabel"
        label="Label"
        hideLabel
        onChange={(event) => setValue(event.target.checked)}
        isChecked={value}
      />
    );
  })();

export const CustomLabel = () =>
  (() => {
    const [value, setValue] = useState(false);
    return (
      <Box direction="row" alignItems="center">
        <CheckboxInput
          id="customLabel"
          label="This label is custom"
          hideLabel
          onChange={(event) => setValue(event.target.checked)}
          isChecked={value}
        />
        <FormLabel inputId="customLabel">
          <Box display="block" fontSize="xl" color="secondary-500">
            This is custom, look at this{' '}
            <a
              href="https://palmetto.com"
              onClick={() => alert('hey you clicked me!')}
              target="_blank"
              rel="noreferrer"
            >
              Link
            </a>
          </Box>
        </FormLabel>
      </Box>
    );
  })();

export const DisabledAndUnchecked = () =>
  (() => {
    const [value, setValue] = useState(false);
    return (
      <CheckboxInput
        id="disabledAndUnchecked"
        label="Label"
        isChecked={value}
        onChange={(event) => setValue(event.target.checked)}
        isDisabled
      />
    );
  })();

export const DisabledAndChecked = () =>
  (() => {
    const [value, setValue] = useState(true);
    return (
      <CheckboxInput
        id="disabledAndUnchecked"
        label="Label"
        isChecked={value}
        onChange={(event) => setValue(event.target.checked)}
        isDisabled
      />
    );
  })();

export const Error = () =>
  (() => {
    const [value, setValue] = useState(false);
    return (
      <CheckboxInput
        id="invalidCheckbox"
        label="Label"
        isChecked={value}
        onChange={(event) => setValue(event.target.checked)}
        isRequired
        error="You must accept the Terms and Conditions"
      />
    );
  })();
