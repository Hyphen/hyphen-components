import { render, screen } from '@testing-library/react';
import React from 'react';
import { HelpText } from './HelpText';

describe('HelpText', () => {
  test('renders children with correct class', () => {
    render(<HelpText>Helpful</HelpText>);
    const text = screen.getByText('Helpful');
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass('help-text');
  });
});
