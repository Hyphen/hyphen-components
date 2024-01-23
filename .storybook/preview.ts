import { Preview } from '@storybook/react';

import '../src/styles/utilities.scss';
import '../src/styles/variables/index.scss';
import '../src/styles/reset.scss';
import '../src/styles/fonts.scss';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'About',
          ['Introduction', 'Get Started'],
          'Foundation',
          ['Design Tokens'],
          // 'Content',
          // ['Goals and Principles', 'Voice and Tone', 'Grammar and Mechanics', 'Word List'],
          // 'Theming',
          // ['Overview', 'Form Controls'],
          'Components',
          //'Patterns',
        ],
      },
    },
  },
};

export default preview;
