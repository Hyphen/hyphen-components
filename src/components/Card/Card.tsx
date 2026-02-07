import { Box, BoxProps } from '../Box/Box';
import { CardFooter, CardHeader, CardSection } from './components';
import React, { ReactNode } from 'react';

export interface CardProps extends BoxProps {
  /**
   * The Card's contents.
   */
  children?: ReactNode;
}

export const CardBaseComponent: React.FC<CardProps> = React.forwardRef(
  (
    {
      children,
      subdued,
      overflow = 'hidden',
      display = 'block',
      width = '100',
      ...restProps
    },
    ref
  ) => {
    return (
      <Box
        background={subdued ? 'secondary' : 'primary'}
        borderWidth="sm"
        borderColor="subtle"
        overflow={overflow}
        display={display}
        ref={ref}
        shadow="2xs"
        width={width}
        radius="lg"
        {...restProps}
      >
        {children}
      </Box>
    );
  }
);

CardBaseComponent.displayName = 'Card';

export interface CardStatic {
  Header: typeof CardHeader;
  Section: typeof CardSection;
  Footer: typeof CardFooter;
}

export type CardWithStaticComponents = typeof CardBaseComponent & CardStatic;

// Actual component is wrapped in an IIFE for the export
// To allow tree-shaking even with static properties (subcomponents in this case).
export const Card = (() => {
  const Card = CardBaseComponent as CardWithStaticComponents; // eslint-disable-line no-shadow

  Card.Header = CardHeader;
  Card.Section = CardSection;
  Card.Footer = CardFooter;

  return Card;
})();
