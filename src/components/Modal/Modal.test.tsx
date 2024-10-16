import React from 'react';
import { render } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  test('renders its children', () => {
    const { getByText } = render(
      <Modal isOpen onDismiss={() => {}} ariaLabel="testDefault">
        test modal
      </Modal>
    );
    expect(getByText('test modal')).toBeInTheDocument();
  });

  test('it open and closes based on isOpen prop', () => {
    const { queryByText, getByText, rerender } = render(
      <Modal isOpen={false} onDismiss={() => {}} ariaLabel="testIsOpen">
        test modal
      </Modal>
    );

    expect(queryByText('test modal')).toBe(null);

    rerender(
      <Modal isOpen onDismiss={() => {}} ariaLabel="testIsOpen">
        test modal
      </Modal>
    );

    expect(getByText('test modal')).toBeInTheDocument();
  });

  test('Subcomponents', () => {
    const { getByText } = render(
      <Modal isOpen onDismiss={() => {}} ariaLabel="testSubcomponents">
        <Modal.Header
          id="titleFooterBody"
          title="The Modal Title"
          onDismiss={() => {}}
        />
        <Modal.Body>Modal body content</Modal.Body>
        <Modal.Footer>This is content in the modal footer</Modal.Footer>
      </Modal>
    );

    expect(getByText('The Modal Title')).toBeInTheDocument();
    expect(getByText('Modal body content')).toBeInTheDocument();
    expect(
      getByText('This is content in the modal footer')
    ).toBeInTheDocument();
  });

  test('applies maxWidth styles', () => {
    const { getByLabelText } = render(
      <Modal
        isOpen
        onDismiss={() => {}}
        ariaLabel="testMaxWidth"
        maxWidth="500px"
      >
        test modal
      </Modal>
    );

    expect(getByLabelText('testMaxWidth').parentElement).toHaveStyle(
      'max-width: 500px'
    );
  });

  test('applies aria-labelledby attribute', () => {
    const { getByLabelText } = render(
      <Modal
        isOpen
        onDismiss={() => {}}
        ariaLabelledBy="modalTitle"
        ariaLabel="testAriaLabelledBy"
      >
        <h1 id="modalTitle">Modal Title</h1>
        test modal
      </Modal>
    );

    expect(getByLabelText('testAriaLabelledBy')).toHaveAttribute(
      'aria-labelledby',
      'modalTitle'
    );
  });
});
