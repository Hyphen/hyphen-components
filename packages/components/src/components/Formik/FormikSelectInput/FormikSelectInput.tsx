import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
  getIn,
} from 'formik';
import {
  AsyncSelectInputProps,
  SelectInput,
  SelectInputProps,
  SyncSelectInputProps,
} from '../../SelectInput/SelectInput';

interface FormikSelectInputOwnProps {
  field: FieldAttributes<HTMLSelectElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  onChange?: SelectInputProps['onChange'];
  error?: string | Array<{ label?: string }>;
}

type FormikControlledSelectProps =
  | keyof FormikSelectInputOwnProps
  | 'name'
  | 'onBlur'
  | 'value';

export type FormikSelectInputProps = FormikSelectInputOwnProps &
  (
    | Omit<AsyncSelectInputProps, FormikControlledSelectProps>
    | Omit<SyncSelectInputProps, FormikControlledSelectProps>
  );

export const FormikSelectInput: React.FC<FormikSelectInputProps> = ({
  field: { name, onBlur, onChange: formikOnChange, value },
  form: { touched, errors },
  onChange,
  error: errorProp,
  ...selectProps
}) => {
  let errorMessage: string | undefined;
  const error: unknown =
    errorProp ?? (getIn(touched, name) && getIn(errors, name));

  if (typeof error === 'string') {
    errorMessage = error;
  } else if (Array.isArray(error)) {
    errorMessage = error.find((err) => err?.label)?.label;
  }

  return (
    <SelectInput
      {...selectProps}
      name={name}
      onBlur={onBlur}
      onChange={onChange ?? formikOnChange}
      value={value}
      error={errorMessage}
    />
  );
};
