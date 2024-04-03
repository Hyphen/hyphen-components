import React from 'react';
import { render } from '@testing-library/react';
import { Drawer, DrawerProps } from './Drawer';

const renderDrawer = ({
  isOpen,
  title,
  ariaLabel,
  onDismiss,
  closeButton,
}: DrawerProps) => (
  <Drawer
    isOpen={isOpen}
    title={title}
    ariaLabel={ariaLabel}
    onDismiss={onDismiss}
    closeButton={closeButton}
  />
);

describe('Drawer', () => {
  test('renders its children', () => {
    const { getByText } = render(
      renderDrawer({
        ariaLabel: 'Right Drawer',
        isOpen: true,
        title: 'Right Drawer',
        onDismiss: () => null,
      })
    );
    expect(getByText('Right Drawer')).toBeInTheDocument();
  });

  test('it applies the aria label', () => {
    const { getByLabelText } = render(
      renderDrawer({
        ariaLabel: 'Right Drawer',
        isOpen: true,
        title: 'Right Drawer',
        onDismiss: () => null,
      })
    );
    expect(getByLabelText('Right Drawer')).toBeInTheDocument();
  });

  test('it renders a close button and title', () => {
    const { getByText, getByLabelText } = render(
      renderDrawer({
        ariaLabel: 'Right Drawer',
        isOpen: true,
        title: 'Right Drawer',
        onDismiss: () => null,
      })
    );
    expect(getByLabelText('close')).toBeInTheDocument();
    expect(getByText('Right Drawer')).toBeInTheDocument();
  });

  test('it renders a close button without title', () => {
    const { getByLabelText } = render(
      renderDrawer({
        ariaLabel: 'Right Drawer',
        isOpen: true,
        onDismiss: () => null,
        closeButton: true,
      })
    );
    expect(getByLabelText('close')).toBeInTheDocument();
  });

  test('it open and closes based on isOpen prop', () => {
    const { queryByLabelText, getByLabelText, rerender } = render(
      renderDrawer({
        ariaLabel: 'Right Drawer',
        isOpen: false,
      })
    );

    expect(queryByLabelText('Right Drawer')).toBe(null);

    rerender(
      renderDrawer({
        ariaLabel: 'Right Drawer',
        isOpen: true,
      })
    );

    expect(getByLabelText('Right Drawer')).toBeInTheDocument();
  });
});
