import React, { ComponentProps, FC } from 'react';
import { DayPicker } from 'react-day-picker';

import { Button } from '../Button/Button';

import './DatePicker.module.scss';

export type DatePickerProps = ComponentProps<typeof DayPicker>;

const Nav = (props: any) => {
  const {
    className,
    style,
    onNextClick,
    onPreviousClick,
    nextMonth,
    previousMonth,
  } = props;

  return (
    <div className={className} style={style}>
      <Button
        aria-label="previous month"
        onClick={onPreviousClick}
        disabled={!previousMonth}
        variant="tertiary"
        iconPrefix="caret-left"
      />
      <Button
        aria-label="next month"
        onClick={onNextClick}
        disabled={!nextMonth}
        variant="tertiary"
        iconPrefix="caret-right"
      />
    </div>
  );
};

export const DatePicker: FC<DatePickerProps> = ({
  components,
  ...restProps
}) => (
  <DayPicker
    components={{
      Nav,
      ...(components ?? {}),
    }}
    {...restProps}
  />
);

export default DatePicker;
