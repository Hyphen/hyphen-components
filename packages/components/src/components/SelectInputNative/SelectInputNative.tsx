import React from 'react';
import classNames from 'classnames';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import { ResponsiveProp } from '../../types';
import { Box, BoxOwnProps, BoxProps, boxPropsKeys } from '../Box/Box';
import { FormControl, FormControlProps } from '../FormControl/FormControl';
import styles from './SelectInputNative.module.scss';

export type SelectInputNativeSize = 'sm' | 'md' | 'lg';
export interface SelectInputNativeOption {
  value: string | number;
  label: string | number;
  disabled?: boolean;
}

interface SelectInputNativeOwnProps {
  /**
   * List of options for the select input.
   */
  options: SelectInputNativeOption[];
  /**
   * onChange callback from select element.
   */
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  /**
   * Value of selected option. Should match the value key in the option object.
   */
  value: React.ComponentPropsWithoutRef<'select'>['value'] | null;
  /**
   * Props passed directly to the select element of the component.
   */
  inputProps?: Omit<
    BoxProps<'select'>,
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-required'
    | 'as'
    | 'autoFocus'
    | 'children'
    | 'color'
    | 'defaultValue'
    | 'disabled'
    | 'id'
    | 'name'
    | 'onChange'
    | 'required'
    | 'size'
    | 'value'
  >;
  /**
   * The input's 'name' attribute.
   */
  name?: string;
  /**
   * Placeholder option displayed before a value is selected.
   */
  placeholder?: string;
  /**
   * Visual indicator that the field is required, that gets appended to the label
   */
  requiredIndicator?: React.ReactNode;
  /**
   * Size of the input. ('sm' | 'md' | 'lg')
   */
  size?: SelectInputNativeSize | ResponsiveProp<SelectInputNativeSize>;
  /**
   * Whether the input is autofocused on initial render.
   */
  autoFocus?: HTMLSelectElement['autofocus'];
}

type SelectInputNativeFormControlProps = Pick<
  FormControlProps,
  | 'error'
  | 'helpText'
  | 'hideLabel'
  | 'id'
  | 'isDisabled'
  | 'isRequired'
  | 'label'
>;

type SelectInputNativeElementProps = Omit<
  React.ComponentPropsWithoutRef<'select'>,
  | keyof SelectInputNativeOwnProps
  | keyof SelectInputNativeFormControlProps
  | keyof BoxOwnProps
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-required'
  | 'children'
  | 'dangerouslySetInnerHTML'
  | 'defaultValue'
  | 'size'
>;

export type SelectInputNativeProps = SelectInputNativeOwnProps &
  SelectInputNativeFormControlProps &
  Omit<BoxOwnProps, 'children'> &
  SelectInputNativeElementProps;

export const SelectInputNative: React.FC<SelectInputNativeProps> = ({
  autoFocus = false,
  label,
  hideLabel,
  helpText,
  error,
  id,
  inputProps = {},
  isDisabled,
  isRequired,
  name,
  value,
  options,
  onChange,
  placeholder = 'Select...',
  requiredIndicator = ' *',
  size = 'md',
  ...restProps
}) => {
  const isBoxProp = (key: string) =>
    boxPropsKeys.includes(key as keyof BoxOwnProps);
  const formControlProps = Object.fromEntries(
    Object.entries(restProps).filter(([key]) => isBoxProp(key))
  ) as Omit<BoxOwnProps, 'children'>;
  const selectProps = Object.fromEntries(
    Object.entries(restProps).filter(([key]) => !isBoxProp(key))
  ) as SelectInputNativeElementProps;
  const selectIsDisabled = isDisabled || selectProps.disabled;
  const selectIsRequired = isRequired || selectProps.required;

  const placeholderOption: SelectInputNativeOption = {
    value: '',
    label: placeholder,
    disabled: true,
  };
  const optionsWithPlaceholder: SelectInputNativeOption[] = [
    placeholderOption,
    ...options,
  ];

  const responsiveClasses = generateResponsiveClasses('size', size);

  const selectWrapperClasses = classNames(
    'hyphen-components__variables__form-control',
    styles['select-input-native-wrapper'],
    ...responsiveClasses.map((className) => styles[className]),
    {
      [styles.disabled]: selectIsDisabled,
      [styles.error]: error,
    }
  );

  return (
    <FormControl
      label={label}
      hideLabel={hideLabel}
      id={id}
      error={error}
      helpText={helpText}
      isDisabled={selectIsDisabled}
      isRequired={selectIsRequired}
      requiredIndicator={requiredIndicator}
      {...formControlProps}
    >
      <Box className={selectWrapperClasses}>
        <Box
          as="select"
          {...inputProps}
          {...selectProps}
          aria-label={label}
          aria-labelledby={label && !hideLabel ? `${id}Label` : undefined}
          aria-required={selectIsRequired}
          value={value ?? ''}
          onChange={onChange}
          color={!value ? 'disabled' : 'base'}
          autoFocus={autoFocus}
          disabled={selectIsDisabled}
          name={name}
          id={id}
          required={selectIsRequired}
        >
          {optionsWithPlaceholder.map((option) => (
            <Box
              as="option"
              key={option.value}
              value={option.value}
              disabled={option.disabled ?? false}
              hidden={option.value === ''}
              color={option.value === '' ? 'disabled' : 'base'}
            >
              {option.label}
            </Box>
          ))}
        </Box>
      </Box>
    </FormControl>
  );
};
