import React, { FC } from 'react';
import {
  FormikTouched,
  FormikErrors,
  FormikValues,
  FieldAttributes,
  getIn,
} from 'formik';
import {
  TextareaInputInset,
  TextareaInputInsetProps,
} from '../../TextareaInputInset/TextareaInputInset';

export interface FormikTextareaInputInsetProps
  extends Omit<TextareaInputInsetProps, 'onChange'> {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  onChange?: TextareaInputInsetProps['onChange'];
}

export const FormikTextareaInputInset: FC<FormikTextareaInputInsetProps> = ({
  field: { name, onBlur, onChange: formikOnChange, value },
  form: { touched, errors },
  onChange,
  id,
  label,
  ...props
}) => (
  <TextareaInputInset
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
