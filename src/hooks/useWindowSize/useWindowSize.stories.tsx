import React from 'react';
import type { Meta } from '@storybook/react';
import { useWindowSize } from './useWindowSize';
import { Box } from '../../components/Box/Box';
import { ResponsiveProvider } from '../../components/ResponsiveProvider/ResponsiveProvider';

const meta: Meta<typeof useWindowSize> = {
  title: 'Hooks/useWindowSize',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
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
