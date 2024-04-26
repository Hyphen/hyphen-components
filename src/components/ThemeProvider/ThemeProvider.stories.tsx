import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import type { Meta } from '@storybook/react';
import { Box } from '../Box/Box';
import { RadioGroup } from '../RadioGroup/RadioGroup';
import { useTheme, Theme } from './ThemeProvider';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Providers/ThemeProvider',
  component: ThemeProvider,
};

export default meta;

export const BasicUsage = () =>
  (() => {
    const App = () => {
      const { theme, setTheme } = useTheme();

      const options = [
        {
          id: 'light',
          value: 'light',
          label: 'Light',
        },
        {
          id: 'dark',
          value: 'dark',
          label: 'Dark',
        },
        {
          id: 'system',
          value: 'system',
          label: 'System',
        },
      ];

      return (
        <Box gap="md">
          <p>Theme: {theme}</p>

          <RadioGroup
            name="noTitleOrDescription"
            value={theme}
            onChange={(event) => setTheme(event.target.value as Theme)}
            options={options}
          />
        </Box>
      );
    };
    return (
      <ThemeProvider defaultTheme="light" storageKey="hyphen-ui-theme">
        <App />
      </ThemeProvider>
    );
  })();
