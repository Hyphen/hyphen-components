import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from './Sidebar';

jest.mock('../../hooks/useIsMobile/useIsMobile', () => ({
  useIsMobile: () => false,
}));

describe('Sidebar', () => {
  test('toggles open state with trigger', () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <div>Content</div>
        </Sidebar>
        <SidebarTrigger />
      </SidebarProvider>
    );

    const sidebar = document.querySelector('[data-state]') as HTMLElement;
    expect(sidebar).toHaveAttribute('data-state', 'expanded');

    fireEvent.click(screen.getByLabelText('toggle sidebar'));
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
  });
});

