import React from 'react';
import '../src/styles/utilities.scss';
import '../src/styles/variables/index.scss';
import '../src/styles/reset.scss';
import '../src/styles/fonts.scss';

import { Box } from '../src/components/Box/Box';
import { Preview } from '@storybook/react-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import hyphenTheme from './hyphenTheme';
import { ResponsiveProvider } from '../src/components/ResponsiveProvider/ResponsiveProvider';

export const decorators = [
  (Story, context) => {
    const { parameters } = context;
    if (parameters.overrideDecorator) {
      return <div style={{ padding: '0', margin: '0' }}>{Story()}</div>;
    } else {
      return (
        <ResponsiveProvider>
          <Box display="block" background="primary" padding="xl">
            <Story />
          </Box>
        </ResponsiveProvider>
      );
    }
  },
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

const preview: Preview = {
  parameters: {
    docs: {
      theme: hyphenTheme,
    },
    options: {
      storySort: {
        order: [
          'About',
          ['Introduction', 'Get Started'],
          'Brands',
          'Foundation',
          ['Color', 'Design Tokens'],
          'Components',
        ],
      },
    },
    decorators: decorators,
  },
};

export default preview;
