import React from 'react';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './Button.constants';
import { Button, ButtonVariant } from './Button';
import { fireEvent, render, screen } from '@testing-library/react';

const renderButton = (props = {}) => render(<Button {...props} />);
const getButton = (text: string): HTMLButtonElement =>
  screen.getByText(text).closest('button') as HTMLButtonElement;

describe('Button', () => {
  describe('Disabled states', () => {
    test('supports controlled isLoading state', () => {
      const { rerender } = renderButton({
        isLoading: true,
        children: 'Loading Button',
      });
      const button = getButton('Loading Button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toBeDisabled();

      rerender(<Button isLoading={false}>Loading Button</Button>);
      expect(button).not.toHaveAttribute('aria-disabled');
      expect(button).not.toBeDisabled();
    });

    test('supports controlled isDisabled state', () => {
      const { rerender } = renderButton({
        isDisabled: true,
        children: 'Disabled Button',
      });
      const button = getButton('Disabled Button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toBeDisabled();

      rerender(<Button isDisabled={false}>Disabled Button</Button>);
      expect(button).not.toHaveAttribute('aria-disabled');
      expect(button).not.toBeDisabled();
    });
  });

  describe('With Icon', () => {
    test('renders an icon prefix if specified', () => {
      renderButton({ iconPrefix: 'alarm', children: 'Alarm Button' });
      expect(screen.getByTestId('prefixIcon')).toBeInTheDocument();
    });

    test('renders an icon suffix if specified', () => {
      renderButton({ iconSuffix: 'alarm', children: 'Alarm Button' });
      expect(screen.getByTestId('suffixIcon')).toBeInTheDocument();
    });

    test('renders icon prefix and suffix if specified', () => {
      renderButton({
        iconPrefix: 'alarm',
        iconSuffix: 'check',
        children: 'Suffix Prefix Icon Button',
      });
      expect(screen.getByTestId('prefixIcon')).toBeInTheDocument();
      expect(screen.getByTestId('suffixIcon')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    BUTTON_SIZES.forEach((size) => {
      test(`it has a ${size} class applied to it`, () => {
        renderButton({ size, children: `${size} Button` });
        const btn = getButton(`${size} Button`);
        expect(btn).toHaveClass(`size-${size}`);
      });
    });

    test('applies responsive classes', () => {
      renderButton({
        size: { base: 'lg', tablet: 'sm', desktop: 'md', hd: 'lg' },
        children: 'button',
      });
      const btn = getButton('button');
      expect(btn).toHaveClass(
        'size-lg',
        'size-sm-tablet',
        'size-md-desktop',
        'size-lg-hd'
      );
    });
  });

  describe('Variants', () => {
    BUTTON_VARIANTS.forEach((variant) => {
      test(`it has a ${variant} class applied to it`, () => {
        renderButton({ variant, children: `${variant} Button` });
        const btn = getButton(`${variant} Button`);
        expect(btn).toHaveClass(variant);
      });
    });
  });

  describe('Callback Handling', () => {
    describe('onClick', () => {
      test('fires onClick callback', () => {
        const mockedHandleClick = jest.fn();
        renderButton({ onClick: mockedHandleClick, children: 'Click' });
        const buttonElement: HTMLButtonElement = getButton('Click');
        fireEvent.click(buttonElement);
        expect(mockedHandleClick).toHaveBeenCalledTimes(1);
      });

      test('does not fire onClick callback when disabled', () => {
        const mockedHandleClick = jest.fn();
        renderButton({
          onClick: mockedHandleClick,
          children: 'Click',
          isDisabled: true,
        });
        const buttonElement: HTMLButtonElement = getButton('Click');
        fireEvent.click(buttonElement);
        expect(mockedHandleClick).toHaveBeenCalledTimes(0);
      });

      test('does not fire function if onClick callback not provided', () => {
        const mockedHandleClick = jest.fn();
        renderButton({ children: 'Click' });
        const buttonElement = getButton('Click');
        fireEvent.click(buttonElement);
        expect(mockedHandleClick).toHaveBeenCalledTimes(0);
      });

      test('prevents default event behavior if specified by onClick', () => {
        const mockedHandleClick = jest.fn((event) => event.preventDefault());
        const mockedNavigate = jest.fn();
        renderButton({
          navigate: mockedNavigate,
          onClick: mockedHandleClick,
          children: 'Click',
        });
        const buttonElement = getButton('Click');
        fireEvent.click(buttonElement);
        expect(mockedHandleClick).toHaveBeenCalledTimes(1);
        expect(mockedNavigate).not.toBeCalled();
      });
    });

    describe('onFocus', () => {
      test('fires onFocus callback', () => {
        const mockedHandleFocus = jest.fn();
        renderButton({ onFocus: mockedHandleFocus, children: 'Focus' });
        const buttonElement = getButton('Focus');
        fireEvent.focus(buttonElement);
        expect(mockedHandleFocus).toHaveBeenCalledTimes(1);
      });

      test('does not fire onFocus callback when disabled', () => {
        const mockedHandleFocus = jest.fn();
        renderButton({
          onFocus: mockedHandleFocus,
          children: 'Focus',
          isDisabled: true,
        });
        const buttonElement = getButton('Focus');
        fireEvent.focus(buttonElement);
        expect(mockedHandleFocus).toHaveBeenCalledTimes(0);
      });

      test('does not fire function if onFocus callback not provided', () => {
        const mockedHandleFocus = jest.fn();
        renderButton({ children: 'Focus' });
        const buttonElement = getButton('Focus');
        fireEvent.focus(buttonElement);
        expect(mockedHandleFocus).toHaveBeenCalledTimes(0);
      });
    });

    describe('onBlur', () => {
      test('fires onBlur callback', () => {
        const mockedHandleBlur = jest.fn();
        renderButton({ onBlur: mockedHandleBlur, children: 'Blur' });
        const buttonElement = getButton('Blur');
        fireEvent.blur(buttonElement);
        expect(mockedHandleBlur).toHaveBeenCalledTimes(1);
      });

      test('does not fire onBlur callback when disabled', () => {
        const mockedHandleBlur = jest.fn();
        renderButton({
          onBlur: mockedHandleBlur,
          children: 'Blur',
          isDisabled: true,
        });
        const buttonElement = getButton('Blur');
        fireEvent.blur(buttonElement);
        expect(mockedHandleBlur).toHaveBeenCalledTimes(0);
      });

      test('does not fire onBlur callback if not provided', () => {
        const mockedHandleBlur = jest.fn();
        renderButton({ children: 'Blur' });
        const buttonElement = getButton('Blur');
        fireEvent.blur(buttonElement);
        expect(mockedHandleBlur).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('States', () => {
    describe('Default', () => {
      test('renders the button with simple text', () => {
        renderButton({ children: 'Button!' });
        const buttonElement = screen.getByText('Button!');
        expect(buttonElement).toBeInTheDocument();
      });

      test('renders the button with nested DOM nodes', () => {
        renderButton({
          children: (
            <div className="buttonLoadingIndicator">
              <div>I'm a nested DOM node!</div>
            </div>
          ),
        });
        const buttonElement = screen.getByText("I'm a nested DOM node!");
        expect(buttonElement).toBeInTheDocument();
      });

      test('does not have a disabled attribute', () => {
        renderButton({ children: 'Not Disabled Button' });
        expect(getButton('Not Disabled Button')).not.toBeDisabled();
      });

      test('renders an empty button when no children are passed', () => {
        renderButton();
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toBeEmptyDOMElement();
      });
    });

    describe('Full Width', () => {
      test('has a fullWidth class applied to it', () => {
        renderButton({ fullWidth: true, children: 'Full Width Button' });
        const fullWidthBtn = getButton('Full Width Button');
        expect(fullWidthBtn).toHaveClass('full-width');
      });
    });

    describe('Custom ClassName', () => {
      test('adds custom className to the button', () => {
        renderButton({
          className: 'custom-class',
          children: 'Custom ClassName',
        });
        const customClassNameBtn = getButton('Custom ClassName');
        expect(customClassNameBtn).toHaveClass('custom-class');
      });
    });

    describe('Disabled', () => {
      test('has a disabled attribute', () => {
        renderButton({ isDisabled: true, children: 'Disabled Button' });
        expect(getButton('Disabled Button')).toBeDisabled();
      });

      test('applies aria-disabled attribute when button is disabled', () => {
        renderButton({ isDisabled: true, children: 'Aria Disabled Button' });
        const buttonElement = getButton('Aria Disabled Button');
        expect(buttonElement).toHaveAttribute('aria-disabled', 'true');
      });
    });

    describe('Loading', () => {
      test('renders the spinning loading indicator', () => {
        renderButton({ isLoading: true, children: 'Button is loading' });
        const spinnerElement = document.getElementsByClassName('spinner')[0];
        expect(spinnerElement).toBeInTheDocument();
      });

      test('renders the grey spinning indicator if button variant is secondary', () => {
        renderButton({
          isLoading: true,
          variant: 'secondary',
          children: 'Button is loading',
        });
        const spinnerElement = document.getElementsByClassName('spinner')[0];
        expect(spinnerElement).toBeInTheDocument();
      });

      test('keeps the button text in the DOM so the button width does not change', () => {
        renderButton({ isLoading: true, children: 'Button is loading' });
        expect(screen.getByText('Button is loading')).toBeInTheDocument();
      });

      test('renders white spinning indicator when button is primary', () => {
        renderButton({
          isLoading: true,
          variant: 'primary',
          children: 'Button is loading',
        });
        const spinnerElement = document.getElementsByClassName('spinner')[0];
        expect(spinnerElement).toBeInTheDocument();
      });

      test('renders white spinning indicator when button is danger', () => {
        renderButton({
          isLoading: true,
          variant: 'danger',
          children: 'Button is loading',
        });
        const spinnerElement = document.getElementsByClassName('spinner')[0];
        expect(spinnerElement).toBeInTheDocument();
      });
    });

    describe('Disabled and Loading', () => {
      test('has a disabled attribute', () => {
        renderButton({
          isDisabled: true,
          isLoading: true,
          children: 'Disabled and Loading Button',
        });
        expect(getButton('Disabled and Loading Button')).toBeDisabled();
      });
    });

    describe('Color Variations', () => {
      test('renders button with default variant primary', () => {
        renderButton({ children: 'primary' });
        expect(getButton('primary')).toHaveClass('primary');
      });

      const variants: ButtonVariant[] = [
        'primary',
        'secondary',
        'tertiary',
        'danger',
      ];
      variants.forEach((variant) => {
        test(`renders component with variant: ${variant} when passed`, () => {
          renderButton({ variant, children: variant });
          expect(getButton(variant)).toHaveClass(variant);
        });
      });
    });
  });

  describe('Role Attribute', () => {
    test('applies role attribute', () => {
      renderButton({ role: 'button', children: 'Button with Role' });
      const buttonElement = getButton('Button with Role');
      expect(buttonElement).toHaveAttribute('role', 'button');
    });
  });
  describe('Aria Attributes', () => {
    test('applies aria-label attribute', () => {
      renderButton({ 'aria-label': 'Aria Label Button', children: 'Button' });
      const buttonElement = getButton('Button');
      expect(buttonElement).toHaveAttribute('aria-label', 'Aria Label Button');
    });

    test('applies aria-labelledby attribute', () => {
      renderButton({ 'aria-labelledby': 'label-id', children: 'Button' });
      const buttonElement = getButton('Button');
      expect(buttonElement).toHaveAttribute('aria-labelledby', 'label-id');
    });
  });

  describe('Shadow Prop', () => {
    test('applies shadow class when shadow prop is provided', () => {
      renderButton({ shadow: 'lg', children: 'Shadow Button' });
      const buttonElement = getButton('Shadow Button');
      expect(buttonElement).toHaveClass('shadow-lg');
    });

    test('applies responsive shadow classes', () => {
      renderButton({
        shadow: { base: 'sm', tablet: 'md', desktop: 'lg' },
        children: 'Responsive Shadow Button',
      });
      const buttonElement = getButton('Responsive Shadow Button');
      expect(buttonElement).toHaveClass(
        'shadow-sm',
        'shadow-md-tablet',
        'shadow-lg-desktop'
      );
    });
  });

  describe('As Child', () => {
    test('renders as a different component when asChild is true', () => {
      renderButton({
        asChild: true,
        children: <a href="https://ux.hyphen.ai">Link Button</a>,
      });
      const linkElement = screen.getByRole('link');
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', 'https://ux.hyphen.ai');
    });

    test('does not render type prop when asChild is true', () => {
      renderButton({
        asChild: true,
        children: <a href="https://ux.hyphen.ai">Link Button</a>,
      });
      const linkElement = screen.getByRole('link');
      expect(linkElement).not.toHaveAttribute('type');
    });
  });

  describe('Button Type', () => {
    test('renders with type button', () => {
      renderButton({ children: 'Default Type Button', type: 'button' });
      const buttonElement = getButton('Default Type Button');
      expect(buttonElement).toHaveAttribute('type', 'button');
    });

    test('renders with type submit when specified', () => {
      renderButton({ type: 'submit', children: 'Submit Button' });
      const buttonElement = getButton('Submit Button');
      expect(buttonElement).toHaveAttribute('type', 'submit');
    });

    test('renders with type reset when specified', () => {
      renderButton({ type: 'reset', children: 'Reset Button' });
      const buttonElement = getButton('Reset Button');
      expect(buttonElement).toHaveAttribute('type', 'reset');
    });
  });

  describe('Button Ref', () => {
    test('forwards ref to the button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      renderButton({ ref, children: 'Button with Ref' });
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
