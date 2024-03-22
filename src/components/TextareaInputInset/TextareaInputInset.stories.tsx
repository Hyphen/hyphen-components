import type { Meta } from '@storybook/react';
import React, { useState } from 'react';
import { TextareaInputInset } from './TextareaInputInset';
import { Box } from '../Box/Box';

const meta: Meta<typeof TextareaInputInset> = {
  title: 'Components/TextareaInputInset',
  component: TextareaInputInset,
};

export default meta;

export const Default = () => {
  const [value, setValue] = useState('');
  return (
    <Box gap="md">
      <TextareaInputInset
        id="textareaInputDefault"
        value={value}
        label="Multi-line Text Input"
        placeholder="Enter your message"
        onChange={(event) => setValue(event.target.value)}
      />
    </Box>
  );
};

export const Required = () => {
  const [value, setValue] = useState('');
  return (
    <Box gap="md">
      <TextareaInputInset
        id="requiredInput"
        value={value}
        label="Required Input"
        placeholder="Enter your email address"
        onChange={(event) => setValue(event.target.value)}
        isRequired
      />
      <TextareaInputInset
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
    <TextareaInputInset
      id="helpTextStory"
      value={value}
      label="Design Request Note"
      onChange={(event) => setValue(event.target.value)}
      helpText="Describe what design changes you would like to make"
    />
  );
};

export const ValidationError = () => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState(
    'We are on a mission to stop climate change before we reach an irreversible tipping point. This requires urgency and change on a massive scale but technological advancements have put it within reach.'
  );
  return (
    <Box gap="md">
      <TextareaInputInset
        id="error1"
        value={value}
        label="Note"
        error="Note is required"
        onChange={(event) => setValue(event.target.value)}
        isRequired
      />
      <TextareaInputInset
        id="error2"
        value={value2}
        label="Note"
        error="Note is required"
        helpText="Add context to your note"
        onChange={(event) => setValue2(event.target.value)}
        isRequired
      />
    </Box>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState(
    'We are on a mission to stop climate change before we reach an irreversible tipping point. This requires urgency and change on a massive scale but technological advancements have put it within reach.'
  );
  return (
    <Box gap="md">
      <TextareaInputInset
        id="disabled"
        value={value}
        label="Disabled"
        onChange={(event) => setValue(event.target.value)}
        isDisabled
      />
      <TextareaInputInset
        id="disabledValue"
        value={value2}
        label="Disabled with Value"
        onChange={(event) => setValue2(event.target.value)}
        isDisabled
      />
    </Box>
  );
};

export const Sizes = () => {
  const [value, setValue] = useState('');
  return (
    <Box gap="md">
      <TextareaInputInset
        id="mdTextInput"
        value={value}
        label="Medium Input"
        size="md"
        onChange={(event) => setValue(event.target.value)}
      />
      <TextareaInputInset
        id="lgTextInput"
        value={value}
        label="Large Input"
        size="lg"
        onChange={(event) => setValue(event.target.value)}
      />
    </Box>
  );
};

export const Resize = () => {
  const [value, setValue] = useState('');
  return (
    <Box gap="md">
      <TextareaInputInset
        id="resizeBoth"
        value={value}
        label="Resize Me Vertically and Horizontally"
        onChange={(event) => setValue(event.target.value)}
        resize="both"
      />
      <TextareaInputInset
        id="resizeNone"
        value={value}
        label="Can't resize me"
        onChange={(event) => setValue(event.target.value)}
        resize="none"
      />
    </Box>
  );
};
