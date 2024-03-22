import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
  getIn,
} from 'formik';
import {
  SelectInputInset,
  SelectInputInsetProps,
} from '../../SelectInputInset/SelectInputInset';

export interface FormikSelectInputInsetProps
  extends Omit<SelectInputInsetProps, 'onChange'> {
  field: FieldAttributes<HTMLSelectElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  onChange?: SelectInputInsetProps['onChange'];
}

export const FormikSelectInputInset: React.FC<FormikSelectInputInsetProps> = ({
  field: { name, onBlur, onChange: formikOnChange, value },
  form: { touched, errors },
  onChange,
  id,
  label,
  options,
  ...props
}) => (
  <SelectInputInset
    {...props}
    id={id}
    label={label}
    options={options}
    name={name}
    onBlur={onBlur}
    onChange={onChange ?? formikOnChange}
    value={value}
    error={getIn(touched, name) && getIn(errors, name)}
  />
);
