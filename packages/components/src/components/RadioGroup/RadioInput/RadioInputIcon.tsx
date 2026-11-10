import React from 'react';
import { Box, BoxProps } from '../../Box/Box';
import { Icon } from '../../Icon/Icon';
import { FontColor } from '../../../types';
import { RadioInputProps } from './RadioInput';
import { RadioGroupProps } from '../RadioGroup';

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
