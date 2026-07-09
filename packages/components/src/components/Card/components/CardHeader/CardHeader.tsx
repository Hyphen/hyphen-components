import React, { FC, ReactNode } from 'react';
import { Box, BoxProps } from '../../../Box/Box';
import { Heading } from '../../../Heading/Heading';

export interface CardHeaderProps extends BoxProps {
  /**
   * The title of the card
   */
  title?: ReactNode;
  /**
   * Description of the card, or element below the title
   */
  description?: ReactNode;
}

export const CardHeader: FC<CardHeaderProps> = ({
  children,
  title,
  description,
  ...restProps
}) => {
  return (
    <Box
      padding="2xl"
      direction="row"
      gap="2xl"
      width="100"
      justifyContent="space-between"
      {...restProps}
    >
      <Box gap="2xs">
        {title && (
          <>
            {typeof title === 'string' ? (
              <Heading size="sm" as="h4">
                {title}
              </Heading>
            ) : (
              title
            )}
          </>
        )}
        {description && (
          <>
            {typeof description === 'string' ? (
              <Box fontSize={{ base: 'xs', tablet: 'sm' }} color="secondary">
                {description}
              </Box>
            ) : (
              description
            )}
          </>
        )}
      </Box>
      {children}
    </Box>
  );
};
