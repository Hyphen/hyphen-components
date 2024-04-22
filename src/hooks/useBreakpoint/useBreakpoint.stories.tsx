import React from 'react';
import type { Meta } from '@storybook/react';
import { ResponsiveProvider } from '../../components/ResponsiveProvider/ResponsiveProvider';
import { useBreakpoint } from './useBreakpoint';

const meta: Meta<typeof useBreakpoint> = {
  title: 'Hooks/useBreakpoint',
};

export default meta;

export const BasicUsage = () =>
  (() => {
    const App = () => {
      const { isPhone, isTablet, isDesktop, isHd } = useBreakpoint();
      return (
        <div>
          <p>phone: {isPhone ? '✅' : '❌'}</p>
          <p>tablet: {isTablet ? '✅' : '❌'}</p>
          <p>desktop: {isDesktop ? '✅' : '❌'}</p>
          <p>hd: {isHd ? '✅' : '❌'}</p>
        </div>
      );
    };
    return (
      <ResponsiveProvider>
        <App />
      </ResponsiveProvider>
    );
  })();
