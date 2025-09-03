import { render, screen } from '@testing-library/react';
import React from 'react';
import { InputValidationMessage } from './InputValidationMessage';

describe('InputValidationMessage', () => {
  test('renders message with default size', () => {
    render(<InputValidationMessage>Oops</InputValidationMessage>);
    const msg = screen.getByText('Oops');
    expect(msg).toBeInTheDocument();
    expect(msg).toHaveClass('font-size-sm');
  });

  test('supports different sizes', () => {
    render(<InputValidationMessage size="md">Big</InputValidationMessage>);
    const msg = screen.getByText('Big');
    expect(msg).toHaveClass('font-size-md');
  });
});
