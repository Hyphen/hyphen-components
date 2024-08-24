import React from 'react';
import { ThemeProviderContext } from '../../components/ThemeProvider/ThemeProvider';

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error(
      'useTheme must be used within a ThemeProvider. Be sure your App is wrapped in ThemeProvider.'
    );
  return context;
};
