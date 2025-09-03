import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  describe('Default', () => {
    it('renders a datepicker with default props', () => {
      const { container } = render(<DatePicker />);
      const datePicker = container.querySelector('.rdp');
      expect(datePicker).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('Fires the expected callback when date is selected', () => {
      const defaultMonth = new Date('1995, 11, 14');
      const mockedOnSelect = jest.fn();
      render(
        <DatePicker
          mode="single"
          onSelect={mockedOnSelect}
          defaultMonth={defaultMonth}
        />
      );
      const fourteenth = screen.getByText('14');
      expect(fourteenth).toBeInTheDocument();
      fireEvent.click(fourteenth);
      expect(mockedOnSelect).toHaveBeenCalledTimes(1);
    });
  });
});
