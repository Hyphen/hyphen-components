import React, { useState } from 'react';
import type { Meta } from '@storybook/react-vite';
import { DateInput } from './DateInput';
import { Box } from '../Box/Box';

const meta: Meta<typeof DateInput> = {
  title: 'Components/DateInput',
  component: DateInput,
};

export default meta;

export const Basic = () => (
  <DateInput
    datePickerProps={{
      onSelect() {},
    }}
    textInputProps={{
      id: 'exampleDateInput',
      name: 'selectDate',
      label: 'Select a Date',
      placeholder: 'e.g. 11/02/2020',
    }}
  />
);

export const Default = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const handleClear = () => {
    setSelectedDate(null);
  };

  return (
    <DateInput
      datePickerProps={{
        selected: selectedDate,
        onSelect: setSelectedDate,
      }}
      textInputProps={{
        placeholder: 'e.g. 11/02/2020',
        onClear: handleClear,
        id: 'defaultDatePicker',
        name: 'selectDate',
        label: 'Select Date',
      }}
    />
  );
};

export const DateRange = () => {
  const [range, setRange] = useState<{ from?: Date; to?: Date } | undefined>();
  const handleClear = () => setRange(undefined);

  return (
    <DateInput
      datePickerProps={{ selected: range, onSelect: setRange, mode: 'range' }}
      textInputProps={{
        onClear: handleClear,
        id: 'myDateRangePicker',
        name: 'myDateRangePicker',
        label: 'Select Date Range',
      }}
    />
  );
};

export const WithMinAndMaxDates = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const handleClear = () => {
    setSelectedDate(null);
  };
  const min = new Date(2022, 6, 18);
  min.setDate(min.getDate() - 10);
  const max = new Date(2022, 6, 18);
  max.setDate(max.getDate() + 10);
  return (
    <DateInput
      datePickerProps={{
        selected: selectedDate,
        fromDate: min,
        toDate: max,
        onSelect: setSelectedDate,
      }}
      textInputProps={{
        placeholder: 'e.g. 11/02/2020',
        onClear: handleClear,
        id: 'defaultDatePicker',
        name: 'selectDate',
        label: 'Select Date',
      }}
    />
  );
};

export const CustomDateFormat = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date('2020, 11, 3')
  );
  const handleClear = () => {
    setSelectedDate(null);
  };
  return (
    <Box gap="md">
      <DateInput
        dateFormat={'MMMM dd, yyyy'}
        datePickerProps={{
          selected: selectedDate,
          onSelect: setSelectedDate,
        }}
        textInputProps={{
          onClear: handleClear,
          id: 'withCustomDateFormat',
          name: 'selectDate',
          label: 'Select Date',
        }}
      />
      <Box>
        <p>
          Selected Date (as ISO String):{' '}
          {selectedDate ? (selectedDate as Date).toISOString() : null}
        </p>
      </Box>
    </Box>
  );
};

export const InputBlurEvent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date('2020, 11, 3')
  );
  const handleTextInputBlur = () => {
    alert('TextInput Blur Event');
  };
  return (
    <DateInput
      dateFormat={'MMMM dd, yyyy'}
      datePickerProps={{
        selected: selectedDate,
        onSelect: setSelectedDate,
      }}
      textInputProps={{
        id: 'withCustomDateFormat',
        name: 'selectDate',
        label: 'Select Date',
        onBlur: handleTextInputBlur,
      }}
    />
  );
};
