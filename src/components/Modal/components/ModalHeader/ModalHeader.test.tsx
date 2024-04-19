import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import { ModalHeader } from './ModalHeader';

describe('ModalHeader', () => {
  test('renders a title if provided', () => {
    const { getByText } = render(
      <ModalHeader id="modal" title="modal title" />
    );
    expect(getByText('modal title')).toBeInTheDocument();
  });

  test('renders close button if onDismiss is set', () => {
    render(<ModalHeader id="modal" onDismiss={() => null} />);
    expect(screen.getByLabelText('close')).toBeDefined();
  });

  test('clicking the close button fires onDismiss', () => {
    const mockOnDismiss = jest.fn();
    render(<ModalHeader id="modal" onDismiss={mockOnDismiss} />);
    fireEvent.click(screen.getByLabelText('close'));
    expect(mockOnDismiss).toBeCalledTimes(1);
  });

  test('xl padding class is applied by default', () => {
    const { container } = render(<ModalHeader id="modal" />);
    expect(container.children[0].classList).toContain('p-xl');
  });
});
