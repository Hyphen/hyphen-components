import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';
import { ALERT_VARIANTS } from './Alert.constants';

describe('Alert', () => {
  describe('Default', () => {
    test('It renders an alert with a simple text message', () => {
      const message = 'Hello world!';
      render(<Alert message={message} />);

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
          <Alert variant={variant} message={variant} key={variant} />
        );
        expect(getByRole('alert').classList).toContain(`alert__${variant}`);
      })
    );
  });

  describe('Custom Class', () => {
    test('It renders with a custom class if provided', () => {
      const message = 'Hello world!';
      render(<Alert message={message} className="custom-class" />);

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

      const { rerender } = render(<Alert message={message} />);

      variants.forEach((variant) => {
        rerender(<Alert message={message} variant={variant} hasIcon />);
        const alertIcon = screen.getByTestId(`alert-icon-${variant}-test-id`);
        expect(alertIcon).toBeInTheDocument();
      });
    });
  });

  describe('With Title', () => {
    test('It renders an alert with a title if passed', () => {
      const message = 'Hello world!';
      const title = 'title';
      render(<Alert title={title} message={message} />);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      const alertTitle = screen.getByText(title);
      expect(alertTitle).toBeInTheDocument();
    });
  });

  describe('With Custom JSX', () => {
    test('It renders custom JSX if passed to the message prop', () => {
      const jsxMessage: ReactNode = (
        <button type="button">I am a button!</button>
      );

      render(<Alert message={jsxMessage} />);

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

    test('Render prop supersedes message prop', () => {
      const jsxRenderProp = (): ReactNode => (
        <button type="button">I am a button!</button>
      );
      const message = 'Hello world!';

      render(<Alert render={jsxRenderProp} message={message} />);

      const alertButton = screen.getByRole('button');
      expect(alertButton).toBeInTheDocument();
      expect(alertButton.textContent).toBe('I am a button!');

      expect(screen.queryByText(message)).not.toBeInTheDocument();
    });
  });

  describe('Compact', () => {
    test('It renders with the compact class when isCompact prop is true', () => {
      const message = 'Hello world!';
      render(<Alert message={message} isCompact />);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('p-md');
    });
  });
});
