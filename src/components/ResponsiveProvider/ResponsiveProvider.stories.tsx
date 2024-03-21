import React from 'react';
import { ResponsiveProvider } from './ResponsiveProvider';
import type { Meta } from '@storybook/react';
import { useWindowSize } from '../../hooks/useWindowSize/useWindowSize';
import { useBreakpoint } from '../../hooks/useBreakpoint/useBreakpoint';
import { Box } from '../Box/Box';

const meta: Meta<typeof ResponsiveProvider> = {
  title: 'Providers/ResponsiveProvider',
  component: ResponsiveProvider,
};

export default meta;

export const BasicUsage = () =>
  (() => {
    const App = () => {
      const { innerWidth, innerHeight, outerWidth, outerHeight } =
        useWindowSize();
      return (
        <Box gap="md">
          <p>Inner Width: {innerWidth}</p>
          <p>Inner Height: {innerHeight}</p>
          <p>Outer Width: {outerWidth}</p>
          <p>Outer Height: {outerHeight}</p>
        </Box>
      );
    };
    return (
      <ResponsiveProvider>
        <App />
      </ResponsiveProvider>
    );
  })();

export const Breakpoints = () =>
  (() => {
    const App = () => {
      const { isPhone, isTablet, isDesktop, isHd } = useBreakpoint();
      return (
        <Box gap="md">
          <p>phone: {isPhone ? '✅' : '❌'}</p>
          <p>tablet: {isTablet ? '✅' : '❌'}</p>
          <p>desktop: {isDesktop ? '✅' : '❌'}</p>
          <p>hd: {isHd ? '✅' : '❌'}</p>
        </Box>
      );
    };
    return (
      <ResponsiveProvider>
        <App />
      </ResponsiveProvider>
    );
  })();
