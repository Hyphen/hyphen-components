import type { Meta } from '@storybook/react-vite';
import React, { ChangeEvent, useState } from 'react';
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
  const [value, setValue] = useState<string | null>(null);
  return (
    <Box>
      <TimePickerNative
        id="defaultTimePickerNative"
        name="defaultTimePickerNative"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }}
        label="Pick a Time"
        value={value}
      />
    </Box>
  );
};

export const WithASpecificInterval = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Box>
      <TimePickerNative
        id="intervalTimePickerNative"
        name="intervalTimePickerNative"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value)
        }
        value={value}
        label="Pick a Time"
        interval={3600}
      />
    </Box>
  );
};

export const WithMinAndMaxTimes = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Box>
      <TimePickerNative
        id="startEnd"
        name="startEnd"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value)
        }
        value={value}
        label="Pick a Time"
        startTime={{ hour: 9, minute: 0 }}
        endTime={{ hour: 15, minute: 31 }}
      />
    </Box>
  );
};

export const WithCustomDateDisplay = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Box>
      <TimePickerNative
        id="customDate"
        name="customDate"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value)
        }
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
  const [value, setValue] = useState<string | null>(null);
  return (
    <Box>
      <TimePickerNative
        id="helpText"
        name="helpText"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
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
  const [value, setValue] = useState<string | null>(null);
  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>(null);
  return (
    <Box gap="md">
      <TimePickerNative
        id="smTimePickerNative"
        name="smTimePickerNative"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }}
        label="Small"
        value={value}
        size="sm"
      />
      <TimePickerNative
        id="mdTimePickerNative"
        name="mdTimePickerNative"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue1(event.target.value);
        }}
        label="Medium"
        value={value1}
        size="md"
      />
      <TimePickerNative
        id="lgTimePickerNative"
        name="lgTimePickerNative"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue2(event.target.value);
        }}
        label="Large"
        value={value2}
        size="lg"
      />
    </Box>
  );
};
