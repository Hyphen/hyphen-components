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
    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  test('does not render title if not provided', () => {
    const { queryByText } = render(<ModalHeader id="modal" />);
    expect(queryByText('modal title')).toBeNull();
  });

  test('does not render close button if onDismiss is not set', () => {
    render(<ModalHeader id="modal" />);
    expect(screen.queryByLabelText('close')).toBeNull();
  });

  test('renders with correct id for title', () => {
    const { getByText } = render(
      <ModalHeader id="modal-title" title="modal title" />
    );
    expect(getByText('modal title').id).toBe('modal-title');
  });

  test('renders with correct styles', () => {
    const { container } = render(
      <ModalHeader id="modal" title="modal title" />
    );
    expect(container.firstChild).toHaveStyle('flex-shrink: 0');
  });
});
