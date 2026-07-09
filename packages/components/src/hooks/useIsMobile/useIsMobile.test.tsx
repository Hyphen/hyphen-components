import React from 'react';
import { render } from '@testing-library/react';
import { useIsMobile } from './useIsMobile';
import { BREAKPOINTS } from '../../lib/tokens';

const UseIsMobileExample = () => {
  const isMobile = useIsMobile();

  return <div>{isMobile ? 'is mobile' : 'not mobile'}</div>;
};

describe('useIsMobile hook', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('max-width'),
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  });

  test('renders with initial state', () => {
    const { getByText } = render(<UseIsMobileExample />);
    expect(getByText('not mobile')).toBeInTheDocument();
  });

  test('renders as mobile when window width is less than MOBILE_BREAKPOINT', () => {
    const desktopBreakpoint = BREAKPOINTS.find((b) => b.name === 'desktop');
    window.innerWidth =
      (desktopBreakpoint ? desktopBreakpoint.minWidth : 992) - 1;
    const { getByText } = render(<UseIsMobileExample />);
    expect(getByText('is mobile')).toBeInTheDocument();
  });

  test('renders as not mobile when window width is greater than MOBILE_BREAKPOINT', () => {
    const desktopBreakpoint = BREAKPOINTS.find((b) => b.name === 'desktop');
    window.innerWidth = desktopBreakpoint ? desktopBreakpoint.minWidth : 992;
    const { getByText } = render(<UseIsMobileExample />);
    expect(getByText('not mobile')).toBeInTheDocument();
  });
});
