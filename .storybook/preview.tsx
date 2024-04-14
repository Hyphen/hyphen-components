import React from "react";
import '../src/styles/utilities.scss';
import '../src/styles/variables/index.scss';
import '../src/styles/reset.scss';
import '../src/styles/fonts.scss';

import { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'About',
          ['Introduction', 'Get Started'],
          'Foundation',
          ['Design Tokens'],
          'Components',
        ],
      },
    },
  },
};

export default preview;
