import { addons } from 'storybook/manager-api';
import hyphenTheme from './hyphenTheme';

addons.setConfig({
  theme: hyphenTheme,
});