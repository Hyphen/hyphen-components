import React from 'react';
import type { Meta } from '@storybook/react';
import { ResponsiveProvider } from '../../components/ResponsiveProvider/ResponsiveProvider';
import { useBreakpoint } from './useBreakpoint';

const meta: Meta<typeof useBreakpoint> = {
  title: 'Hooks/useBreakpoint',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const BasicUsage = () =>
  (() => {
    const App = () => {
      const { isPhone, isTablet, isDesktop, isHd } = useBreakpoint();
      return (
        <div>
          {isPhone && <p>Phone layout</p>}
          {isTablet && <p>Tablet layout</p>}
          {isDesktop && <p>Desktop layout</p>}
          {isHd && <p>HD layout</p>}
        </div>
      );
    };
    return (
      <ResponsiveProvider>
        <App />
      </ResponsiveProvider>
    );
  })();
