import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import type { Meta } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { Heading } from '../Heading/Heading';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
};

export default meta;

export const BasicExample = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2019, 11, 3));
  return (
    <Box gap="md">
      <DatePicker
        onChange={(date) => setSelectedDate(date as Date)}
        selected={selectedDate}
      />
      <p>Selected Date: {selectedDate.toISOString()}</p>
    </Box>
  );
};

export const DateRange = () => {
  const [startDate, setStartDate] = useState<Date>(new Date(2019, 11, 3));
  const [endDate, setEndDate] = useState<Date>(new Date(2019, 11, 28));
  const setDate = ([startDate, endDate]: [Date, Date]) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  return (
    <Box gap="md">
      <DatePicker
        onChange={(date) => setDate(date as [Date, Date])}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        selectsRange
      />
      <p>
        {`Selected Date Range: ${startDate && startDate.toISOString()} - ${
          endDate && endDate.toISOString()
        }`}
      </p>
    </Box>
  );
};

export const MinAndMaxDates = () => {
  const [startDate, setStartDate] = useState<Date>(new Date(2019, 11, 18));
  const min = new Date(2019, 11, 18);
  min.setDate(min.getDate() - 5);
  const max = new Date(2019, 11, 18);
  max.setDate(max.getDate() + 5);
  return (
    <Box gap="md">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date as Date)}
        minDate={min}
        maxDate={max}
      />
      <p>Selected Date: {startDate.toISOString()}</p>
    </Box>
  );
};

export const MonthPicker = () => {
  const [startDateOne, setStartDateOne] = useState<Date>(new Date(2019, 10));
  const [startDateTwo, setStartDateTwo] = useState<Date>(new Date(2019, 10));
  const [startDateThree, setStartDateThree] = useState<Date>(
    new Date(2019, 10)
  );
  return (
    <Box display="flex" direction="row" gap="md">
      <Box
        gap="md"
        display="flex"
        direction="column"
        alignItems="center"
        width="33"
      >
        <Heading size="md">Default</Heading>
        <DatePicker
          selected={startDateOne}
          onChange={(date) => setStartDateOne(date as Date)}
          showMonthYearPicker
        />
        <p>{startDateOne.toISOString()}</p>
      </Box>
      <Box
        gap="md"
        display="flex"
        direction="column"
        alignItems="center"
        width="33"
      >
        <Heading size="md">With full month name</Heading>
        <DatePicker
          selected={startDateTwo}
          onChange={(date) => setStartDateTwo(date as Date)}
          showMonthYearPicker
          showFullMonthYearPicker
        />
        <p>{startDateTwo.toISOString()}</p>
      </Box>
      <Box
        gap="md"
        display="flex"
        direction="column"
        alignItems="center"
        width="33"
      >
        <Heading size="md">With Two-column layout</Heading>
        <DatePicker
          selected={startDateThree}
          onChange={(date) => setStartDateThree(date as Date)}
          showMonthYearPicker
          showFullMonthYearPicker
          showTwoColumnMonthYearPicker
        />
        <p>{startDateThree.toISOString()}</p>
      </Box>
    </Box>
  );
};

export const ShowMultipleMonths = () => {
  const [startDate, setStartDate] = useState<Date>(new Date(2019, 11, 3));
  const [endDate, setEndDate] = useState<Date>(new Date(2019, 12, 20));
  const setDate = ([startDate, endDate]: [Date, Date]) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  return (
    <Box gap="md">
      <DatePicker
        onChange={(date) => setDate(date as [Date, Date])}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        monthsShown={2}
      />
      <p>Start Date: {startDate && startDate.toISOString()}</p>
      <p>End Date: {endDate && endDate.toISOString()}</p>
    </Box>
  );
};

export const WithTimePicker = () => {
  const [startDate, setStartDate] = useState<Date>(new Date('1993/09/28'));
  return (
    <Box gap="md">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date as Date)}
        showTimeSelect
        timeIntervals={15}
        timeCaption="Time"
      />
      <p>Selected Date: {startDate && startDate.toISOString()}</p>
    </Box>
  );
};

export const OpenByDefaultOnASpecificDate = () => {
  const [startDate, setStartDate] = useState<Date>(new Date('1993/09/28'));
  return (
    <Box gap="md">
      <DatePicker
        onChange={(date) => setStartDate(date as Date)}
        selected={startDate}
        openToDate={new Date('1993/09/28')}
      />
      <p>Selected Date: {startDate && startDate.toISOString()}</p>
    </Box>
  );
};

export const WithChildren = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2019, 11, 3));
  return (
    <Box gap="md">
      <DatePicker
        onChange={(date) => setSelectedDate(date as Date)}
        selected={selectedDate}
      >
        <Box display="block" style={{ textAlign: 'center' }} color="base">
          It will be sunny out today!
        </Box>
      </DatePicker>
      <p>Selected Date: {selectedDate.toISOString()}</p>
    </Box>
  );
};
