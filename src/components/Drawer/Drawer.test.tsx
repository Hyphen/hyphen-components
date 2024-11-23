import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Drawer,
  DrawerTitle,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerProps,
} from './Drawer';

const renderDrawer = (props: Partial<DrawerProps> = {}) => {
  const defaultProps: DrawerProps = {
    isOpen: false,
    ariaLabel: 'Drawer',
    onDismiss: jest.fn(),
    ...props,
  };
  return render(
    <Drawer {...defaultProps}>
      <DrawerHeader>
        <DrawerTitle>Drawer Title</DrawerTitle>
        <DrawerCloseButton onClick={defaultProps.onDismiss} />
      </DrawerHeader>
      <DrawerContent>Drawer Content</DrawerContent>
    </Drawer>
  );
};

describe('Drawer', () => {
  test('renders its children', () => {
    renderDrawer({ isOpen: true, ariaLabel: 'Right Drawer' });
    expect(screen.getByText('Drawer Title')).toBeInTheDocument();
  });

  test('it applies the aria label', () => {
    renderDrawer({ isOpen: true, ariaLabel: 'Right Drawer' });
    expect(screen.getByLabelText('Right Drawer')).toBeInTheDocument();
  });

  test('it opens and closes based on isOpen prop', () => {
    const { rerender } = renderDrawer({
      isOpen: false,
      ariaLabel: 'Right Drawer',
    });
    expect(screen.queryByLabelText('Right Drawer')).toBe(null);

    rerender(
      <Drawer isOpen={true} ariaLabel="Right Drawer" onDismiss={() => null} />
    );
    expect(screen.getByLabelText('Right Drawer')).toBeInTheDocument();
  });

  test('it calls onDismiss when close button is clicked', () => {
    const mockedOnDismiss = jest.fn();
    renderDrawer({
      isOpen: true,
      ariaLabel: 'Right Drawer',
      onDismiss: mockedOnDismiss,
    });

    fireEvent.click(screen.getByLabelText('close'));
    expect(mockedOnDismiss).toHaveBeenCalledTimes(1);
  });

  describe('Controlled Drawer', () => {
    it('renders and toggles the drawer based on external state', () => {
      const ControlledDrawer = () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
          <>
            <button onClick={() => setIsOpen(!isOpen)}>Toggle Drawer</button>
            <Drawer
              isOpen={isOpen}
              ariaLabel="Controlled Drawer"
              onDismiss={() => setIsOpen(false)}
            >
              <DrawerCloseButton onClick={() => setIsOpen(false)} />
            </Drawer>
          </>
        );
      };

      render(<ControlledDrawer />);

      const toggleButton = screen.getByText('Toggle Drawer');
      fireEvent.click(toggleButton);

      expect(screen.getByLabelText('Controlled Drawer')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('close'));
      expect(screen.queryByLabelText('Controlled Drawer')).toBe(null);
    });
  });
});
