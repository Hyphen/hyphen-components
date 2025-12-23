import React from 'react';
import classNames from 'classnames';
import {
  DayPicker,
  DayPickerProps,
  getDefaultClassNames,
  Matcher,
} from 'react-day-picker';
import 'react-day-picker/style.css';
import { Icon } from '../Icon/Icon';

export type CalendarProps = DayPickerProps;

function Calendar({
  captionLayout = 'label',
  className,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      className={className ? className : 'p-lg bw-sm br-sm'}
      captionLayout={captionLayout}
      style={
        {
          '--rdp-accent-color': 'var(--color-font-base)',
          '--rdp-accent-background-color':
            'var(--color-background-color-button-primary)',
          '--rdp-day-height': 'var(--size-dimension-4xl)',
          '--rdp-day-width': 'var(--size-dimension-4xl)',
          '--rdp-day_button-height': 'var(--size-dimension-4xl)',
          '--rdp-day_button-width': 'var(--size-dimension-4xl)',
          '--rdp-day_button-border-radius': '0',
          '--rdp-selected-border': '1px solid var(--color-font-base)',
          '--rdp-today-color': 'var(--rdp-accent-color)',
          '--rdp-nav-height': 'var(--size-dimension-4xl)',
          '--rdp-range_middle-background-color':
            'var(--color-background-tertiary)',
          '--rdp-range_middle-color': 'var(--color-font-base)',
          '--rdp-range_start-color': 'var(--color-font-inverse)',
          '--rdp-range_end-color': 'var(--color-font-inverse)',
        } as React.CSSProperties
      }
      classNames={{
        root: classNames(
          defaultClassNames.root,
          'w-fit font-color-secondary font-size-sm'
        ),
        months: classNames(
          defaultClassNames.months,
          'display-flex flex-direction-column flex-direction-row-tablet g-md position-relative'
        ),
        nav: classNames(
          defaultClassNames.nav,
          'display-flex flex-direction-row w-100 g-md position-absolute h-4xl align-items-center justify-content-space-between'
        ),
        button_previous: classNames(
          'p-0 select-none background-color-transparent bw-0',
          defaultClassNames.button_previous
        ),
        button_next: classNames(
          'p-0 select-none background-color-transparent bw-0',
          defaultClassNames.button_next
        ),
        month_caption: classNames(
          'display-flex align-items-center justify-content-center font-size-sm h-4xl'
        ),
        weekday: classNames(
          defaultClassNames.weekday,
          'font-weight-normal font-color-secondary'
        ),
        today: 'font-weight-bold',
        selected: classNames(
          'font-color-inverse background-color-inverse hover:font-color-inverse'
        ),
        month_grid: classNames(defaultClassNames.month_grid, 'm-top-lg'),
        day: classNames(defaultClassNames.day, 'hover:font-color-base'),
        day_button: classNames(defaultClassNames.day_button),
        range_middle: classNames(defaultClassNames.range_middle),
        table: classNames('w-100'),
        dropdowns: classNames(defaultClassNames.dropdowns, 'h-100'),
        caption_label: classNames(defaultClassNames.caption_label, 'g-2xs'),
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
              name="caret-sm-down"
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

export { Calendar };
export type { Matcher };
