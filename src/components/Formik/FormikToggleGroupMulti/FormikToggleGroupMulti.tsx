import React from 'react';
import { FieldArray, useField, getIn } from 'formik';
import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleVariant,
} from '../../ToggleGroup/ToggleGroup';
import { Box } from '../../Box/Box';
import { HelpText } from '../../HelpText/HelpText';

export interface FormikToggleGroupMultiProps {
  name: string;
  options: Array<{
    id: string;
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
  }>;
  helpText?: string;
  label?: string;
  children?: React.ReactNode;
  variant: ToggleVariant;
}

export const FormikToggleGroupMulti = ({
  name,
  options,
  helpText,
  label,
  children,
  variant,
  ...props
}: FormikToggleGroupMultiProps) => {
  const [field, meta, helpers] = useField(name);
  return (
    <Box gap="sm">
      {(label || helpText) && (
        <div>
          {label && <Box fontSize="sm">{label}</Box>}
          {helpText && <HelpText>{helpText}</HelpText>}
        </div>
      )}
      <FieldArray name={name}>
        {() => (
          <ToggleGroup
            {...props}
            name={name}
            onValueChange={(selectedValues: string[]) => {
              helpers.setValue(selectedValues);
              helpers.setTouched(true);
            }}
            value={field.value}
            error={meta.error}
            type="multiple"
            variant={variant}
          >
            {children
              ? children
              : options.map((option) => (
                  <ToggleGroupItem
                    key={option.id}
                    id={option.id}
                    value={option.value}
                    disabled={!!option.disabled}
                  >
                    {option.label}
                  </ToggleGroupItem>
                ))}
          </ToggleGroup>
        )}
      </FieldArray>
    </Box>
  );
};
