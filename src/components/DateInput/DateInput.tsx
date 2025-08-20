import React, { FC, useState } from 'react';
import format from 'date-fns/format';
import { DatePicker, DatePickerProps } from '../DatePicker/DatePicker';
import { TextInput, TextInputProps } from '../TextInput/TextInput';
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from '../Popover/Popover';
import { useOpenClose } from '../../hooks';

export interface DateInputProps {
  /**
   * Props object for DatePicker component.
   */
  datePickerProps: DatePickerProps;
  /**
   * Props object for TextInput component.
   */
  textInputProps: Omit<TextInputProps, 'onChange'>;
  /**
   * Format for final date to be displayed.
   * Relies on date-fns/format --> https://date-fns.org/v1.9.0/docs/format
   */
  dateFormat?: string;
  /**
   * Additional settings for formatting date.
   */
  dateOptions?: {
    /**
     * The user's locale.
     */
    locale?: globalThis.Locale | undefined;
    /**
     * Start of week.
     */
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
    /**
     * Should determine which week is week 1 of a new year.
     */
    firstWeekContainsDate?: number | undefined;
    /**
     * Whether to accept unicode tokens in format.
     * See here --> https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     */
    useAdditionalWeekYearTokens?: boolean | undefined;
    /**
     * Whether to accept unicode tokens in format.
     * See here --> https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     */
    useAdditionalDayOfYearTokens?: boolean | undefined;
  };
  /**
   * Props to pass down to the Popover component.
   */
  popoverProps?: {
    side: 'top' | 'bottom' | 'left' | 'right';
    align: 'start' | 'center' | 'end';
  };
  /**
   * Additional props to be spread to the `TextInput` element.
   */
  [x: string]: any; // eslint-disable-line
}

const defaultDatePickerProps: Omit<DatePickerProps, 'onChange'> = {
  selected: null,
  selectsRange: false,
};

const defaultPopoverProps = {
  align: 'start',
  side: 'bottom',
};

const defaultTextInputProps: Omit<TextInputProps, 'id'> = {
  label: 'Select Date',
};

export const DateInput: FC<DateInputProps> = ({
  datePickerProps,
  textInputProps,
  dateFormat = 'MM/dd/yyyy',
  dateOptions = undefined,
  popoverProps = { ...defaultPopoverProps },
}) => {
  const { isOpen, handleClose, handleOpen } = useOpenClose();

  // Internal state for selected date if not controlled
  const isControlled = datePickerProps.selected !== undefined;
  const [internalSelected, setInternalSelected] = useState<Date | null>(
    Array.isArray(datePickerProps.selected)
      ? datePickerProps.selected[0] ?? null
      : datePickerProps.selected ?? null
  );

  // Use controlled or internal state
  const selectedDate = isControlled
    ? datePickerProps.selected
    : internalSelected;

  const mergedDatePickerProps = {
    ...defaultDatePickerProps,
    ...datePickerProps,
    selected: selectedDate,
  };

  const mergedPopoverProps = {
    ...defaultPopoverProps,
    ...popoverProps,
    side: (popoverProps?.side ?? defaultPopoverProps.side) as
      | 'top'
      | 'bottom'
      | 'left'
      | 'right',
    align: (popoverProps?.align ?? defaultPopoverProps.align) as
      | 'start'
      | 'center'
      | 'end',
    onInteractOutside: handleClose,
  };

  const mergedTextInputProps = {
    ...defaultTextInputProps,
    ...textInputProps,
  };

  const getTextInputValue = () => {
    const { selectsRange, startDate, endDate, selected } =
      mergedDatePickerProps;
    // If selectsRange and selected is an array, use it for start/end
    let rangeStart = startDate;
    let rangeEnd = endDate;
    if (selectsRange && Array.isArray(selected)) {
      rangeStart = selected[0] ?? null;
      rangeEnd = selected[1] ?? null;
    }
    const formattedStartDate = rangeStart
      ? format(rangeStart, dateFormat, dateOptions)
      : '';
    const formattedEndDate = rangeEnd
      ? format(rangeEnd, dateFormat, dateOptions)
      : '';
    const formattedSelectedDate =
      selected && !selectsRange && !Array.isArray(selected)
        ? format(selected, dateFormat, dateOptions)
        : '';
    if (selectsRange) {
      return `${formattedStartDate}${
        formattedStartDate || formattedEndDate ? ' - ' : ''
      }${formattedEndDate}`;
    }
    return formattedSelectedDate;
  };

  const handleDatePickerChange = (
    date: Date | [Date, Date] | null,
    event?: React.SyntheticEvent<any, Event>
  ) => {
    if (datePickerProps.onChange) {
      datePickerProps.onChange(date, event);
    }
    if (!isControlled) {
      // If not controlled, update internal state
      if (Array.isArray(date)) {
        setInternalSelected(date[0] ?? null);
      } else {
        setInternalSelected(date);
      }
    }
    // Close popover when a date is selected (single) or when end date is selected (range)
    if (mergedDatePickerProps.selectsRange) {
      if (Array.isArray(date) && date[0] && date[1]) {
        handleClose();
      }
    } else if (date) {
      handleClose();
    }
  };

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <TextInput
          id={mergedTextInputProps.id}
          name={mergedTextInputProps.name}
          label={mergedTextInputProps.label}
          value={getTextInputValue()}
          readOnly
          onClick={handleOpen}
          inputProps={{ className: 'text-align-left' }}
          type="text"
          onChange={() =>
            null
          } /* Empty function since we hijack the onChange event */
          {...mergedTextInputProps}
        />
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent {...mergedPopoverProps}>
          <DatePicker
            {...mergedDatePickerProps}
            onChange={handleDatePickerChange}
            selected={selectedDate}
            selectsRange={mergedDatePickerProps.selectsRange}
          />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};
