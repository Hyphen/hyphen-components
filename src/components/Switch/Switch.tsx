import { Box, BoxProps } from '../Box/Box';
import React, { ChangeEvent, FC, FocusEvent, ReactNode } from 'react';

import { FormLabel } from '../FormLabel/FormLabel';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';
import { ResponsiveProp } from '../../types';
import classNames from 'classnames';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import styles from './Switch.module.scss';

export type SwitchSize = 'sm' | 'md' | 'lg';
export interface SwitchProps {
  /**
   * The id attribute of the input.
   */
  id: string;
  /**
   * The switch input "checked" attribute.
   */
  isChecked: boolean;
  /**
   * Custom content to be displayed to right of switch.
   */
  label: string;
  /**
   * Callback function when input is changed.
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Additional classes to add.
   */
  className?: string;
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: ReactNode;
  /**
   * Additional clarifying text to help describe the input
   */
  helpText?: ReactNode;
  /**
   * Determines if the label is not shown for stylistic reasons.
   * Note the label is still a required prop and will be used as the aria-label for accessibility reasons.
   */
  hideLabel?: boolean;
  /**
   * If the input should be disabled and not focusable.
   */
  isDisabled?: boolean;
  /**
   * The required and aria-required attributes on the input
   */
  isRequired?: boolean;
  /**
   * Callback function when input is blurred.
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback function when input is focused.
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Visual indicator that the field is required, that gets appended to the label
   */
  requiredIndicator?: React.ReactNode;
  /**
   * The size of the switch.
   */
  size?: SwitchSize | ResponsiveProp<SwitchSize>;
}

export const Switch: FC<SwitchProps> = ({
  id,
  isChecked,
  label,
  onChange,
  className = '',
  error = false,
  hideLabel = false,
  helpText,
  isDisabled = false,
  isRequired = false,
  onBlur = undefined,
  onFocus = undefined,
  requiredIndicator = ' *',
  size = 'md',
}) => {
  const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
    if (onBlur) onBlur(event);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
    if (onFocus) onFocus(event);
  };

  const wrapperClasses = classNames(
    'hyphen-components__variables__form-control',
    { [styles.disabled]: isDisabled }
  );
  const trackClasses = classNames(
    styles['switch-track'],
    ...generateResponsiveClasses('track-size', size).map((c) => styles[c]),
    {
      [styles.error]: error,
    }
  );
  const thumbClasses = classNames(
    styles['switch-thumb'],
    ...generateResponsiveClasses('thumb-size', size).map((c) => styles[c])
  );

  const inputProps = {
    'aria-required': isRequired,
    'aria-invalid': !!error,
    'aria-label': label,
    'aria-labelledby': label && !hideLabel ? `${id}Label` : undefined,
    id,
    checked: !!isChecked,
    disabled: isDisabled,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    required: isRequired,
    type: 'checkbox',
    className: styles['switch-input'],
  };

  const labelProps = {
    inputId: id,
    isDisabled,
    display: 'flex' as BoxProps['display'],
    direction: 'row' as BoxProps['direction'],
    childGap: 'sm' as BoxProps['childGap'],
    alignItems: helpText ? 'flex-start' : ('center' as BoxProps['alignItems']),
    isFieldRequired: isRequired,
    requiredIndicator,
    size,
  };

  return (
    <Box className={className}>
      <Box className={wrapperClasses}>
        <FormLabel {...labelProps}>
          <input {...inputProps} />
          <span
            aria-hidden="true"
            className={trackClasses}
            data-testid="switchTrack"
          >
            <span className={thumbClasses} data-testid="switchThumb" />
          </span>
          {!hideLabel && (
            <Box
              gap="2xs"
              className={
                helpText && (size === 'md' || size === 'lg') ? 'm-top-2xs' : ''
              }
            >
              {label && <div>{label}</div>}
              {helpText && (
                <Box
                  as="p"
                  display="block"
                  fontSize="sm"
                  fontWeight="normal"
                  color="secondary"
                >
                  {helpText}
                </Box>
              )}
            </Box>
          )}
        </FormLabel>
      </Box>
      {error && error !== true && (
        <InputValidationMessage>{error}</InputValidationMessage>
      )}
    </Box>
  );
};
