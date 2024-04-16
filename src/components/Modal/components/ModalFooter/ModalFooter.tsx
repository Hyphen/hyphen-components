import React, { FC } from 'react';
import { Box, BoxProps } from '../../../Box/Box';

export type ModalFooterProps = Omit<
  BoxProps,
  'as' | 'background' | 'borderColor' | 'borderWidth' | 'radius'
>;

export const ModalFooter: FC<ModalFooterProps> = ({
  children,
  padding = 'xl',
  direction = 'row',
  alignItems = 'center',
  justifyContent = 'flex-end',
  background = 'secondary',
  gap = 'sm',
  style,
  ...restProps
}) => (
  <Box
    background={background}
    padding={padding}
    direction={direction}
    alignItems={alignItems}
    justifyContent={justifyContent}
    borderWidth="sm 0 0 0"
    borderColor="default"
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
