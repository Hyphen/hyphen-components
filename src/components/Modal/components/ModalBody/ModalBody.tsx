import React, { FC } from 'react';
import { Box, BoxProps } from '../../../Box/Box';

export type ModalBodyProps = BoxProps;

export const ModalBody: FC<ModalBodyProps> = ({
  children,
  flex = 'auto',
  padding,
  overflow = 'auto',
  height = '100',
  ...restProps
}) => (
  <Box
    flex={flex}
    overflow={overflow}
    height={height}
    style={{ position: 'relative' }}
    {...restProps}
  >
    {children}
  </Box>
);
