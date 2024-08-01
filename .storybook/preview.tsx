import React from 'react';
import '../src/styles/utilities.scss';
import '../src/styles/variables/index.scss';
import '../src/styles/reset.scss';
import '../src/styles/fonts.scss';

import { Box } from '../src/components/Box/Box';
import { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';
import hyphenTheme from './hyphenTheme';

export const decorators = [
  (Story) => (
    <Box display="block" background="primary" padding="xl">
      <Story />
    </Box>
  ),
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
