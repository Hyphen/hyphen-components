import React, { ComponentProps, FC } from 'react';
import { DayPicker } from 'react-day-picker';

import { Button } from '../Button/Button';

import './Calendar.module.scss';

export type CalendarProps = ComponentProps<typeof DayPicker>;

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

export const Calendar: FC<CalendarProps> = ({ components, ...restProps }) => (
  <DayPicker
    components={{
      Nav,
      ...(components ?? {}),
    }}
    {...restProps}
  />
);

export default Calendar;
