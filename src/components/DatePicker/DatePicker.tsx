import React, { FC, ReactNode, SyntheticEvent } from 'react';
import classNames from 'classnames';
import { DayPicker, DateRange } from 'react-day-picker';
import './DatePicker.module.scss';

export interface DatePickerProps {
  /**
   * React children (rendered below the calendar).
   */
  children?: ReactNode;
  /**
   * Custom classname to be applied to the DatePicker container.
   */
  className?: string;
  /**
   * Callback that fires when a date is changed/selected.
   */
  onChange: (date: Date | [Date, Date] | null, event?: SyntheticEvent) => void;
  /**
   * Custom format for weekday labels.
   */
  formatWeekDay?: (formattedDate: string) => string;
  /**
   * Last allowable/shown date.
   */
  maxDate?: Date | null;
  /**
   * First allowable/shown date.
   */
  minDate?: Date | null;
  /**
   * Months to be shown at one time.
   */
  monthsShown?: number;
  /**
   * Date that the calendar will open to by default.
   */
  openToDate?: Date;
  /**
   * Currently selected date (for single mode).
   */
  selected?: Date | null;
  /**
   * Start date in a range.
   */
  startDate?: Date | null;
  /**
   * End date in a range.
   */
  endDate?: Date | null;
  /**
   * Whether the picker should select a range of dates.
   */
  selectsRange?: boolean;
  /**
   * Additional props to be spread to rendered element.
   */
  [x: string]: unknown;
}

export const DatePicker: FC<DatePickerProps> = ({
  children = null,
  className = undefined,
  formatWeekDay = (formattedDate) => formattedDate[0],
  maxDate = undefined,
  minDate = undefined,
  monthsShown = undefined,
  openToDate = undefined,
  selected = undefined,
  startDate = undefined,
  endDate = undefined,
  selectsRange = false,
  onChange,
  ...restProps
}) => {
  const weekdayFormatter = (date: Date, locale?: string) =>
    formatWeekDay(date.toLocaleDateString(locale, { weekday: 'long' }));

  const pickerClass = classNames(className);

  const commonProps = {
    numberOfMonths: monthsShown,
    defaultMonth: openToDate,
    fromDate: minDate ?? undefined,
    toDate: maxDate ?? undefined,
    formatters: { formatWeekdayName: weekdayFormatter },
    ...restProps,
  } as const;

  if (selectsRange) {
    const rangeSelected: DateRange | undefined = {
      from: startDate ?? undefined,
      to: endDate ?? undefined,
    };

    const handleSelectRange = (
      range: DateRange | undefined,
      _selectedDay: Date,
      _activeModifiers: unknown,
      event?: SyntheticEvent
    ) => {
      const returnValue: [Date | null, Date | null] | null = range
        ? [range.from ?? null, range.to ?? null]
        : null;
      onChange(returnValue as [Date, Date] | null, event);
    };

    return (
      <div className={pickerClass}>
        <DayPicker
          mode="range"
          selected={rangeSelected}
          onSelect={handleSelectRange}
          {...commonProps}
        />
        {children}
      </div>
    );
  }

  const handleSelectSingle = (
    date: Date | undefined,
    _selectedDay: Date,
    _activeModifiers: unknown,
    event?: SyntheticEvent
  ) => {
    onChange(date ?? null, event);
  };

  return (
    <div className={pickerClass}>
      <DayPicker
        mode="single"
        selected={selected ?? undefined}
        onSelect={handleSelectSingle}
        {...commonProps}
      />
      {children}
    </div>
  );
};

export default DatePicker;
