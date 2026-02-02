import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Sidebar, SidebarProvider, SidebarTrigger } from './Sidebar';

jest.mock('../../hooks/useIsMobile/useIsMobile', () => ({
  useIsMobile: () => false,
}));

describe('Sidebar', () => {
  test('toggles open state with trigger', () => {
    render(
      <SidebarProvider>
        <Sidebar data-testid="sidebar">
          <div>Content</div>
        </Sidebar>
        <SidebarTrigger side="left" />
      </SidebarProvider>
    );

    const sidebar = document.querySelector('[data-state]') as HTMLElement;
    expect(sidebar).toHaveAttribute('data-state', 'expanded');

    fireEvent.click(screen.getByLabelText('Toggle left sidebar'));
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
  });

  test('supports right side placement', () => {
    render(
      <SidebarProvider>
        <Sidebar side="right">
          <div>Content</div>
        </Sidebar>
      </SidebarProvider>
    );

    const sidebar = document.querySelector(
      '[data-side="right"]'
    ) as HTMLElement;
    expect(sidebar).toBeInTheDocument();
  });

  test('tracks left and right sidebars independently', () => {
    render(
      <SidebarProvider>
        <Sidebar side="left">
          <div>Left</div>
        </Sidebar>
        <Sidebar side="right">
          <div>Right</div>
        </Sidebar>
        <SidebarTrigger side="left" data-testid="left-trigger" />
        <SidebarTrigger side="right" data-testid="right-trigger" />
      </SidebarProvider>
    );

    const leftSidebar = document.querySelector(
      '[data-side="left"]'
    ) as HTMLElement;
    const rightSidebar = document.querySelector(
      '[data-side="right"]'
    ) as HTMLElement;

    expect(leftSidebar).toHaveAttribute('data-state', 'expanded');
    expect(rightSidebar).toHaveAttribute('data-state', 'expanded');

    fireEvent.click(screen.getByTestId('left-trigger'));
    expect(leftSidebar).toHaveAttribute('data-state', 'collapsed');
    expect(rightSidebar).toHaveAttribute('data-state', 'expanded');

    fireEvent.click(screen.getByTestId('right-trigger'));
    expect(rightSidebar).toHaveAttribute('data-state', 'collapsed');
  });

  test('calls onOpenChange callback when sidebar state changes', () => {
    const onOpenChange = jest.fn();
    render(
      <SidebarProvider onOpenChange={onOpenChange}>
        <Sidebar side="left" />
        <SidebarTrigger side="left" data-testid="left-trigger" />
      </SidebarProvider>
    );
    fireEvent.click(screen.getByTestId('left-trigger'));
    expect(onOpenChange).toHaveBeenCalledWith(false, 'left');
    fireEvent.click(screen.getByTestId('left-trigger'));
    expect(onOpenChange).toHaveBeenCalledWith(true, 'left');
  });
});
