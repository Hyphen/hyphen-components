import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  Sidebar,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from './Sidebar';
import { useIsMobile } from '../../hooks/useIsMobile/useIsMobile';

jest.mock('../../hooks/useIsMobile/useIsMobile', () => ({
  useIsMobile: jest.fn(() => false),
}));

let containerWidth = 1800;
let notifyResize: () => void;
const disconnect = jest.fn();

function Example({
  side = 'right',
  resizable = true,
  collapsible = 'offcanvas',
}: {
  side?: 'left' | 'right';
  resizable?: boolean;
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
  return (
    <SidebarProvider>
      <Sidebar
        side={side}
        resizable={resizable}
        defaultWidth={384}
        minWidth={320}
        maxWidth={960}
        widthStorageKey={`width-${side}`}
        collapsible={collapsible}
      >
        <SidebarRail />
      </Sidebar>
      <SidebarTrigger side={side} />
    </SidebarProvider>
  );
}
Example.displayName = 'Example';

function width(side = 'right') {
  return document
    .querySelector<HTMLElement>(`[data-side="${side}"]`)!
    .style.getPropertyValue('--sidebar-width');
}
function drag(rail: HTMLElement, from: number, to: number) {
  fireEvent.pointerDown(rail, { pointerId: 1, button: 0, clientX: from });
  fireEvent.pointerMove(rail, { pointerId: 1, clientX: to });
  fireEvent.pointerUp(rail, { pointerId: 1, clientX: to });
  fireEvent.click(rail, { detail: 1 });
}

beforeEach(() => {
  localStorage.clear();
  containerWidth = 1800;
  jest.mocked(useIsMobile).mockReturnValue(false);
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(() => ({
      width: containerWidth,
      height: 900,
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: containerWidth,
      bottom: 900,
      toJSON: () => ({}),
    }));
  // jsdom has no PointerEvent or pointer capture implementation.
  window.PointerEvent = MouseEvent as typeof PointerEvent;
  HTMLElement.prototype.setPointerCapture = jest.fn();
  HTMLElement.prototype.releasePointerCapture = jest.fn();
  window.ResizeObserver = jest.fn().mockImplementation((callback) => {
    notifyResize = callback;
    return { observe: jest.fn(), disconnect };
  });
});

test.each(['left', 'right'] as const)(
  'resizes %s without toggling and persists on release',
  (side) => {
    render(<Example side={side} />);
    const rail = screen.getByRole('button', {
      name: `Resize or toggle ${side} sidebar`,
    });
    drag(rail, 500, side === 'left' ? 700 : 300);
    expect(width(side)).toBe('584px');
    expect(document.querySelector(`[data-side="${side}"]`)).toHaveAttribute(
      'data-state',
      'expanded'
    );
    expect(localStorage.getItem(`width-${side}`)).toBe('584');
    expect(document.body.style.userSelect).toBe('');
  }
);

test('a click with movement under the threshold toggles and reopening preserves width', () => {
  render(<Example />);
  const rail = screen.getByRole('button', { name: /Resize or toggle/ });
  drag(rail, 500, 400);
  drag(rail, 500, 502);
  expect(document.querySelector('[data-side="right"]')).toHaveAttribute(
    'data-state',
    'collapsed'
  );
  fireEvent.click(screen.getByRole('button', { name: 'Toggle right sidebar' }));
  expect(width()).toBe('484px');
});

test('keyboard resizing respects bounds and container changes preserve preferred size', () => {
  localStorage.setItem('width-right', '900');
  render(<Example />);
  const rail = screen.getByRole('button', { name: /Resize or toggle/ });
  expect(rail).toHaveAttribute('tabindex', '0');
  expect(width()).toBe('900px');
  fireEvent.keyDown(rail, { key: 'End' });
  expect(width()).toBe('960px');
  act(() => {
    containerWidth = 900;
    notifyResize();
  });
  expect(width()).toBe('600px');
  expect(localStorage.getItem('width-right')).toBe('960');
  act(() => {
    containerWidth = 1800;
    notifyResize();
  });
  expect(width()).toBe('960px');
  fireEvent.keyDown(rail, { key: 'Home' });
  fireEvent.keyDown(rail, { key: 'ArrowRight' });
  expect(width()).toBe('320px');
  fireEvent.keyDown(rail, { key: 'ArrowLeft' });
  expect(width()).toBe('330px');
  act(() => {
    containerWidth = 300;
    notifyResize();
  });
  expect(width()).toBe('200px');
});

test('left and right widths are independent', () => {
  render(
    <SidebarProvider>
      <Sidebar side="left" resizable>
        <SidebarRail />
      </Sidebar>
      <Sidebar side="right" resizable>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
  fireEvent.keyDown(
    screen.getByRole('button', { name: /Resize or toggle left/ }),
    { key: 'ArrowRight' }
  );
  expect(width('left')).toBe('266px');
  expect(width('right')).toBe('384px');
});

test.each(['nonsense', '-1', 'Infinity'])(
  'ignores invalid stored width %s',
  (saved) => {
    localStorage.setItem('width-right', saved);
    render(<Example />);
    expect(width()).toBe('384px');
  }
);

test('unavailable storage does not block resizing', () => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('blocked');
  });
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('blocked');
  });
  render(<Example />);
  fireEvent.keyDown(screen.getByRole('button', { name: /Resize or toggle/ }), {
    key: 'ArrowLeft',
  });
  expect(width()).toBe('394px');
});

