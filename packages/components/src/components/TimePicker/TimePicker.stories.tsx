import type { Meta } from '@storybook/react-vite';
import React, { ChangeEvent, useState } from 'react';
import { TimePicker } from './TimePicker';
import { Box } from '../Box/Box';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const Default = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Box>
      <TimePicker
        id="defaultTimePicker"
        name="defaultTimePicker"
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
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
      <TimePicker
        id="intervalTimePicker"
        name="intervalTimePicker"
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
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
      <TimePicker
        id="startEnd"
        name="startEnd"
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
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
      <TimePicker
        id="customDate"
        name="customDate"
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
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
      <TimePicker
        id="helpText"
        name="helpText"
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
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
      <TimePicker
        id="smTimePicker"
        name="smTimePicker"
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          setValue(event.target.value);
        }}
        label="Small"
        value={value}
        size="sm"
      />
      <TimePicker
        id="mdTimePicker"
        name="mdTimePicker"
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          setValue1(event.target.value);
        }}
        label="Medium"
        value={value1}
        size="md"
      />
      <TimePicker
        id="lgTimePicker"
        name="lgTimePicker"
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          setValue2(event.target.value);
        }}
        label="Large"
        value={value2}
        size="lg"
      />
    </Box>
  );
};
