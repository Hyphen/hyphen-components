import React from 'react';
import { render } from '@testing-library/react';
import { ModalBody } from './ModalBody';

describe('ModalBody', () => {
  test('renders its children', () => {
    const { getByText } = render(<ModalBody>test modal</ModalBody>);
    expect(getByText('test modal')).toBeInTheDocument();
  });

  test('flex-auto class is applied by default', () => {
    const { container } = render(<ModalBody>test modal</ModalBody>);
    expect(container.children[0].classList).toContain('flex-auto');
  });

  test('applies custom overflow value', () => {
    const { container } = render(
      <ModalBody overflow="hidden">test modal</ModalBody>
    );
    expect(container.children[0].classList).toContain('overflow-hidden');
  });

  test('applies custom height value', () => {
    const { container } = render(
      <ModalBody height="200px">test modal</ModalBody>
    );
    expect((container.children[0] as HTMLElement).style.height).toBe('200px');
  });

  test('applies additional props to Box component', () => {
    const { container } = render(
      <ModalBody data-testid="modal-body">test modal</ModalBody>
    );
    expect(container.children[0].getAttribute('data-testid')).toBe(
      'modal-body'
    );
  });
});
