/* eslint-disable react/no-array-index-key */
import React from 'react';
import { render } from '@testing-library/react';
import { CardFooter } from './CardFooter';

describe('Card/CardFooter', () => {
  test('lg padding class is applied by default', () => {
    const { getByText } = render(<CardFooter>Test Box</CardFooter>);
    expect(getByText('Test Box').classList).toContain('p-2xl');
  });
});
