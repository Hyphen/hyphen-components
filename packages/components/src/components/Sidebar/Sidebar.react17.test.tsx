import React from 'react';
import { render, screen } from '@testing-library/react';
import { Sidebar, SidebarProvider, SidebarRail } from './Sidebar';

// React 16.8 and 17 are in the peer range but have no React.useId.
jest.mock('react', () => ({ ...jest.requireActual('react'), useId: undefined }));
jest.mock('../../hooks/useIsMobile/useIsMobile', () => ({
  useIsMobile: () => false,
}));

beforeEach(() => {
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
  }));
});

test('SidebarRail renders without React.useId', () => {
  render(
    <SidebarProvider>
      <Sidebar side="left">
        <SidebarRail />
      </Sidebar>
      <Sidebar side="right" resizable>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
  expect(
    screen.getByRole('button', { name: 'Toggle Sidebar' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Resize or toggle right sidebar' })
  ).toHaveAccessibleDescription(/^Width \d+ pixels/);
});
