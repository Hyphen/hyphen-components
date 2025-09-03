import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, ThemeProviderContext } from './ThemeProvider';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('ThemeProvider', () => {
  test('applies default theme to document element', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <div />
      </ThemeProvider>
    );
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  test('setTheme updates class and localStorage', () => {
    const Consumer = () => {
      const { setTheme } = React.useContext(ThemeProviderContext);
      React.useEffect(() => {
        setTheme('dark');
      }, [setTheme]);
      return null;
    };

    render(
      <ThemeProvider defaultTheme="light">
        <Consumer />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('hyphen-ui-theme')).toBe('dark');
  });
});
