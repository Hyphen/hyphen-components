import type { Meta } from '@storybook/react';
import React, {ChangeEvent, useState} from 'react';
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
    <Box height="360px">
      <TimePicker
        id="defaultTimePicker"
        name="defaultTimePicker"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }}
        label="Pick a Time"
        value={value}
      />
    </Box>
  );
};

export const WithASpecificInterval = () => (
  <Box height="360px">
    <TimePicker
      id="intervalTimePicker"
      name="intervalTimePicker"
      onChange={() => {}}
      label="Pick a Time"
      interval={3600}
    />
  </Box>
);

export const WithMinAndMaxTimes = () => (
  <Box height="360px">
    <TimePicker
      id="startEnd"
      name="startEnd"
      onChange={() => {}}
      label="Pick a Time"
      startTime={{ hour: 9, minute: 0 }}
      endTime={{ hour: 15, minute: 31 }}
    />
  </Box>
);

export const WithCustomDateDisplay = () => (
  <Box height="360px">
    <TimePicker
      id="customDate"
      name="customDate"
      onChange={() => {}}
      label="Pick a Time"
      startTime={{ hour: 9, minute: 0 }}
      endTime={{ hour: 15, minute: 31 }}
      dateDisplayOptions={{ hour12: false, hour: '2-digit', minute: '2-digit' }}
    />
  </Box>
);

export const WithOpenMenu = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Box height="260px">
      <TimePicker
        id="openMenu"
        name="openMenu"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }}
        label="Pick a Time"
        value={value}
        menuIsOpen
        interval={3600}
        startTime={{ hour: 9, minute: 0 }}
        endTime={{ hour: 13, minute: 1 }}
      />
    </Box>
  );
};

export const HelpText = () => {
  const [value, setValue] = useState<string>('');
  return (
    <Box height="360px">
      <TimePicker
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
  const [value, setValue] = useState<string>();
  const [value1, setValue1] = useState<string>();
  const [value2, setValue2] = useState<string>();
  return (
    <Box gap="md" height="360px">
      <TimePicker
        id="smTimePicker"
        name="smTimePicker"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }}
        label="Small"
        value={value}
        size="sm"
      />
      <TimePicker
        id="mdTimePicker"
        name="mdTimePicker"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue1(event.target.value);
        }}
        label="Medium"
        value={value1}
        size="md"
      />
      <TimePicker
        id="lgTimePicker"
        name="lgTimePicker"
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
