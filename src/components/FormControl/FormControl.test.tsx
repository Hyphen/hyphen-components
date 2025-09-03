import { render, screen } from '@testing-library/react';
import React from 'react';
import { FormControl } from './FormControl';

describe('FormControl', () => {
  test('renders label and error message', () => {
    render(
      <FormControl id="input" label="Label" error="Error">
        <input id="input" />
      </FormControl>
    );

    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('hides label when hideLabel is true', () => {
    render(
      <FormControl id="input" label="Label" hideLabel>
        <input id="input" />
      </FormControl>
    );

    expect(screen.queryByText('Label')).toBeNull();
  });
});
