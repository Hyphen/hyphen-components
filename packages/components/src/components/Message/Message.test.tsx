import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { Message } from './Message';

test('composes sender alignment, content, metadata and a forwarded ref', () => {
  const ref = React.createRef<HTMLDivElement>();
  render(
    <Message.Group>
      <Message align="end" ref={ref} aria-label="Sent message">
        <Message.Avatar>NY</Message.Avatar>
        <Message.Content>
          <Message.Header>Nathan</Message.Header>Hello
          <Message.Footer>
            <button>Copy message</button>
          </Message.Footer>
        </Message.Content>
      </Message>
    </Message.Group>
  );
  expect(ref.current).toHaveAttribute('data-message-align', 'end');
  expect(ref.current).toHaveClass('flex-direction-row-reverse');
  expect(screen.getByText('Nathan')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Copy message' })
  ).toBeInTheDocument();
});

test('header and footer inherit the message side, including after alignment changes', () => {
  const Row = ({ align }: { align: 'start' | 'end' }) => (
    <Message align={align}>
      <Message.Content>
        <Message.Header data-testid="header">Sender</Message.Header>
        <div>Message surface</div>
        <Message.Footer data-testid="footer">
          <button>Reply</button>
        </Message.Footer>
      </Message.Content>
    </Message>
  );
  const view = render(<Row align="start" />);
  expect(screen.getByTestId('header')).toHaveClass(
    'justify-content-flex-start'
  );
  expect(screen.getByTestId('footer')).toHaveClass(
    'align-self-flex-start',
    'justify-content-flex-start'
  );
  view.rerender(<Row align="end" />);
  expect(screen.getByTestId('header')).toHaveClass('justify-content-flex-end');
  expect(screen.getByTestId('footer')).toHaveClass(
    'align-self-flex-end',
    'justify-content-flex-end'
  );
});

test('allows explicit footer alignment and forwards footer/avatar refs', () => {
  const footerRef = React.createRef<HTMLDivElement>();
  const avatarRef = React.createRef<HTMLDivElement>();
  render(
    <Message align="end">
      <Message.Avatar ref={avatarRef}>NY</Message.Avatar>
      <Message.Content>
        <div>Text</div>
        <Message.Footer
          ref={footerRef}
          alignSelf="flex-start"
          justifyContent="flex-start"
        >
          Read
        </Message.Footer>
      </Message.Content>
    </Message>
  );
  expect(avatarRef.current).toHaveClass('align-self-flex-end');
  expect(footerRef.current).toHaveTextContent('Read');
  expect(footerRef.current).toHaveClass(
    'align-self-flex-start',
    'justify-content-flex-start'
  );
});

test('reserves space above a growing footer and releases it when the footer unmounts', () => {
  const originalObserver = global.ResizeObserver;
  let measure: () => void = () => undefined;
  const disconnect = jest.fn();
  global.ResizeObserver = class {
    constructor(callback: () => void) {
      measure = callback;
    }
    observe() {}
    unobserve() {}
    disconnect = disconnect;
  } as unknown as typeof ResizeObserver;
  let bottom = 200;
  const bounds = jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(function (this: HTMLElement) {
      return {
        top: this.dataset.testid === 'footer' ? 176 : 0,
        bottom: this.hasAttribute('data-message-content') ? bottom : 200,
      } as DOMRect;
    });
  const Row = ({ footer = true }: { footer?: boolean }) => (
    <Message data-testid="message">
      <Message.Avatar>NY</Message.Avatar>
      <Message.Content style={{ rowGap: 8 }}>
        <div>Surface</div>
        {footer && (
          <Message.Footer data-testid="footer">Delivered</Message.Footer>
        )}
      </Message.Content>
    </Message>
  );
  try {
    const view = render(<Row />);
    expect(
      screen
        .getByTestId('message')
        .style.getPropertyValue('--message-footer-offset')
    ).toBe('32px');
    bottom = 232;
    act(measure);
    expect(
      screen
        .getByTestId('message')
        .style.getPropertyValue('--message-footer-offset')
    ).toBe('64px');
    view.rerender(<Row footer={false} />);
    expect(
      screen
        .getByTestId('message')
        .style.getPropertyValue('--message-footer-offset')
    ).toBe('0px');
    expect(disconnect).toHaveBeenCalled();
  } finally {
    bounds.mockRestore();
    global.ResizeObserver = originalObserver;
  }
});
