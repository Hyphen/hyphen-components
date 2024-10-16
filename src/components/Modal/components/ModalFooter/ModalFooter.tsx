import React, { FC } from 'react';
import { Box, BoxProps } from '../../../Box/Box';

export type ModalFooterProps = Omit<BoxProps, 'as' | 'radius'>;

export const ModalFooter: FC<ModalFooterProps> = ({
  children,
  padding,
  direction = 'row',
  alignItems = 'center',
  justifyContent = 'flex-end',
  gap = 'md',
  style,
  ...restProps
}) => (
  <Box
    padding={padding}
    direction={direction}
    alignItems={alignItems}
    justifyContent={justifyContent}
    gap={gap}
    style={{
      flexShrink: 0,
      ...style,
    }}
    {...restProps}
  >
    {children}
  </Box>
);
