import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

describe('ToggleGroup', () => {
  test('handles selection and displays error message', () => {
    render(
      <ToggleGroup type="single" variant="outline" error="Error">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    );

    const item = screen.getByText('A');
    expect(item).toHaveClass('outline');
    fireEvent.click(item);
    expect(item).toHaveAttribute('data-state', 'on');
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
