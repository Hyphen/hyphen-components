import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Formik, Form, Field, getIn, setIn } from 'formik';
import { SelectInputInset } from '../../SelectInputInset/SelectInputInset';
import { FormikSelectInputInset } from './FormikSelectInputInset';

const testLabelName = 'test select';

const selectOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const handleValidation = (testValueKey: string | string[]) => (values: any) =>
  getIn(values, testValueKey)?.length > 1
    ? {}
    : setIn({}, testValueKey as string, 'input is required');

const renderForm = (
  initialValue: any,
  props: any,
  testValueKey = testLabelName
) => (
  <Formik
    initialValues={{
      [testLabelName]: initialValue,
    }}
    validate={props.isRequired ? handleValidation(testValueKey) : undefined} // eslint-disable-line
    onSubmit={async () => null}
  >
    {() => (
      <Form noValidate>
        <Field
          label={testValueKey}
          name={testValueKey}
          id={testValueKey}
          options={selectOptions}
          component={FormikSelectInputInset}
          {...props}
        />
        <button type="submit">submit</button>
      </Form>
    )}
  </Formik>
);

describe('FormikSelectInputInset', () => {
  describe('States', () => {
    describe('With a label, and no custom placeholder', () => {
      test('it renders input with a label, and with a default placeholder', () => {
        render(renderForm([], {}));

        expect(screen.getByLabelText(testLabelName)).toBeInTheDocument();
        expect(screen.getByText('Select...')).toBeInTheDocument();
      });

      test('assigns the "aria-labelledby" attribute and renders label with correct id, when label is provided', () => {
        render(renderForm([], {}));
        const inputElement = screen.getByLabelText(testLabelName);
        expect(inputElement).toHaveAttribute(
          'aria-labelledby',
          `${testLabelName}Label`
        );
        expect(
          document.getElementById(`${testLabelName}Label`)
        ).toBeInTheDocument();
      });
    });

    describe('Single select, pre-selected', () => {
      test('it renders with value pre-selected', () => {
        render(renderForm(selectOptions[2], {}));

        expect(screen.getByText('Vanilla')).toBeInTheDocument();
      });
    });

    describe('Is Disabled', () => {
      test('it disables the input', () => {
        const { getByRole } = render(renderForm([], { isDisabled: true }));

        const combobox = getByRole('combobox');
        expect(combobox).toBeDisabled();
      });
    });

    describe('Is Invalid, with a helpful message', () => {
      test('it renders the helpful message', async () => {
        const { getByText } = render(renderForm([], { isRequired: true }));
        const submitButton = getByText('submit');

        fireEvent.click(submitButton);
        await waitFor(() =>
          expect(screen.getByText('input is required')).toBeInTheDocument()
        );
      });

      test('it renders errors from nested objects', async () => {
        const { getByText } = render(
          renderForm(
            { outer: { nested: [] } },
            { isRequired: true },
            `${testLabelName}.outer.nested`
          )
        );
        const submitButton = getByText('submit');

        fireEvent.click(submitButton);
        await waitFor(() =>
          expect(screen.getByText('input is required')).toBeInTheDocument()
        );
      });
    });
  });

  describe('Callback Handling', () => {
    describe('onChange', () => {
      test("Custom onChange event fires callback function, overwriting Formik's onChange", async () => {
        let value = null;
        const mockedHandleChange = jest.fn((event) => {
          value = event.target.value;
        });

        const { getByLabelText } = render(
          renderForm(value, { onChange: mockedHandleChange })
        );
        const selectInput = getByLabelText(testLabelName);

        fireEvent.change(selectInput);
        expect(mockedHandleChange).toHaveBeenCalledTimes(1);
      });

      test('it fires onChange callback on change', async () => {
        const mockedHandleChange = jest.fn();

        const { getByRole } = render(
          <SelectInputInset
            id="testId"
            onChange={mockedHandleChange}
            placeholder="Test Placeholder"
            label="onchange test"
            options={selectOptions}
            value={null}
          />
        );
        const combobox = getByRole('combobox');
        fireEvent.change(combobox, { target: { value: 'vanilla' } });
        expect(mockedHandleChange).toBeCalledTimes(1);
      });
    });
  });
});
