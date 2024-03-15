import React, { useState } from 'react';
import { DateInput } from './DateInput';
import type { Meta } from '@storybook/react';
import { Box } from '../Box/Box';

const meta: Meta<typeof DateInput> = {
  title: 'Components/DateInput',
  component: DateInput,
};

export default meta;

export const Basic = () => (
  <DateInput
    datePickerProps={{
      onChange() {},
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
  const [selectedDate, setSelectedDate] = useState(null);
  const handleClear = () => {
    setSelectedDate(null);
  };

  return (
    <DateInput
      datePickerProps={{
        selected: selectedDate,
        onChange: setSelectedDate,
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const setDate = ([startDate, endDate]) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
  };
  return (
    <DateInput
      datePickerProps={{
        onChange: setDate,
        selected: startDate,
        selectsRange: true,
        startDate,
        endDate,
      }}
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
  const [selectedDate, setSelectedDate] = useState(null);
  const handleClear = () => {
    setSelectedDate(null);
  };
  const min = new Date(2022, 6, 18);
  min.setDate(min.getDate() - 10);
  const max = new Date(2022, 6, 18);
  max.setDate(max.getDate() + 100);
  return (
    <DateInput
      datePickerProps={{
        selected: selectedDate,
        maxDate: max,
        minDate: min,
        onChange: setSelectedDate,
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
  const [selectedDate, setSelectedDate] = useState(new Date('2020, 11, 3'));
  const handleClear = () => {
    setSelectedDate(null);
  };
  return (
    <Box gap="md">
      <DateInput
        dateFormat={'MMMM dd, yyyy'}
        datePickerProps={{
          selected: selectedDate,
          onChange: setSelectedDate,
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
          {selectedDate ? selectedDate.toISOString() : null}
        </p>
      </Box>
    </Box>
  );
};

export const InputBlurEvent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2020, 11, 3'));
  const handleTextInputBlur = () => {
    alert('TextInput Blur Event');
  };
  return (
    <Box gap="md">
      <DateInput
        dateFormat={'MMMM dd, yyyy'}
        datePickerProps={{
          selected: selectedDate,
          onChange: setSelectedDate,
        }}
        textInputProps={{
          id: 'withCustomDateFormat',
          name: 'selectDate',
          label: 'Select Date',
          onBlur: handleTextInputBlur,
        }}
      />
    </Box>
  );
};
