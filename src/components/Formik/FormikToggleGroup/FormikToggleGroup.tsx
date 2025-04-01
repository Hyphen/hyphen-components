import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
  getIn,
} from 'formik';
import { ToggleGroup, ToggleGroupItem } from '../../ToggleGroup/ToggleGroup';

export interface FormikToggleGroupProps {
  field: FieldAttributes<HTMLInputElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
    setFieldValue: (field: string, value: any) => void;
  };
  options: Array<{
    id: string | number;
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
  }>;
}

export const FormikToggleGroup: React.FC<FormikToggleGroupProps> = ({
  field: { name, onBlur, value },
  form: { touched, errors, setFieldValue },
  options,
  ...props
}) => {
  console.log(getIn(touched, name), getIn(errors, name));

  return (
    <ToggleGroup
      {...props}
      name={name}
      onBlur={onBlur}
      onValueChange={(value) => setFieldValue(name, value)}
      value={value}
      error={getIn(touched, name) && getIn(errors, name)}
      type="single"
    >
      {options.map((option) => (
        <ToggleGroupItem
          value={option.value}
          key={option.id}
          disabled={!!option.disabled}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
