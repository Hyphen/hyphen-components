import { render } from '@testing-library/react';
import React from 'react';
import { AspectRatio } from './AspectRatio';

describe('AspectRatio', () => {
  test('renders children within the aspect ratio box', () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <div data-testid="child" />
      </AspectRatio>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.querySelector('[data-testid="child"]')).toBeInTheDocument();
    expect(wrapper.style.position).toBe('relative');
  });
});
