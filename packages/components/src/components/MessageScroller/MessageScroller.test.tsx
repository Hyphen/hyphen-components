import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import {
  MessageScroller,
  MessageScrollerProps,
  useMessageScroller,
} from './MessageScroller';

let resize: () => void;
let height: number;
test('does not reinterpret saved history as a new turn in StrictMode', () => {
  render(
    <React.StrictMode>
      <Chat />
    </React.StrictMode>
  );
  expect(screen.getByRole('region').scrollTop).toBe(200);
});

test('anchors the first prompt after an empty conversation loads', () => {
  height = 0;
  const FirstChat = ({ sent = false }: { sent?: boolean }) => (
    <MessageScroller defaultScrollPosition="end" scrollPreviousItemPeek={20}>
      <MessageScroller.Viewport>
        <MessageScroller.Content>
          {sent && (
            <MessageScroller.Item messageId="first" scrollAnchor data-top="100">
              First prompt
            </MessageScroller.Item>
          )}
        </MessageScroller.Content>
      </MessageScroller.Viewport>
    </MessageScroller>
  );
  const view = render(<FirstChat />);
  height = 140;
  view.rerender(<FirstChat sent />);
  flush();
  expect(screen.getByRole('region').scrollTop).toBe(80);
});
const rect = (top: number, h: number) => ({
  top,
  bottom: top + h,
  height: h,
  left: 0,
  right: 300,
  width: 300,
  x: 0,
  y: top,
  toJSON: () => ({}),
});
const flush = () =>
  act(() => {
    resize();
    jest.runOnlyPendingTimers();
  });

beforeEach(() => {
  jest.useFakeTimers();
  height = 400;
  jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(200);
  jest
    .spyOn(HTMLElement.prototype, 'scrollHeight', 'get')
    .mockImplementation(function (this: HTMLElement) {
      return Math.max(
        200,
        height +
          parseFloat(
            (this.lastElementChild as HTMLElement)?.style.height || '0'
          )
      );
    });
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(function (this: HTMLElement) {
      const scrollTop = this.closest('[role="region"]')?.scrollTop || 0;
      if (this.getAttribute('role') === 'region') return rect(0, 200);
      if (this.getAttribute('role') === 'log') return rect(-scrollTop, height);
      return rect(
        Number(this.dataset.top || 0) - scrollTop,
        Number(this.dataset.height || 40)
      );
    });
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
    configurable: true,
    value: jest.fn(function (this: HTMLElement, options: ScrollToOptions) {
      this.scrollTop = Math.max(
        0,
        Math.min(options.top || 0, this.scrollHeight - this.clientHeight)
      );
    }),
  });
  global.ResizeObserver = class {
    constructor(callback: () => void) {
      resize = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});
afterEach(() => {
  jest.useRealTimers();
});

const Commands = () => {
  const { scrollToMessage } = useMessageScroller();
  return (
    <button onClick={() => scrollToMessage('reply', { align: 'start' })}>
      Find reply
    </button>
  );
};
const Chat = ({
  added = false,
  prepend = false,
  ...props
}: MessageScrollerProps & { added?: boolean; prepend?: boolean }) => (
  <MessageScroller
    defaultScrollPosition="end"
    scrollPreviousItemPeek={20}
    {...props}
  >
    <MessageScroller.Viewport>
      <MessageScroller.Content>
        {prepend && (
          <MessageScroller.Item messageId="older" data-top="0">
            Older
          </MessageScroller.Item>
        )}
        <MessageScroller.Item
          messageId="prompt"
          scrollAnchor
          data-top={prepend ? 100 : 0}
        >
          Prompt
        </MessageScroller.Item>
        <MessageScroller.Item
          messageId="reply"
          data-top={prepend ? 200 : 100}
          data-height="300"
        >
          Reply
        </MessageScroller.Item>
        {added && (
          <MessageScroller.Item messageId="new" scrollAnchor data-top="400">
            New prompt
          </MessageScroller.Item>
        )}
      </MessageScroller.Content>
    </MessageScroller.Viewport>
    <MessageScroller.Button />
    <MessageScroller.Button direction="start" />
    <Commands />
  </MessageScroller>
);

