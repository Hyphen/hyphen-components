import React from 'react';
import { render } from '@testing-library/react';
import { ModalFooter } from './ModalFooter';

describe('ModalFooter', () => {
  test('renders its children', () => {
    const { getByText } = render(<ModalFooter>test modal</ModalFooter>);
    expect(getByText('test modal')).toBeInTheDocument();
  });

  test('row direction class is applied by default', () => {
    const { container } = render(<ModalFooter>test modal</ModalFooter>);
    expect(container.firstChild).toHaveClass('flex-direction-row');
  });

  test('align-items center class is applied by default', () => {
    const { container } = render(<ModalFooter>test modal</ModalFooter>);
    expect(container.firstChild).toHaveClass('align-items-center');
  });

  test('justify content flex-end class is applied by default', () => {
    const { container } = render(<ModalFooter>test modal</ModalFooter>);
    expect(container.firstChild).toHaveClass('justify-content-flex-end');
  });

  test('applies custom padding', () => {
    const { container } = render(
      <ModalFooter padding="lg">test modal</ModalFooter>
    );
    expect(container.firstChild).toHaveStyle('padding: lg');
  });

  test('applies custom direction', () => {
    const { container } = render(
      <ModalFooter direction="column">test modal</ModalFooter>
    );
    expect(container.firstChild).toHaveClass('flex-direction-column');
  });

  test('applies custom alignItems', () => {
    const { container } = render(
      <ModalFooter alignItems="flex-start">test modal</ModalFooter>
    );
    expect(container.firstChild).toHaveClass('align-items-flex-start');
  });

  test('applies custom justifyContent', () => {
    const { container } = render(
      <ModalFooter justifyContent="center">test modal</ModalFooter>
    );
    expect(container.firstChild).toHaveClass('justify-content-center');
  });

  test('applies custom gap', () => {
    const { container } = render(
      <ModalFooter gap="lg">test modal</ModalFooter>
    );
    expect(container.firstChild).toHaveClass('g-lg');
  });

  test('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = render(
      <ModalFooter style={customStyle}>test modal</ModalFooter>
    );
    expect(container.firstChild).toHaveStyle('background-color: red');
  });
});
