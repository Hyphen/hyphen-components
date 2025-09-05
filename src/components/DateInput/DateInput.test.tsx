import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock(
  'react-day-picker',
  () => ({
    DayPicker: jest.fn(() => null),
  }),
  { virtual: true }
);

// eslint-disable-next-line import/first
import { DateInput } from './DateInput';

describe('DateInput', () => {
  describe('Default', () => {
    it('renders a DateInput component with defaults', () => {
      render(
        <DateInput
          textInputProps={{
            id: 'myInput',
            label: 'Select Date',
          }}
          datePickerProps={{
            onSelect: () => null,
          }}
        />
      );

      const input = screen.getByLabelText('Select Date');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Popover', () => {
    it('keeps popover open after only start date is picked in a range', async () => {
      const date = new Date(2020, 0, 1);
      render(
        <DateInput
          textInputProps={{
            id: 'myInput',
            label: 'Select Date',
          }}
          datePickerProps={{
            onSelect: () => null,
            defaultMonth: date,
            mode: 'range',
            selected: { from: date },
          }}
        />
      );
      const input = screen.getByLabelText('Select Date');
      fireEvent.click(input);
      const popoverContainer =
        document.getElementsByClassName('PopoverContent');
      await waitFor(() => expect(popoverContainer[0]).toBeInTheDocument());
      // Simulate picking start date (should not close popover)
      // (Assume date button is present)
      // Popover should still be open
      expect(document.getElementsByClassName('PopoverContent').length).toBe(1);
    });

    it('opens the Popover when the input is clicked', async () => {
      render(
        <DateInput
          textInputProps={{
            id: 'myInput',
            label: 'Select Date',
          }}
          datePickerProps={{
            onSelect: () => null,
          }}
        />
      );

      const input = screen.getByLabelText('Select Date');
      fireEvent.click(input);

      const popoverContainer =
        document.getElementsByClassName('PopoverContent');
      await waitFor(() =>
        expect(popoverContainer[0]).toHaveAttribute('data-side', 'bottom')
      );
      await waitFor(() =>
        expect(popoverContainer[0]).toHaveAttribute('data-align', 'start')
      );
    });
  });

  describe('Date Formatting', () => {
    it('formats the date when a format is passed', async () => {
      const date = new Date(1995, 11, 14);
      render(
        <DateInput
          dateFormat="yyyy/MM/dd"
          textInputProps={{
            id: 'myInput',
            label: 'Select Date',
          }}
          datePickerProps={{
            onSelect: () => null,
            defaultMonth: date,
            selected: date,
          }}
        />
      );

      const input = screen.getByLabelText('Select Date');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('value', '1995/12/14');
    });

    it('formats both dates when range is being selected', async () => {
      const dateOne = new Date(1995, 11, 14);
      const dateTwo = new Date(1995, 11, 16);
      render(
        <DateInput
          dateFormat="yyyy/MM/dd"
          textInputProps={{
            id: 'myInput',
            label: 'Select Date',
          }}
          datePickerProps={{
            onSelect: () => null,
            defaultMonth: dateOne,
            selected: { from: dateOne, to: dateTwo },
            mode: 'range',
          }}
        />
      );

      const input = screen.getByLabelText('Select Date');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('value', '1995/12/14 - 1995/12/16');
    });

    it('formats one date if selecting range', async () => {
      const dateTwo = new Date(1995, 11, 16);
      const { rerender } = render(
        <DateInput
          dateFormat="yyyy/MM/dd"
          textInputProps={{
            id: 'myInput',
            label: 'Select Date',
          }}
          datePickerProps={{
            onSelect: () => null,
            defaultMonth: dateTwo,
            selected: { to: dateTwo },
            mode: 'range',
          }}
        />
      );

      const input = screen.getByLabelText('Select Date');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('value', ' - 1995/12/16');

      rerender(
        <DateInput
          dateFormat="yyyy/MM/dd"
          textInputProps={{
            id: 'myInput',
            label: 'Select Date',
          }}
          datePickerProps={{
            onSelect: () => null,
            defaultMonth: dateTwo,
            selected: { from: dateTwo },
            mode: 'range',
          }}
        />
      );

      const inputTwo = screen.getByLabelText('Select Date');
      expect(inputTwo).toBeInTheDocument();
      expect(inputTwo).toHaveAttribute('value', '1995/12/16 - ');
    });
  });
});
