import React from 'react';
import classNames from 'classnames';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import { Icon } from '../Icon/Icon';

function Calendar({
  captionLayout = 'label',
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames();
  console.log(defaultClassNames);
  return (
    <DayPicker
      className="br-sm bw-sm p-lg font-color-base"
      captionLayout={captionLayout}
      classNames={{
        root: classNames(defaultClassNames.root, 'w-fit'),
        months: classNames(
          defaultClassNames.months,
          'display-flex flex-direction-column flex-direction-row-tablet g-md position-relative'
        ),
        nav: classNames(
          defaultClassNames.nav,
          'display-flex flex-direction-row w-100 g-md position-absolute h-4xl align-items-center justify-content-space-between'
        ),
        button_previous: classNames(
          'p-0 select-none background-color-transparent bw-0 font-color-base',
          defaultClassNames.button_previous
        ),
        button_next: classNames(
          'p-0 select-none background-color-transparent bw-0 font-color-base',
          defaultClassNames.button_next
        ),
        month_caption: classNames(
          'display-flex flex-direction-row align-items-center justify-content-center w-100 h-4xl',
          defaultClassNames.month_caption
        ),
        weekday: classNames(
          defaultClassNames.weekdays,
          'font-weight-normal font-color-secondary'
        ),
        table: classNames('w-100'),
      }}
      components={{
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <Icon
                name="caret-left"
                className={classNames(className)}
                {...props}
                size="md"
              />
            );
          }

          if (orientation === 'right') {
            return (
              <Icon
                name="caret-right"
                className={classNames(className)}
                {...props}
                size="md"
              />
            );
          }

          return (
            <Icon
              name="caret-down"
              className={classNames(className)}
              {...props}
              size="md"
            />
          );
        },
      }}
      {...props}
    />
  );
}

export default Calendar;
