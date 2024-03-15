import type { Meta } from '@storybook/react';
import React, { useState } from 'react';
import { TimePickerNative } from './TimePickerNative';
import { Box } from '../Box/Box';

const meta: Meta<typeof TimePickerNative> = {
  title: 'Components/TimePickerNative',
  component: TimePickerNative,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const Default = () => {
  const [value, setValue] = useState(null);
  return (
    <Box>
      <TimePickerNative
        id="defaultTimePickerNative"
        name="defaultTimePickerNative"
        onChange={(event) => {
          console.log(event.target.value);
          setValue(event.target.value);
        }}
        label="Pick a Time"
        value={value}
      />
    </Box>
  );
};

export const WithASpecificInterval = () => {
  const [value, setValue] = useState(null);
  return (
    <Box>
      <TimePickerNative
        id="intervalTimePickerNative"
        name="intervalTimePickerNative"
        onChange={(event) => setValue(event.target.value)}
        value={value}
        label="Pick a Time"
        interval={3600}
      />
    </Box>
  );
};

export const WithMinAndMaxTimes = () => {
  const [value, setValue] = useState(null);
  return (
    <Box>
      <TimePickerNative
        id="startEnd"
        name="startEnd"
        onChange={(event) => setValue(event.target.value)}
        value={value}
        label="Pick a Time"
        startTime={{ hour: 9, minute: 0 }}
        endTime={{ hour: 15, minute: 31 }}
      />
    </Box>
  );
};

export const WithCustomDateDisplay = () => {
  const [value, setValue] = useState(null);
  return (
    <Box>
      <TimePickerNative
        id="customDate"
        name="customDate"
        onChange={(event) => setValue(event.target.value)}
        value={value}
        label="Pick a Time"
        startTime={{ hour: 9, minute: 0 }}
        endTime={{ hour: 15, minute: 31 }}
        dateDisplayOptions={{
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        }}
      />
    </Box>
  );
};

export const HelpText = () => {
  const [value, setValue] = useState(null);
  return (
    <Box>
      <TimePickerNative
        id="helpText"
        name="helpText"
        onChange={(event) => {
          setValue(event.target.value);
        }}
        label="Pick a Time"
        value={value}
        helpText="pick a time, any time..."
      />
    </Box>
  );
};

export const Sizes = () => {
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  return (
    <Box gap="md">
      <TimePickerNative
        id="smTimePickerNative"
        name="smTimePickerNative"
        onChange={(event) => {
          setValue(event.target.value);
        }}
        label="Small"
        value={value}
        size="sm"
      />
      <TimePickerNative
        id="mdTimePickerNative"
        name="mdTimePickerNative"
        onChange={(event) => {
          setValue1(event.target.value);
        }}
        label="Medium"
        value={value1}
        size="md"
      />
      <TimePickerNative
        id="lgTimePickerNative"
        name="lgTimePickerNative"
        onChange={(event) => {
          setValue2(event.target.value);
        }}
        label="Large"
        value={value2}
        size="lg"
      />
    </Box>
  );
};
