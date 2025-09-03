import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  test('changes state when clicked', () => {
    render(<Toggle>Bold</Toggle>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-state', 'off');
    fireEvent.click(button);
    expect(button).toHaveAttribute('data-state', 'on');
  });
});

