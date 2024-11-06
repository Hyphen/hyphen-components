import React from 'react';
import type { Meta } from '@storybook/react';
import { ResponsiveProvider } from '../../components/ResponsiveProvider/ResponsiveProvider';
import { useIsMobile } from '../useIsMobile/useIsMobile';

const meta: Meta<typeof useIsMobile> = {
  title: 'Hooks/useIsMobile',
};

export default meta;

export const BasicUsage = () =>
  (() => {
    const App = () => {
      const isMobile = useIsMobile();
      return (
        <div>
          <p>isMobile: {isMobile ? '✅ TRUE' : '❌ FALSE'}</p>
        </div>
      );
    };
    return (
      <ResponsiveProvider>
        <App />
      </ResponsiveProvider>
    );
  })();
