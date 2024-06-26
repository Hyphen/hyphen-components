import React from 'react';
import { Box, BoxProps } from '../../Box/Box';
import { Icon } from '../../Icon/Icon';
import { FontColor } from '../../../types';
import { RadioInputProps } from './RadioInput'; // eslint-disable-line import/no-cycle
import { RadioGroupProps } from '../RadioGroup'; // eslint-disable-line import/no-cycle

export interface RadioIconProps extends BoxProps {
  /**
   * Custom className to be applied to root node of component.
   */
  className?: string;
  /**
   * Whether the input is in an error state. The icon will visually change accordingly.
   */
  error?: RadioGroupProps['error'];
  /**
   * Whether the radio is selected.
   */
  isSelected?: RadioInputProps['isSelected'];
  /**
   * If the input should be disabled and not focusable.
   */
  isDisabled?: RadioInputProps['isDisabled'];
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const RadioInputIcon: React.FC<RadioIconProps> = ({
  className = undefined,
  isSelected = false,
  isDisabled = false,
  error = null,
  ...restProps
}) => {
  let color: FontColor = 'secondary';
  let name: 'radio-btn-unchecked' | 'radio-btn-checked' = 'radio-btn-unchecked';

  if (isSelected && isDisabled) {
    color = 'disabled';
    name = 'radio-btn-checked';
  } else if (isSelected && !isDisabled) {
    color = 'base';
    name = 'radio-btn-checked';
  } else if (isDisabled) {
    color = 'disabled';
  }

  if (error) color = 'danger';
  if (isDisabled && error) color = 'danger-disabled';

  return (
    <Box className={className} {...restProps}>
      <Icon color={color} name={name} />
    </Box>
  );
};
