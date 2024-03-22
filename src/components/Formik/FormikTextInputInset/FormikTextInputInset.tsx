import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
  getIn,
} from 'formik';
import {
  TextInputInset,
  TextInputInsetProps,
} from '../../TextInputInset/TextInputInset';

export interface FormikTextInputInsetProps
  extends Omit<TextInputInsetProps, 'onChange'> {
  field: FieldAttributes<HTMLInputElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  onChange?: TextInputInsetProps['onChange'];
}

export const FormikTextInputInset: React.FC<FormikTextInputInsetProps> = ({
  field: { name, onBlur, onChange: formikOnChange, value },
  form: { touched, errors },
  onChange,
  id,
  label,
  ...props
}) => (
  <TextInputInset
    {...props}
    id={id}
    label={label}
    name={name}
    onBlur={onBlur}
    onChange={onChange ?? formikOnChange}
    value={value}
    error={getIn(touched, name) && getIn(errors, name)}
  />
);
