import { Switch, SwitchSize } from './Switch';
import { fireEvent, render } from '@testing-library/react';

import React from 'react';

const SWITCH_SIZES: SwitchSize[] = ['sm', 'md', 'lg'];

describe('Switch', () => {
  test('not disabled, checked, or invalid by default', () => {
    const { getByLabelText } = render(
      <Switch
        id="testSwitch"
        label="test switch"
        isChecked={false}
        onChange={() => null}
      />
    );
    const switchElement = getByLabelText('test switch') as HTMLInputElement;

    expect(switchElement.checked).toBe(false);
    expect(switchElement.disabled).toBe(false);
    expect(switchElement.getAttribute('aria-invalid')).toBe('false');
  });

  test('input is checked when isChecked is true', () => {
    const { getByLabelText } = render(
      <Switch
        id="testSwitch"
        label="test switch"
        onChange={() => null}
        isChecked
      />
    );
    const switchElement = getByLabelText('test switch') as HTMLInputElement;
    expect(switchElement.checked).toEqual(true);
  });

  test('input is not checked when isChecked is false', () => {
    const { getByLabelText } = render(
      <Switch
        id="testSwitch"
        label="test switch"
        isChecked={false}
        onChange={() => null}
      />
    );
    const switchElement = getByLabelText('test switch') as HTMLInputElement;
    expect(switchElement.checked).toEqual(false);
  });

  test('assigns the "aria-labelledby" attribute', () => {
    const { getByLabelText } = render(
      <Switch
        isChecked={false}
        id="testInput"
        label="test label"
        onChange={() => null}
      />
    );
    expect(getByLabelText('test label')).toHaveAttribute(
      'aria-labelledby',
      'testInputLabel'
    );
  });

  test('aria-label is assigned if label is hidden', () => {
    const { getByLabelText } = render(
      <Switch
        isChecked={false}
        id="testInput"
        label="hidden test label"
        hideLabel
        onChange={() => null}
      />
    );
    expect(getByLabelText('hidden test label')).toBeInTheDocument();
  });

  test('HelpText is rendered when set', () => {
    const { getByText } = render(
      <Switch
        isChecked={false}
        id="testInput"
        label="test label"
        helpText="help text"
        onChange={() => null}
      />
    );
    expect(getByText('help text')).toBeInTheDocument();
  });

  describe('error states', () => {
    test('renders error message if error exists and is not true', () => {
      const { getByText } = render(
        <Switch
          id="testSwitch"
          label="test switch"
          isChecked={false}
          onChange={() => null}
          error="This is the error message"
        />
      );
      expect(getByText('This is the error message')).toBeInTheDocument();
    });
  });

  test('controlled - check and unchecked when clicked', () => {
    const ControlledSwitch = () => {
      const [checked, setChecked] = React.useState(false);
      return (
        <Switch
          id="testSwitch"
          label="test switch"
          isChecked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
      );
    };

    const { getByLabelText, container } = render(<ControlledSwitch />);

    const input = container.querySelector('input');

    expect(input).not.toBeChecked();

    const switchElement = getByLabelText('test switch');
    fireEvent.click(switchElement);

    expect(input).toBeChecked();

    fireEvent.click(switchElement);

    expect(input).not.toBeChecked();
  });

  describe('onChange', () => {
    test('onChange event fires callback function', () => {
      const mockedHandleChange = jest.fn(() => null);

      const { getByLabelText } = render(
        <Switch
          id="testSwitch"
          label="test switch"
          isChecked={false}
          onChange={mockedHandleChange}
        />
      );
      const switchElement = getByLabelText('test switch');
      fireEvent.click(switchElement);
      expect(mockedHandleChange).toHaveBeenCalledTimes(1);
    });

    test('calls onChange and passes checked value in event', () => {
      let value = true;
      const mockedHandleChange = jest.fn((event) => {
        value = event.target.checked;
      });

      const { getByLabelText } = render(
        <Switch
          id="testSwitch"
          label="test switch"
          onChange={mockedHandleChange}
          isChecked={value}
        />
      );
      const switchElement = getByLabelText('test switch');
      fireEvent.click(switchElement);
      expect(mockedHandleChange).toBeCalledTimes(1);
      expect(value).toBe(false);
    });
  });

  describe('onFocus', () => {
    test('onFocus event fires callback function if defined', () => {
      const mockedHandleFocus = jest.fn(() => null);

      const { getByText, getByLabelText } = render(
        <div>
          <button type="button">focus</button>
          <Switch
            id="testSwitch"
            label="test switch"
            isChecked={false}
            onChange={() => null}
            onFocus={mockedHandleFocus}
            onBlur={undefined}
          />
        </div>
      );
      getByLabelText('test switch').focus();
      getByText('focus').focus();
      expect(mockedHandleFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur', () => {
    test('onBlur event fires callback function if defined', () => {
      const mockedHandleBlur = jest.fn(() => null);

      const { getByText, getByLabelText } = render(
        <div>
          <button type="button">focus</button>
          <Switch
            id="testSwitch"
            label="test switch"
            isChecked={false}
            onChange={() => null}
            onBlur={mockedHandleBlur}
          />
        </div>
      );
      getByLabelText('test switch').focus();
      getByText('focus').focus();
      expect(mockedHandleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Sizes', () => {
    const breakpoints = ['tablet', 'desktop', 'hd'];

    SWITCH_SIZES.forEach((size) => {
      test(`it has a ${size} class applied to the switch thumb and track`, () => {
        const { getByTestId } = render(
          <Switch
            id="testSwitch"
            label={`test ${size} switch`}
            isChecked={false}
            onChange={() => null}
            size={size}
          />
        );

        expect(getByTestId('switchTrack').getAttribute('class')).toContain(
          `track-size-${size}`
        );
        expect(getByTestId('switchThumb').getAttribute('class')).toContain(
          `thumb-size-${size}`
        );
      });

      breakpoints.forEach((breakpoint) => {
        test(`it applies responsive classes for breakpoint: ${breakpoint} and size: ${size}`, () => {
          const { getByTestId } = render(
            <Switch
              id="testSwitch"
              label={`test ${size} switch`}
              isChecked={false}
              onChange={() => null}
              size={{ [breakpoint]: size }}
            />
          );

          expect(getByTestId('switchTrack').getAttribute('class')).toContain(
            `track-size-${size}-${breakpoint}`
          );
          expect(getByTestId('switchThumb').getAttribute('class')).toContain(
            `thumb-size-${size}-${breakpoint}`
          );
        });
      });
    });

    test('It applies responsive classes when multiple are applied', () => {
      const { getByTestId } = render(
        <Switch
          id="testSwitch"
          label={`test switch`}
          isChecked={false}
          onChange={() => null}
          size={{
            base: 'sm',
            tablet: 'md',
            desktop: 'lg',
            hd: 'sm',
          }}
        />
      );

      expect(getByTestId('switchTrack').getAttribute('class')).toContain(
        'track-size-sm'
      );
      expect(getByTestId('switchTrack').getAttribute('class')).toContain(
        'track-size-md-tablet'
      );
      expect(getByTestId('switchTrack').getAttribute('class')).toContain(
        'track-size-lg-desktop'
      );
      expect(getByTestId('switchTrack').getAttribute('class')).toContain(
        'track-size-sm-hd'
      );
      expect(getByTestId('switchThumb').getAttribute('class')).toContain(
        'thumb-size-sm'
      );
      expect(getByTestId('switchThumb').getAttribute('class')).toContain(
        'thumb-size-md-tablet'
      );
      expect(getByTestId('switchThumb').getAttribute('class')).toContain(
        'thumb-size-lg-desktop'
      );
      expect(getByTestId('switchThumb').getAttribute('class')).toContain(
        'thumb-size-sm-hd'
      );
    });
  });
});
