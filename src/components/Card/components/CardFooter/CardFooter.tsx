import { Box, BoxProps } from '../../../Box/Box';
import React, { FC, ReactNode } from 'react';
export interface CardFooterProps extends BoxProps {
  /**
   * Contents of the Footer.
   */
  children?: ReactNode;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const CardFooter: FC<CardFooterProps> = ({
  background = 'secondary',
  borderColor = 'subtle',
  borderWidth = 'xs 0 0 0',
  children = null,
  display = 'block',
  padding = '2xl',
  ...restProps
}) => {
  return (
    <Box
      display={display}
      padding={padding}
      background={background}
      borderColor={borderColor}
      borderWidth={borderWidth}
      {...restProps}
    >
      {children}
    </Box>
  );
};
