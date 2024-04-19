import React from 'react';
import '../src/styles/utilities.scss';
import '../src/styles/variables/index.scss';
import '../src/styles/reset.scss';
import '../src/styles/fonts.scss';

import { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'hyphen light',
      values: [
        {
          name: 'primary (light)',
          value: '#ffffff',
        },
        {
          name: 'secondary (light)',
          value: '#f5f5f5',
        },
        {
          name: 'primary (dark)',
          value: '#0a0a0a',
        },
        {
          name: 'secondary (dark)',
          value: '#171717',
        },
      ],
    },
    options: {
      storySort: {
        order: [
          'About',
          ['Introduction', 'Get Started'],
          'Foundation',
          ['Color', 'Design Tokens'],
          'Components',
        ],
      },
    },
  },
};

export default preview;