test('opens saved history at the end and pauses growth when the reader scrolls away', () => {
  render(<Chat />);
  const viewport = screen.getByRole('region');
  expect(viewport.scrollTop).toBe(200);
  fireEvent.wheel(viewport, { deltaY: -100 });
  viewport.scrollTop = 80;
  fireEvent.scroll(viewport);
  height = 500;
  flush();
  expect(viewport.scrollTop).toBe(80);
  fireEvent.click(screen.getByRole('button', { name: 'Jump to latest' }));
  expect(viewport.scrollTop).toBe(300);
  height = 600;
  flush();
  expect(viewport.scrollTop).toBe(400);
});

test('anchors a short appended prompt and lets the response grow without displacing it', () => {
  const view = render(<Chat />);
  height = 440;
  view.rerender(<Chat added />);
  flush();
  const viewport = screen.getByRole('region');
  expect(viewport.scrollTop).toBe(380);
  expect((viewport.lastElementChild as HTMLElement).style.height).toBe('140px');
  height = 800;
  flush();
  expect(viewport.scrollTop).toBe(380);
  expect((viewport.lastElementChild as HTMLElement).style.height).toBe('0px');
  expect(screen.getByRole('button', { name: 'Jump to latest' })).toBeVisible();
});

test('preserves the visible message when older history is prepended', () => {
  const view = render(<Chat />);
  const viewport = screen.getByRole('region');
  fireEvent.wheel(viewport);
  viewport.scrollTop = 120;
  fireEvent.scroll(viewport);
  height = 500;
  view.rerender(<Chat prepend />);
  flush();
  expect(viewport.scrollTop).toBe(220);
});

test('waits for loading to finish and supports keyboard interruption and navigation', () => {
  const view = render(<Chat ready={false} />);
  const viewport = screen.getByRole('region');
  expect(viewport.scrollTop).toBe(0);
  view.rerender(<Chat ready />);
  expect(viewport.scrollTop).toBe(200);
  fireEvent.keyDown(viewport, { key: 'PageUp' });
  height = 500;
  flush();
  expect(viewport.scrollTop).toBe(200);
  fireEvent.click(screen.getByRole('button', { name: 'Find reply' }));
  expect(viewport.scrollTop).toBe(100);
  fireEvent.click(screen.getByRole('button', { name: 'Scroll up' }));
  expect(viewport.scrollTop).toBe(0);
});

test('resets positioning when switching conversations and respects reduced motion', () => {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: jest.fn(() => ({ matches: true })),
  });
  const view = render(<Chat key="one" />);
  fireEvent.click(screen.getByRole('button', { name: 'Scroll up' }));
  expect(HTMLElement.prototype.scrollTo).toHaveBeenLastCalledWith({
    top: 0,
    behavior: 'auto',
  });
  view.rerender(<Chat key="two" />);
  expect(screen.getByRole('region').scrollTop).toBe(200);
});

test('default scroll buttons show decorative icons with accessible names', () => {
  render(<Chat defaultScrollPosition="start" />);
  const down = screen.getByRole('button', { name: 'Jump to latest' });
  expect(down.textContent).toBe('');
  expect(within(down).getByTestId('prefixIcon')).toHaveAttribute(
    'aria-hidden',
    'true'
  );
  expect(within(down).getByTestId('prefixIcon')).toHaveAttribute(
    'focusable',
    'false'
  );
  fireEvent.click(down);
  expect(screen.getByRole('region').scrollTop).toBe(200);
  const up = screen.getByRole('button', { name: 'Scroll up' });
  expect(up.textContent).toBe('');
  expect(within(up).getByTestId('prefixIcon')).toHaveAttribute(
    'aria-hidden',
    'true'
  );
  expect(down).toHaveAttribute('tabindex', '-1');
  fireEvent.click(up);
  expect(screen.getByRole('region').scrollTop).toBe(0);
});

test('custom button content supplies its own name and can opt into an icon', () => {
  render(
    <MessageScroller>
      <MessageScroller.Viewport>
        <MessageScroller.Content>History</MessageScroller.Content>
      </MessageScroller.Viewport>
      <MessageScroller.Button>Latest messages</MessageScroller.Button>
      <MessageScroller.Button
        iconPrefix="arrow-down"
        aria-label="Go to newest message"
      />
    </MessageScroller>
  );
  const textButton = screen.getByRole('button', { name: 'Latest messages' });
  expect(textButton).not.toHaveAttribute('aria-label');
  expect(
    within(textButton).queryByTestId('prefixIcon')
  ).not.toBeInTheDocument();
  const customIconButton = screen.getByRole('button', {
    name: 'Go to newest message',
  });
  expect(within(customIconButton).getAllByTestId('prefixIcon')).toHaveLength(1);
});
