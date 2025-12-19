import Calendar from './Calendar';

import type { Meta } from '@storybook/react-vite';
import React from 'react';
import { type DateRange } from 'react-day-picker';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const BasicUsage = () => {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 12, 12)
  );

  return (
    <Calendar
      mode="single"
      selected={date}
      defaultMonth={date}
      onSelect={setDate}
      disabled={{
        before: new Date(2025, 12, 12),
      }}
    />
  );
};

export const RangeSelection = () => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 21),
    to: new Date(2025, 6, 15),
  });

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={2}
    />
  );
};

export const MultipleSelection = () => {
  const [dates, setDates] = React.useState<Date[] | undefined>([
    new Date(2025, 5, 21),
    new Date(2025, 6, 15),
    new Date(2025, 6, 16),
  ]);

  return (
    <Calendar
      mode="multiple"
      selected={dates}
      onSelect={setDates}
      defaultMonth={dates ? dates[0] : undefined}
      numberOfMonths={2}
    />
  );
};

export const Dropdown = () => {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 16)
  );

  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      selected={date}
      defaultMonth={date}
      onSelect={setDate}
    />
  );
};

export const FooterContent = () => {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 16)
  );

  return (
    <Calendar
      mode="single"
      selected={date}
      defaultMonth={date}
      onSelect={setDate}
      footer={
        date
          ? `You picked ${date.toLocaleDateString()}.`
          : 'Please pick a date.'
      }
    />
  );
};
