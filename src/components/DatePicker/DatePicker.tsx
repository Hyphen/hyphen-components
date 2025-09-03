import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { DayPicker } from 'react-day-picker';
import './DatePicker.module.scss';

export interface DatePickerProps
  extends React.ComponentProps<typeof DayPicker> {
  /**
   * React children (rendered below the calendar).
   */
  children?: ReactNode;
  /**
   * Custom classname applied to the outer container.
   */
  containerClassName?: string;
}

export const DatePicker: FC<DatePickerProps> = ({
  children = null,
  containerClassName,
  ...dayPickerProps
}) => {
  const wrapperClass = classNames(containerClassName);

  return (
    <div className={wrapperClass}>
      <DayPicker {...dayPickerProps} />
      {children}
    </div>
  );
};

export default DatePicker;

