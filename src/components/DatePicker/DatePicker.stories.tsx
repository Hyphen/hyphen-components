import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import type { Meta } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import type { DateRange } from 'react-day-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
};

export default meta;

export const BasicExample = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2019, 11, 3)
  );
  return (
    <Box gap="md">
      <DatePicker
        mode="single"
        onSelect={setSelectedDate}
        selected={selectedDate}
      />
      <p>Selected Date: {selectedDate?.toISOString()}</p>
    </Box>
  );
};

export const DateRange = () => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2019, 11, 3),
    to: new Date(2019, 11, 28),
  });
  return (
    <Box gap="md">
      <DatePicker mode="range" selected={range} onSelect={setRange} />
      <p>
        {`Selected Date Range: ${range?.from?.toISOString()} - ${
          range?.to?.toISOString()
        }`}
      </p>
    </Box>
  );
};

export const MinAndMaxDates = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(2019, 11, 18)
  );
  const min = new Date(2019, 11, 18);
  min.setDate(min.getDate() - 5);
  const max = new Date(2019, 11, 18);
  max.setDate(max.getDate() + 5);
  return (
    <Box gap="md">
      <DatePicker
        mode="single"
        selected={startDate}
        onSelect={setStartDate}
        fromDate={min}
        toDate={max}
      />
      <p>Selected Date: {startDate?.toISOString()}</p>
    </Box>
  );
};

// MonthPicker story removed; DayPicker's dropdown caption provides similar functionality.

export const ShowMultipleMonths = () => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2019, 11, 3),
    to: new Date(2019, 12, 20),
  });
  return (
    <Box gap="md">
      <DatePicker
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
      />
      <p>Start Date: {range?.from && range.from.toISOString()}</p>
      <p>End Date: {range?.to && range.to.toISOString()}</p>
    </Box>
  );
};

export const OpenByDefaultOnASpecificDate = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date('1993/09/28')
  );
  return (
    <Box gap="md">
      <DatePicker
        mode="single"
        onSelect={setStartDate}
        selected={startDate}
        defaultMonth={new Date('1993/09/28')}
      />
      <p>Selected Date: {startDate && startDate.toISOString()}</p>
    </Box>
  );
};

export const WithChildren = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2019, 11, 3)
  );
  return (
    <Box gap="md">
      <DatePicker
        mode="single"
        onSelect={setSelectedDate}
        selected={selectedDate}
      >
        <Box display="block" style={{ textAlign: 'center' }} color="base">
          It will be sunny out today!
        </Box>
      </DatePicker>
      <p>Selected Date: {selectedDate?.toISOString()}</p>
    </Box>
  );
};
