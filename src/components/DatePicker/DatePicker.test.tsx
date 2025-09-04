import React from 'react';
import { render } from '@testing-library/react';

jest.mock(
  'react-day-picker',
  () => ({
    DayPicker: jest.fn(() => null),
  }),
  { virtual: true }
);

// eslint-disable-next-line import/first
import { DatePicker } from './DatePicker';
// eslint-disable-next-line import/first
import { DayPicker as MockDayPicker } from 'react-day-picker';

describe('DatePicker', () => {
  it('renders DayPicker', () => {
    render(<DatePicker />);
    expect(MockDayPicker).toHaveBeenCalledTimes(1);
  });

  it('uses Button for navigation', () => {
    render(<DatePicker />);
    const props = (MockDayPicker as jest.Mock).mock.calls[0][0];
    const { getByLabelText } = render(
      props.components.Nav({
        className: '',
        style: {},
        nextMonth: new Date(),
        previousMonth: new Date(),
        onNextClick: jest.fn(),
        onPreviousClick: jest.fn(),
      })
    );
    expect(getByLabelText('previous month')).toHaveClass(
      'hyphen-components__variables__form-control'
    );
    expect(getByLabelText('next month')).toHaveClass(
      'hyphen-components__variables__form-control'
    );
  });
});
