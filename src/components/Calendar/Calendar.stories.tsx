import Calendar from './Calendar';

import type { Meta } from '@storybook/react-vite';
import React, { useState, ChangeEvent } from 'react';
import { type DateRange } from 'react-day-picker';
import { TextInput } from '../TextInput/TextInput';
import { format, isValid, parse } from 'date-fns';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const BasicUsage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 12, 12));

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
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
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
  const [dates, setDates] = useState<Date[] | undefined>([
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
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 16));

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
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 16));

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

export const DateInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2017, 4, 21)
  );
  const [inputValue, setInputValue] = useState('05/21/2017');

  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(new Date(2017, 4, 21));

  // Update input when calendar changes
  const handleCalendarSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue('');
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setMonth(date);
      setInputValue(format(date, 'MM/dd/yyyy'));
    }
  };

  // Update calendar when input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Keep the input value in sync

    const parsedDate = parse(e.target.value, 'MM/dd/yyyy', new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  return (
    <div>
      <TextInput
        id="date-input"
        label="Date"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div style={{ marginTop: 16 }}>
        <Calendar
          month={month}
          onMonthChange={setMonth}
          mode="single"
          selected={selectedDate}
          onSelect={handleCalendarSelect}
        />
      </div>
    </div>
  );
};

export const DateRangeInput = () => {
  const [range, setRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [inputValue, setInputValue] = useState('');

  // Format range as string using date-fns
  const formatRange = (from?: Date, to?: Date) => {
    if (!from && !to) return '';
    const fromStr = from && isValid(from) ? format(from, 'MM/dd/yyyy') : '';
    const toStr = to && isValid(to) ? format(to, 'MM/dd/yyyy') : '';
    return fromStr && toStr ? `${fromStr} - ${toStr}` : fromStr || toStr;
  };

  // Parse string to range using date-fns
  const parseRange = (value: string): DateRange => {
    const [fromStr, toStr] = value.split('-').map((s) => s.trim());
    const from = fromStr ? parse(fromStr, 'MM/dd/yyyy', new Date()) : undefined;
    const to = toStr ? parse(toStr, 'MM/dd/yyyy', new Date()) : undefined;
    return {
      from: from && isValid(from) ? from : undefined,
      to: to && isValid(to) ? to : undefined,
    };
  };

  // Update input when calendar changes
  const handleCalendarSelect = (selected: DateRange | undefined) => {
    setRange(selected ?? { from: undefined, to: undefined });
    setInputValue(formatRange(selected?.from, selected?.to));
  };

  // Update calendar when input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setRange(parseRange(value));
  };

  return (
    <div style={{ maxWidth: 320 }}>
      <TextInput
        id="date-range-input"
        label="Date Range"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="MM/DD/YYYY - MM/DD/YYYY"
      />
      <div style={{ marginTop: 16 }}>
        <Calendar
          mode="range"
          selected={range}
          onSelect={handleCalendarSelect}
        />
      </div>
    </div>
  );
};
