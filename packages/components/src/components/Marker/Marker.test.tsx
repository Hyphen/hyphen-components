import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Marker, MarkerContent, MarkerIcon } from './Marker';

test('composes slots, forwards refs and leaves semantics to the caller', () => {
  const root = React.createRef<HTMLDivElement>();
  const icon = React.createRef<HTMLSpanElement>();
  const content = React.createRef<HTMLSpanElement>();
  render(
    <Marker ref={root} className="custom" role="status">
      <MarkerIcon ref={icon}>✓</MarkerIcon>
      <MarkerContent ref={content}>Synced</MarkerContent>
    </Marker>
  );
  expect(root.current).toBe(screen.getByRole('status'));
  expect(root.current).toHaveClass('custom');
  expect(root.current).toHaveAttribute('data-variant', 'default');
  expect(icon.current).toHaveAttribute('aria-hidden', 'true');
  expect(content.current).toHaveTextContent('Synced');
});

test.each(['border', 'separator'] as const)(
  '%s keeps its label readable without imposing a separator role',
  (variant) => {
    const { container } = render(
      <Marker variant={variant}>
        <Marker.Content>Today</Marker.Content>
      </Marker>
    );
    expect(container.firstChild).toHaveAttribute('data-variant', variant);
    expect(container.firstChild).not.toHaveAttribute('role');
    expect(screen.getByText('Today')).toBeVisible();
  }
);

test('renders native links and buttons with element-specific refs and behavior', () => {
  const link = React.createRef<HTMLAnchorElement>();
  const button = React.createRef<HTMLButtonElement>();
  const onClick = jest.fn();
  render(
    <>
      <Marker as="a" href="/report" ref={link}>
        <Marker.Content>Report</Marker.Content>
      </Marker>
      <Marker as="button" type="button" ref={button} onClick={onClick}>
        <Marker.Content>Retry</Marker.Content>
      </Marker>
    </>
  );
  expect(link.current).toBe(screen.getByRole('link', { name: 'Report' }));
  expect(link.current).toHaveAttribute('href', '/report');
  expect(button.current).toBe(screen.getByRole('button', { name: 'Retry' }));
  fireEvent.click(button.current!);
  expect(onClick).toHaveBeenCalledTimes(1);
});
