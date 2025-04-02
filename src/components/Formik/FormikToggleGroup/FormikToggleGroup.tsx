import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
  getIn,
} from 'formik';
import { ToggleGroup, ToggleGroupItem } from '../../ToggleGroup/ToggleGroup';
import { Box } from '../../Box/Box';
import { HelpText } from '../../HelpText/HelpText';

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
  helpText?: string;
  label?: string;
  children?: React.ReactNode;
}

export const FormikToggleGroup: React.FC<FormikToggleGroupProps> = ({
  field: { name, onBlur, value },
  form: { touched, errors, setFieldValue },
  options,
  helpText,
  label,
  children,
  ...props
}) => {
  return (
    <Box gap="sm">
      {(label || helpText) && (
        <div>
          {label && <Box fontSize="sm">{label}</Box>}
          {helpText && <HelpText>{helpText}</HelpText>}
        </div>
      )}
      <ToggleGroup
        {...props}
        name={name}
        onBlur={onBlur}
        onValueChange={(value) => setFieldValue(name, value)}
        value={value}
        error={getIn(touched, name) && getIn(errors, name)}
        type="single"
      >
        {children
          ? children
          : options.map((option) => (
              <ToggleGroupItem
                value={option.value}
                key={option.id}
                disabled={!!option.disabled}
              >
                {option.label}
              </ToggleGroupItem>
            ))}
      </ToggleGroup>
    </Box>
  );
};
