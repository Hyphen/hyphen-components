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

const defaultDatePickerProps: DatePickerProps = {
  selected: undefined,
  mode: 'single',
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
  const [internalSelected, setInternalSelected] = useState<any>(
    datePickerProps.selected
  );

  // Use controlled or internal state
  const selectedDate = isControlled
    ? datePickerProps.selected
    : internalSelected;

  const mergedDatePickerProps: DatePickerProps = {
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
    const { mode, selected } = mergedDatePickerProps as any;
    if (mode === 'range') {
      const { from, to } = (selected || {}) as {
        from?: Date;
        to?: Date;
      };
      const formattedStartDate = from
        ? format(from, dateFormat, dateOptions)
        : '';
      const formattedEndDate = to ? format(to, dateFormat, dateOptions) : '';
      return `${formattedStartDate}${
        formattedStartDate || formattedEndDate ? ' - ' : ''
      }${formattedEndDate}`;
    }
    if (Array.isArray(selected)) {
      return selected.map((d) => format(d, dateFormat, dateOptions)).join(', ');
    }
    return selected ? format(selected as Date, dateFormat, dateOptions) : '';
  };

  const handleDatePickerSelect = (date: any) => {
    if (datePickerProps.onSelect) {
      datePickerProps.onSelect(date);
    }
    if (!isControlled) {
      setInternalSelected(date);
    }
    if (mergedDatePickerProps.mode === 'range') {
      const { from, to } = (date || {}) as { from?: Date; to?: Date };
      if (from && to) {
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
            onSelect={handleDatePickerSelect}
            selected={selectedDate}
          />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};
