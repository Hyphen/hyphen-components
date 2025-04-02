import React, { ChangeEvent } from 'react';
import { Field, Form, Formik } from 'formik';
import { FormikTextInput } from './FormikTextInput/FormikTextInput';
import { FormikCheckboxInput } from './FormikCheckboxInput/FormikCheckboxInput';
import { FormikSelectInput } from './FormikSelectInput/FormikSelectInput';
import { FormikSelectInputNative } from './FormikSelectInputNative/FormikSelectInputNative';
import { FormikRadioGroup } from './FormikRadioGroup/FormikRadioGroup';
import { FormikTextareaInput } from './FormikTextareaInput/FormikTextareaInput';
import { DateInput } from '../DateInput/DateInput';
import { FormikSwitch } from './FormikSwitch/FormikSwitch';
import { Button } from '../Button/Button';
import { Box } from '../Box/Box';
import { FormikTimePickerNative } from './FormikTimePickerNative/FormikTimePickerNative';
import { FormikSelectInputInset } from './FormikSelectInputInset/FormikSelectInputInset';
import { FormikTextareaInputInset } from './FormikTextareaInputInset/FormikTextareaInputInset';
import { FormikTextInputInset } from './FormikTextInputInset/FormikTextInputInset';
import { allModes } from '../../modes';
import { FormikToggleGroup } from './FormikToggleGroup/FormikToggleGroup';
import { ToggleGroupItem } from '../ToggleGroup/ToggleGroup';
import { Tooltip, TooltipContent, TooltipProvider } from '../Tooltip/Tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';

const meta = {
  title: 'Patterns/Formik Form',
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light'],
        dark: allModes['dark'],
      },
    },
  },
};

export default meta;

