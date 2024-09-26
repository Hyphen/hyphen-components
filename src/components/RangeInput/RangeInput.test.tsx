import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { InputRangeProps, RangeInput } from './RangeInput';

describe('RangeInput', () => {
  const defaultProps: InputRangeProps = {
    id: 'test-range',
    value: 50,
    max: 100,
    onChange: jest.fn(),
  };

  test('should render the range input with correct attributes', () => {
    render(<RangeInput {...defaultProps} />);
    const rangeInput = screen.getByRole('slider');

    expect(rangeInput).toBeInTheDocument();
    expect(rangeInput).toHaveAttribute('id', 'test-range');
    expect(rangeInput).toHaveAttribute('type', 'range');
    expect(rangeInput).toHaveAttribute('min', '0');
    expect(rangeInput).toHaveAttribute('value', '50');
    expect(rangeInput).toHaveAttribute('max', '100');
  });

  test('should update the value when changed', async () => {
    const onChangeMock = jest.fn();
    render(<RangeInput {...defaultProps} onChange={onChangeMock} />);
    const rangeInput = screen.getByRole('slider');

    await fireEvent.change(rangeInput, { target: { value: '75' } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
