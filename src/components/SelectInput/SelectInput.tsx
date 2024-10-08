import React, { FocusEvent, ReactNode, FocusEventHandler } from 'react';
import classNames from 'classnames';
import Select, {
  components,
  ClearIndicatorProps,
  OptionsOrGroups,
  OnChangeValue,
} from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import { ResponsiveProp } from '../../types';
import { generateResponsiveClasses, Z_INDEX_VALUES } from '../../lib';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { FormLabel } from '../FormLabel/FormLabel';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';
import styles from './SelectInput.module.scss';
import { GroupBase } from 'react-select/dist/declarations/src/types';

type SelectOptions = any;
type SelectGroupOptions = GroupBase<SelectOptions>;
export type SelectInputOptions = OptionsOrGroups<
  SelectOptions,
  SelectGroupOptions
>;

export type SimulatedEventPayloadType = {
  target: {
    name: string;
    value: OnChangeValue<SelectInputOptions, boolean>;
  };
};

export type TextInputSize =
  | 'sm'
  | 'md'
  | 'lg'
  | ResponsiveProp<'sm' | 'md' | 'lg'>;

export interface SelectInputProps {
  /**
   * The id attribute of the input.
   */
  id: string;
  /**
   * Custom content to be displayed above the input. If the label is hidden, will be used to set aria-label attribute.
   */
  label: string;
  /**
   * Callback function to call on change event.
   */
  onChange: (event: SimulatedEventPayloadType) => void;
  /**
   * The value(s) of select.
   */
  value: any | any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Autofocus select input on render.
   */
  autoFocus?: boolean;
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
   * Visually hide the label.
   */
  hideLabel?: boolean;
  /**
   * If the input value is clearable programmatically.
   */
  isClearable?: boolean;
  /**
   * Include custom option in dropdown list.
   */
  isCreatable?: boolean;
  /**
   * If the input should be disabled and not focusable.
   */
  isDisabled?: boolean;
  /**
   * Is multi select enabled.
   */
  isMulti?: boolean;
  /**
   * The required and aria-required attributes on the input
   */
  isRequired?: boolean;
  /**
   * Select 'name' attribute.
   */
  name?: string;
  /**
   * A ref to portal the dropdown menu to. This is useful when the dropdown is located in a smaller container
   * and we want to avoid cutting off the menu.
   */
  menuPortalTarget?: HTMLElement;
  /**
   * Callback function to call on blur event.
   */
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  /**
   * Callback function to call on focus event.
   */
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  /**
   * Placeholder for input.
   */
  placeholder?: string;
  /**
   * Visual indicator that the field is required, that gets appended to the label
   */
  requiredIndicator?: ReactNode;
  /**
   * The size of the text input.
   */
  size?: TextInputSize;
  /**
   * Additional props to be spread. These will be applied specifically to
   * the `react-select` component that powers the select. For full docs on
   * react-select props, [Click Here](https://react-select.com/props)
   */
  [x: string]: any; // eslint-disable-line
}

type AsyncOptions = (inputValue: string) => Promise<SelectInputOptions>;
type AsyncSelectInputProps = SelectInputProps & {
  /**
   * Load the input asynchronously.
   */
  isAsync: true;
  /**
   * Load options asynchronously.
   */
  options: AsyncOptions;
  /**
   * If cacheOptions is passed, then the loaded data will be cached.
   */
  cacheOptions?: boolean;
  /**
   * The default set of options to show before the user starts searching.
   */
  defaultOptions?: boolean;
};

type SyncSelectInputProps = SelectInputProps & {
  /**
   * Load the input synchronously.
   */
  isAsync?: false;
  /**
   * Options for dropdown list.
   */
  options: SelectInputOptions;
};

export function SelectInput(props: AsyncSelectInputProps): JSX.Element;
export function SelectInput(props: SyncSelectInputProps): JSX.Element;
export function SelectInput(props: SelectInputProps): JSX.Element {
  const {
    id,
    label,
    onChange,
    options,
    value,
    autoFocus = false,
    className = '',
    error = false,
    helpText,
    hideLabel = false,
    isClearable = false,
    isAsync = false,
    isCreatable = false,
    isDisabled = false,
    isMulti = false,
    isRequired = false,
    menuPortalTarget = null,
    name = '',
    onFocus = null,
    onBlur = null,
    placeholder = undefined,
    requiredIndicator = ' *',
    size = 'md',
    ...restProps
  } = props;

  const handleChange = (values: OnChangeValue<SelectInputOptions, boolean>) => {
    const simulatedEventPayloadType: SimulatedEventPayloadType = {
      target: {
        name,
        value: values,
      },
    };

    onChange(simulatedEventPayloadType);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    if (onFocus) onFocus(e);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    if (onBlur) onBlur(e);
  };

  const responsiveClasses = generateResponsiveClasses('size', size);

  const wrapperClasses = classNames(
    'hyphen-components__variables__form-control',
    'select-input-wrapper',
    className,
    ...responsiveClasses.map((c) => styles[c]),
    {
      [styles.disabled]: isDisabled,
    }
  );

  const inputClasses = classNames('react-select', { [styles.error]: error });

  const labelProps = {
    inputId: id,
    helpText,
    className: styles['select-input-label'],
    isDisabled,
    isFieldRequired: isRequired,
    requiredIndicator,
  };

  const ClearIndicator = (
    props: ClearIndicatorProps<
      OptionsOrGroups<SelectOptions, SelectGroupOptions>
    >
  ) => (
    <components.ClearIndicator {...props}>
      <Icon name="remove" />
    </components.ClearIndicator>
  );

  const Component =
    isCreatable && isAsync
      ? AsyncCreatableSelect
      : isCreatable
      ? CreatableSelect
      : isAsync
      ? AsyncSelect
      : Select;

  return (
    <Box width="100%" className={wrapperClasses}>
      {label && !hideLabel && <FormLabel {...labelProps}>{label}</FormLabel>}
      <Component
        {...restProps}
        {...(isAsync ? { loadOptions: options } : { options })}
        inputId={id}
        aria-label={label}
        components={{ ClearIndicator }}
        aria-labelledby={label && !hideLabel ? `${id}Label` : undefined}
        className={inputClasses}
        classNamePrefix="react-select"
        placeholder={placeholder}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isMulti={isMulti}
        menuPortalTarget={menuPortalTarget}
        name={name}
        autoFocus={autoFocus}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: Number(Z_INDEX_VALUES.popover),
          }),
        }}
        value={value}
      />
      {error && typeof error !== 'boolean' && (
        <InputValidationMessage>{error}</InputValidationMessage>
      )}
    </Box>
  );
}
