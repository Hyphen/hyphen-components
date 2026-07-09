import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Formik, Form, Field, getIn, setIn, FormikValues } from 'formik';
import { FormikToggleGroup } from './FormikToggleGroup';

const testGroupName = 'colors';

const groupOptions = [
  {
    id: 'purple',
    value: 'purple',
    label: 'Purple',
  },
  {
    id: 'green',
    value: 'green',
    label: 'Green',
  },
  {
    id: 'blue',
    value: 'blue',
    label: 'Blue',
    disabled: true,
  },
];

const handleValidation = (testValueKey: string) => (values: FormikValues) =>
  getIn(values, testValueKey)
    ? {}
    : setIn({}, testValueKey, 'selection is required');

const renderForm = (
  initialValue: any,
  props: any,
  testValueKey = testGroupName
) => (
  <Formik
    initialValues={{
      [testGroupName]: initialValue,
    }}
    onSubmit={props.handleSubmit}
    validate={props.isRequired ? handleValidation(testValueKey) : undefined}
  >
    {() => (
      <Form noValidate>
        <Field
          label={testValueKey}
          name={testValueKey}
          id={testValueKey}
          options={groupOptions}
          component={FormikToggleGroup}
          {...props}
        />
        <button type="submit">submit</button>
      </Form>
    )}
  </Formik>
);

describe('FormikToggleGroup', () => {
  test('renders all options', () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(renderForm(null, { handleSubmit }));
    expect(getByText('Purple')).toBeInTheDocument();
    expect(getByText('Green')).toBeInTheDocument();
    expect(getByText('Blue')).toBeInTheDocument();
  });

  test('updates Formik value when an option is selected', async () => {
    const handleSubmit = jest.fn();
    const { getByText, getByRole } = render(renderForm(null, { handleSubmit }));

    const purpleToggle = getByText('Purple');
    fireEvent.click(purpleToggle);

    fireEvent.click(getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });

    expect(handleSubmit.mock.calls[0][0]).toEqual({
      colors: 'purple',
    });
  });

  test('does not update Formik value when a disabled option is clicked', async () => {
    const handleSubmit = jest.fn();
    const { getByText, getByRole } = render(renderForm(null, { handleSubmit }));

    const blueToggle = getByText('Blue');
    fireEvent.click(blueToggle);

    fireEvent.click(getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });

    // Since the Blue option is disabled, the value should remain null.
    expect(handleSubmit.mock.calls[0][0]).toEqual({
      colors: null,
    });
  });

  test('displays validation error when required and not selected', async () => {
    const handleSubmit = jest.fn();
    const { getByRole, findByText } = render(
      renderForm('', { handleSubmit, isRequired: true })
    );

    fireEvent.click(getByRole('button', { name: /submit/i }));

    const errorMessage = await findByText('selection is required');
    expect(errorMessage).toBeInTheDocument();
  });
});