test('cancel restores the starting width and unmount cleans up an active drag', () => {
  const { unmount } = render(<Example />);
  const rail = screen.getByRole('button', { name: /Resize or toggle/ });
  fireEvent.pointerDown(rail, { button: 0, clientX: 500 });
  fireEvent.pointerMove(rail, { clientX: 300 });
  expect(width()).toBe('584px');
  expect(document.body.style.userSelect).toBe('none');
  fireEvent.pointerCancel(rail);
  expect(width()).toBe('384px');
  expect(localStorage.getItem('width-right')).toBeNull();
  fireEvent.pointerDown(rail, { button: 0, clientX: 500 });
  fireEvent.pointerMove(rail, { clientX: 300 });
  unmount();
  expect(document.body.style.userSelect).toBe('');
  expect(disconnect).toHaveBeenCalled();
});

test('non-resizable sidebars retain their original rail and width', () => {
  render(<Example resizable={false} />);
  expect(width()).toBe('24rem');
  expect(
    screen.getByRole('button', { name: 'Toggle Sidebar' })
  ).toHaveAttribute('tabindex', '-1');
});

test('icon collapse retains width and disables resizing until reopened', () => {
  render(<Example collapsible="icon" />);
  drag(screen.getByRole('button', { name: /Resize or toggle/ }), 500, 400);
  fireEvent.click(screen.getByRole('button', { name: /Resize or toggle/ }));
  expect(
    screen.queryByRole('button', { name: /Resize or toggle/ })
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Toggle right sidebar' }));
  expect(width()).toBe('484px');
});

test('non-collapsible sidebars can resize', () => {
  render(<Example collapsible="none" />);
  const rail = screen.getByRole('button', { name: /Resize or toggle/ });
  fireEvent.keyDown(rail, { key: 'End' });
  expect(
    rail
      .closest<HTMLElement>('[style*="--sidebar-width"]')!
      .style.getPropertyValue('--sidebar-width')
  ).toBe('960px');
});

test('mobile uses its drawer without resize controls', () => {
  jest.mocked(useIsMobile).mockReturnValue(true);
  render(<Example />);
  fireEvent.click(screen.getByRole('button', { name: 'Toggle right sidebar' }));
  expect(document.querySelector('[data-mobile="true"]')).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: /Resize or toggle/ })
  ).not.toBeInTheDocument();
});


test('pointer movement clamps at both bounds and lost capture cancels', () => {
  render(<Example />);
  const rail = screen.getByRole('button', { name: /Resize or toggle/ });
  drag(rail, 500, -1000);
  expect(width()).toBe('960px');
  drag(rail, 500, 1500);
  expect(width()).toBe('320px');
  fireEvent.pointerDown(rail, { button: 0, clientX: 500 });
  fireEvent.pointerMove(rail, { clientX: 400 });
  fireEvent.lostPointerCapture(rail);
  expect(width()).toBe('320px');
  expect(document.body.style.cursor).toBe('');
});
