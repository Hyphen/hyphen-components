import React from 'react';
import {
  render,
  fireEvent,
  screen,
  Matcher,
  waitFor,
} from '@testing-library/react';
import selectEvent from 'react-select-event';
import { SelectInput, TextInputSize } from './SelectInput';

const selectOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function getByTextWithMarkup(
  text: string
): (_content: any, element: Element) => boolean {
  return (_content: any, element: Element) => {
    const hasText = (node: Element) => node.textContent === text;
    const elementHasText = hasText(element);
    const childrenDontHaveText = Array.from(element.children).every(
      (child) => !hasText(child)
    );

    return elementHasText && childrenDontHaveText;
  };
}

describe('SelectInput', () => {
  describe('Callback Handling', () => {
    it('it fires onChange callback on change', async () => {
      const mockedHandleChange = jest.fn();

      const { getByLabelText } = render(
        <SelectInput
          value="chocolate"
          id="testId"
          onChange={mockedHandleChange}
          placeholder="Test Placeholder"
          label="onchange test"
          options={selectOptions}
        />
      );

      await selectEvent.select(getByLabelText('onchange test'), 'Vanilla');

      expect(mockedHandleChange).toBeCalledTimes(1);
    });

    it('it fires onFocus callback on focus', () => {
      const mockedHandleChange = jest.fn();
      const mockedHandleFocus = jest.fn();

      render(
        <SelectInput
          id="testId"
          label="Test"
          value="chocolate"
          onChange={mockedHandleChange}
          onFocus={mockedHandleFocus}
          placeholder="Test Placeholder"
          options={selectOptions}
        />
      );

      fireEvent.focus(screen.getByRole('combobox'));

      expect(mockedHandleFocus).toBeCalledTimes(1);
    });

    it('it fires onBlur callback on blur', () => {
      const mockedHandleChange = jest.fn();
      const mockedHandleBlur = jest.fn();

      render(
        <SelectInput
          id="testId"
          label="Test"
          value="chocolate"
          onChange={mockedHandleChange}
          onBlur={mockedHandleBlur}
          placeholder="Test Placeholder"
          options={selectOptions}
        />
      );

      fireEvent.blur(screen.getByRole('combobox'));

      expect(mockedHandleBlur).toBeCalledTimes(1);
    });
  });

  describe('States', () => {
    describe('Hidden label, with a placeholder', () => {
      it('it renders input without a visual label, and with a placeholder', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            label="hidden label"
            value="chocolate"
            hideLabel
            onChange={mockedHandleChange}
            placeholder="Test Placeholder"
            options={selectOptions}
          />
        );
        expect(screen.queryByText('hidden label')).toBeNull();
        expect(screen.getByText('Test Placeholder')).toBeInTheDocument();
      });
    });

    it('does not assign "aria-labelledby" attribute when a label is hidden', () => {
      const mockedHandleChange = jest.fn();

      render(
        <SelectInput
          id="testInput"
          label="hidden label"
          hideLabel
          onChange={mockedHandleChange}
          options={selectOptions}
          value="chocolate"
        />
      );
      const inputElement = screen.getByLabelText('hidden label');
      expect(inputElement).not.toHaveAttribute('aria-labelledby');
    });

    describe('With a label, and no custom placeholder', () => {
      it('it renders input with a label, and with a default placeholder', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            value="chocolate"
          />
        );

        expect(screen.getByLabelText('Select Label')).toBeInTheDocument();
        expect(screen.getByText('Select...')).toBeInTheDocument();
      });

      it('assigns the "aria-labelledby" attribute and renders label correct id, when a label is provided', () => {
        const mockedHandleChange = jest.fn();
        render(
          <SelectInput
            id="testInput"
            label="test label"
            options={selectOptions}
            value="chocolate"
            onChange={mockedHandleChange}
          />
        );
        const inputElement = screen.getByLabelText('test label');
        expect(inputElement).toHaveAttribute(
          'aria-labelledby',
          'testInputLabel'
        );
        expect(document.getElementById('testInputLabel')).toBeInTheDocument();
      });
    });

    describe('Single select, pre-selected', () => {
      it('it renders with value pre-selected', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            value={selectOptions[2]}
          />
        );

        expect(screen.getByText('Vanilla')).toBeInTheDocument();
      });
    });

    describe('Single select with creatable options', () => {
      it('it renders a new option when a user types in a new value', async () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            isCreatable
            value={[{ value: 'new-value', label: 'New Value' }]}
          />
        );

        expect(screen.queryByText('New Value')).toBeInTheDocument();
      });
    });

    describe('Async select', () => {
      it('it renders with loading state', async () => {
        const mockedHandleChange = jest.fn();
        const loadOptions = jest.fn(() => Promise.resolve([]));

        const { getByLabelText } = render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={loadOptions}
            value={''}
            isAsync
          />
        );

        const inputElement = getByLabelText('Select Label');
        fireEvent.change(inputElement, { target: { value: 'test' } });

        await waitFor(() => {
          expect(loadOptions).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('Multi select, no selection', () => {
      it('it renders input with a label, and with a default placeholder', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            isMulti
            value={[]}
          />
        );

        expect(screen.getByLabelText('Select Label')).toBeInTheDocument();
        expect(screen.getByText('Select...')).toBeInTheDocument();
      });
    });

    describe('Multi select, with multiple items selected', () => {
      it('it renders input with a label, and with two items selected', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            isMulti
            value={[selectOptions[0], selectOptions[2]]}
          />
        );

        expect(screen.getByLabelText('Select Label')).toBeInTheDocument();
        expect(screen.queryByText('Select...')).toBeNull();
        expect(screen.getByText('Chocolate')).toBeInTheDocument();
        expect(screen.getByText('Vanilla')).toBeInTheDocument();
      });
    });

    describe('Multi select with creatable options', () => {
      it('it renders a new option when a user types in a new value', async () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            isMulti
            isCreatable
            value={[{ value: 'new-value', label: 'New Value' }]}
          />
        );

        expect(screen.queryByText('New Value')).toBeInTheDocument();
      });
    });

    describe('Is Required', () => {
      it('it renders an asterisk in the label', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            value="chocolate"
            isRequired
          />
        );

        expect(
          screen.getByText(
            getByTextWithMarkup('Select Label *') as unknown as Matcher
          )
        ).toBeInTheDocument();
      });
    });

    describe('Is Disabled', () => {
      it('it disables the input', () => {
        const mockedHandleChange = jest.fn();

        const { container } = render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            value="chocolate"
            isDisabled
          />
        );

        const combobox = container.querySelector(
          '.react-select__control[aria-disabled="true"]'
        );

        expect(combobox).toBeInTheDocument();
      });
    });

    describe('Is Invalid, with a helpful message', () => {
      it('it renders the helpful message', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            error="Helpful message"
            value="chocolate"
          />
        );

        expect(screen.getByText('Helpful message')).toBeInTheDocument();
      });
    });

    describe('Is Clearable', () => {
      it('it does not render the X icon if input has value but is not clearable', () => {
        const mockedHandleChange = jest.fn();

        const { container } = render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            value={selectOptions[0]}
            isClearable={false}
          />
        );

        expect(
          container.querySelector('.react-select__clear-indicator')
        ).not.toBeInTheDocument();
      });

      it('it renders the X icon if input has value and is clearable', () => {
        const mockedHandleChange = jest.fn();

        const { container } = render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            value={selectOptions[0]}
            isClearable
          />
        );

        expect(
          container.querySelector('.react-select__clear-indicator')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Sizes', () => {
    const mockedHandleChange = jest.fn();
    const sizes: TextInputSize[] = ['sm', 'md', 'lg'];

    const breakpoints = ['tablet', 'desktop', 'hd'];

    sizes.forEach((size) => {
      it(`it has a ${size} class applied to it`, () => {
        const { container } = render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            options={selectOptions}
            value={selectOptions[0].value}
            size={size}
            label="size test"
          />
        );

        expect(container.children[0].getAttribute('class')).toContain(size);
      });

      breakpoints.forEach((breakpoint) => {
        it(`it applies responsive classes for breakpoint: ${breakpoint} and size: ${size}`, () => {
          const { container } = render(
            <SelectInput
              id="testId"
              onChange={mockedHandleChange}
              options={selectOptions}
              value={selectOptions[0].value}
              size={{ [breakpoint]: size }}
              label="size test"
            />
          );

          expect(container.children[0].getAttribute('class')).toContain(
            `size-${size}-${breakpoint}`
          );
        });
      });
    });

    it('It applies responsive classes when multiple are applied', () => {
      const { container } = render(
        <SelectInput
          id="testId"
          onChange={mockedHandleChange}
          options={selectOptions}
          value={selectOptions[0].value}
          size={{
            base: 'sm',
            tablet: 'md',
            desktop: 'lg',
            hd: 'sm',
          }}
          label="size test"
        />
      );

      expect(container.children[0].getAttribute('class')).toContain('size-sm');
      expect(container.children[0].getAttribute('class')).toContain(
        'size-md-tablet'
      );
      expect(container.children[0].getAttribute('class')).toContain(
        'size-lg-desktop'
      );
      expect(container.children[0].getAttribute('class')).toContain(
        'size-sm-hd'
      );
    });
  });
});
