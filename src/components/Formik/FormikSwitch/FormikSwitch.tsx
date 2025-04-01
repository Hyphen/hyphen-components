import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
  getIn,
} from 'formik';
import { Switch } from '../../Switch/Switch';

export interface FormikSwitchProps {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  id: string;
  label: string;
}

export const FormikSwitch: React.FC<FormikSwitchProps> = ({
  field: {
    name,
    onBlur, // eslint-disable-line no-unused-vars
    onChange, // eslint-disable-line no-unused-vars
    value,
  },
  form: { touched, errors },
  ...props
}) => (
  <Switch
    error={getIn(touched, name) && getIn(errors, name)}
    isChecked={value}
    onBlur={onBlur}
    onChange={onChange} // eslint-disable-line
    {...props}
  />
);
