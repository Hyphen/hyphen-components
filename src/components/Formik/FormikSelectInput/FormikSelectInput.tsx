import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
  getIn,
} from 'formik';
import { SelectInput, SelectInputProps } from '../../SelectInput/SelectInput';

export interface FormikSelectInputProps
  extends Omit<SelectInputProps, 'onChange'> {
  field: FieldAttributes<HTMLSelectElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  onChange?: SelectInputProps['onChange'];
}

export const FormikSelectInput: React.FC<FormikSelectInputProps> = ({
  field: { name, onBlur, onChange: formikOnChange, value },
  form: { touched, errors },
  onChange,
  id,
  label,
  options,
  error,
  ...props
}) => {
  const errorArray = getIn(errors, name)?.find((error: any) => error.label);

  return (
    <SelectInput
    id={id}
    label={label}
    options={options}
    name={name}
    onBlur={onBlur}
    onChange={onChange ?? formikOnChange}
    value={value}
    error={getIn(touched, name) && errorArray?.label}
    {...props}
  />)
}