export const FormikForm = () =>
  (() => {
    const flavorOptions = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ];
    const colorOptions = [
      { value: 'red', label: 'red' },
      { value: 'orange', label: 'orange' },
      { value: 'yellow', label: 'yellow' },
      { value: 'green', label: 'green' },
      { value: 'blue', label: 'blue' },
      { value: 'indigo', label: 'indigo' },
      { value: 'violet', label: 'violet' },
    ];
    const sizeOptions = [
      { id: 'small', value: 'small', label: 'Small' },
      { id: 'medium', value: 'medium', label: 'Medium' },
      { id: 'large', value: 'large', label: 'Large' },
    ];
    const availabilityOptions = [
      {
        id: '99',
        label: '99%',
        value: '99',
        description: 'Standard',
        downtime: '3.65 days/year',
      },
      {
        id: '999',
        label: '99.9%',
        value: '99.9',
        description: 'High',
        downtime: '8.76 hours/year',
      },
      {
        id: '9999',
        label: '99.99%',
        value: '99.99',
        description: 'Very High',
        downtime: '52.56 minutes/year',
      },
      {
        id: '99999',
        label: '99.999%',
        value: '99.999',
        description: 'Mission Critical',
        downtime: '5.26 minutes/year',
      },
    ];
    const handleValidation = (values: Record<string, any>) => {
      const errors: Record<string, string> = {};
      if (!values.firstName) {
        errors.firstName = 'required';
      }
      if (!values.lastName) {
        errors.lastName = 'required';
      }
      if (!values.areTermsChecked) {
        errors.areTermsChecked = 'required';
      }
      if (!values.areTermsChecked2) {
        errors.areTermsChecked2 = 'required';
      }
      if (!values.email) {
        errors.email = 'required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      if (!values.flavor) {
        errors.flavor = 'required';
      }
      if (!values.sizes) {
        errors.sizes = 'required';
      }
      if (!values.timePicker) {
        errors.timePicker = 'required';
      }
      if (!values.dateInput) {
        errors.dateInput = 'required';
      }
      if (!values.colors.length) {
        errors.colors = 'required';
      }
      if (!values.colors2) {
        errors.colors2 = 'required';
      }
      if (!values.message) {
        errors.message = 'required';
      }
      if (!values.country) {
        errors.country = 'required';
      }
      if (!values.country) {
        errors.country = 'required';
      }
      if (!values.availability) {
        errors.availability = 'required';
      }
      return errors;
    };
    const handleSubmit = (
      values: Record<string, any>,
      { setSubmitting }: any
    ) => {
      // Make API calls here
      setTimeout(() => {
        setSubmitting(false);
        alert(
          // eslint-disable-line no-alert
          `Submitted Successfully ->  ${JSON.stringify(values, null, 2)}`
        );
      }, 2000);
    };
    const formatOutput = (
      values: Record<string, any>,
      isSubmitting?: boolean
    ) => {
      return { ...values, isSubmitting };
    };
    return (
      <Box maxWidth="500px" margin="lg auto" background="primary" padding="2xl">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            areTermsChecked: false,
            areTermsChecked2: false,
            flavor: null,
            flavor2: null,
            colors: [],
            colors2: '',
            sizes: null,
            timePicker: null,
            timePickerNative: null,
            dateInput: '',
            message: '',
            country: '',
            availability: '99',
          }}
          validate={handleValidation}
          validateOnChange={false}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue, handleBlur, errors }) => (
            <Form noValidate>
              <Box gap="3xl">
                <Field
                  type="text"
                  label="First Name"
                  name="firstName"
                  id="firstName"
                  component={FormikTextInput}
                  // With a custom onChange.
                  // We preserve Formik's convention and relegate state form management back to the user.
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setFieldValue('firstName', event.target.value);
                  }}
                  isRequired
                />
                <Field
                  type="text"
                  label="Last Name"
                  name="lastName"
                  id="lastName"
                  component={FormikTextInput}
                  isRequired
                />
                <Field
                  label="Country"
                  name="country"
                  id="country"
                  component={FormikTextInputInset}
                  isRequired
                />
                <Field
                  label="Email"
                  name="email"
                  id="email"
                  component={FormikTextInput}
                  isRequired
                />
                <Field
                  label="Phone"
                  name="phone"
                  id="phone"
                  component={FormikTextInput}
                  type="tel"
                />
                <Field
                  label="Flavor with Custom onChange"
                  name="flavor"
                  id="flavor"
                  options={flavorOptions}
                  component={FormikSelectInputNative}
                  // With a custom onChange.
                  // We preserve Formik's convention and relegate form state management back to the user.
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setFieldValue('flavor', event.target.value);
                  }}
                  isRequired
                />
                <Field
                  label="Flavor without custom onChange"
                  name="flavor2"
                  id="flavor2"
                  options={flavorOptions}
                  component={FormikSelectInputNative}
                />
                <Field
                  label="Multi-select Colors"
                  name="colors"
                  id="colors"
                  isMulti
                  options={colorOptions}
                  component={FormikSelectInput}
                />
                <Field
                  label="Describe your perfect meal"
                  name="meal"
                  id="meal"
                  component={FormikTextareaInput}
                />
                <Field
                  title="Sizes"
                  name="sizes"
                  id="sizes"
                  options={sizeOptions}
                  component={FormikRadioGroup}
                  isRequired
                />
                <Field
                  label="Select Time With Native Select"
                  name="timePicker"
                  id="timePicker"
                  component={FormikTimePickerNative}
                  isRequired
                />
                <Field
                  label="Terms and Conditions"
                  name="areTermsChecked"
                  id="areTermsChecked"
                  component={FormikCheckboxInput}
                  isRequired
                />
                <Field
                  label="Terms and Conditions Toggle"
                  name="areTermsChecked2"
                  id="areTermsChecked2"
                  component={FormikSwitch}
                  isRequired
                />
                <Field
                  label="Colors"
                  name="colors2"
                  id="colors2"
                  options={colorOptions}
                  component={FormikSelectInputInset}
                  isRequired
                />
                <Field
                  label="Message"
                  name="message"
                  id="message"
                  component={FormikTextareaInputInset}
                  isRequired
                />
                <TooltipProvider delayDuration={0}>
                  <Field
                    label="Availability"
                    helpText="Impacts multi-zone setup, load balancing, and redundancy"
                    name="availability"
                    id="availability"
                    variant="outline"
                    component={FormikToggleGroup}
                    options={availabilityOptions}
                    gap="md"
                  >
                    {availabilityOptions.map((option) => (
                      <ToggleGroupItem key={option.id} value={option.value}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Box
                              textAlign="left"
                              alignItems="flex-start"
                              gap="xs"
                              padding="xs"
                            >
                              <Box fontSize="xl" fontWeight="semibold">
                                {option.label}
                              </Box>
                              <Box color="tertiary" fontSize="xs">
                                {option.description}
                              </Box>
                            </Box>
                          </TooltipTrigger>
                          <TooltipContent side="top" sideOffset={10}>
                            Up to {option.downtime} days/year downtime
                          </TooltipContent>
                        </Tooltip>
                      </ToggleGroupItem>
                    ))}
                  </Field>
                </TooltipProvider>

                <DateInput
                  datePickerProps={{
                    onChange: (date) => {
                      setFieldValue('dateInput', date as Date);
                    },
                    selected: values.dateInput as unknown as Date,
                  }}
                  textInputProps={{
                    label: 'Date Input',
                    name: 'dateInput',
                    id: 'dateInput',
                    error: errors.dateInput,
                    isRequired: true,
                    onClear: () => {
                      setFieldValue('dateInput', null);
                    },
                    onBlur: handleBlur,
                  }}
                />
                <Button type="submit" isLoading={isSubmitting}>
                  Submit
                </Button>
                <pre className="font-family-monospace">
                  {JSON.stringify(
                    formatOutput(values, isSubmitting),
                    undefined,
                    2
                  )}
                </pre>
                <pre className="font-family-monospace">
                  {JSON.stringify(
                    formatOutput(errors, undefined),
                    undefined,
                    2
                  )}
                </pre>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    );
  })();
