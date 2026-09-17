import React from 'react';
import { render, screen } from '@testing-library/react';
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
