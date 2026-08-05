import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';
import { ALERT_VARIANTS } from './Alert.constants';

describe('Alert', () => {
  describe('Default', () => {
    test('It renders an alert with a simple text message', () => {
      const message = 'Hello world!';
      render(<Alert>{message}</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      const alertMessage = screen.getByText(message);
      expect(alertMessage).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    ALERT_VARIANTS.map((variant, index) =>
      test(`renders variant background color ${ALERT_VARIANTS[index]}`, () => {
        const { getByRole } = render(
          <Alert variant={variant} key={variant}>
            {variant}
          </Alert>
        );
        expect(getByRole('alert').classList).toContain(`alert__${variant}`);
      })
    );
  });

  describe('Custom Class', () => {
    test('It renders with a custom class if provided', () => {
      const message = 'Hello world!';
      render(<Alert className="custom-class">{message}</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('custom-class');
    });
  });

  describe('With Icon', () => {
    test('It shows a relevant icon when passed the `hasIcon` prop', () => {
      const message = 'Hello world!';
      const variants = [
        'info' as const,
        'success' as const,
        'warning' as const,
        'danger' as const,
      ];

      const { rerender } = render(<Alert>{message}</Alert>);

      variants.forEach((variant) => {
        rerender(
          <Alert variant={variant} hasIcon>
            {message}
          </Alert>
        );
        const alertIcon = screen.getByTestId(`alert-icon-${variant}-test-id`);
        expect(alertIcon).toBeInTheDocument();
      });
    });
  });

  describe('With Title', () => {
    test('It renders an alert with a title if passed', () => {
      const message = 'Hello world!';
      const title = 'title';
      render(<Alert title={title}>{message}</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      const alertTitle = screen.getByText(title);
      expect(alertTitle).toBeInTheDocument();
    });
  });

  describe('With Custom JSX', () => {
    test('It renders custom JSX if passed as children', () => {
      const jsxMessage: ReactNode = (
        <button type="button">I am a button!</button>
      );

      render(<Alert>{jsxMessage}</Alert>);

      const alertButton = screen.getByRole('button');
      expect(alertButton).toBeInTheDocument();
      expect(alertButton.textContent).toBe('I am a button!');
    });

    test('It renders custom JSX if a render prop is passed with a render function', () => {
      const jsxRenderProp = (): ReactNode => (
        <button type="button">I am a button!</button>
      );

      render(<Alert render={jsxRenderProp} />);

      const alertButton = screen.getByRole('button');
      expect(alertButton).toBeInTheDocument();
      expect(alertButton.textContent).toBe('I am a button!');
    });

    test('Render prop supersedes children', () => {
      const jsxRenderProp = (): ReactNode => (
        <button type="button">I am a button!</button>
      );
      const message = 'Hello world!';

      render(<Alert render={jsxRenderProp}>{message}</Alert>);

      const alertButton = screen.getByRole('button');
      expect(alertButton).toBeInTheDocument();
      expect(alertButton.textContent).toBe('I am a button!');

      expect(screen.queryByText(message)).not.toBeInTheDocument();
    });
  });

  describe('Compact', () => {
    test('It renders with the compact class when isCompact prop is true', () => {
      const message = 'Hello world!';
      render(<Alert isCompact>{message}</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('p-md');
    });
  });
});
