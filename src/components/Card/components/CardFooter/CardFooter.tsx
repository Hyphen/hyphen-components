import { Box, BoxProps } from '../../../Box/Box';
import React, { FC, ReactNode } from 'react';

import { BackgroundColor, BorderColor } from '../../../../types';
import classNames from 'classnames';
import styles from '../../Card.module.scss';

export interface CardFooterProps extends BoxProps {
  /**
   * Contents of the Footer.
   */
  children?: ReactNode;
  /**
   * If defined as a prop, this value will take higher precedence than the corresponding component design token value
   * Any valid [brand color token](/?path=/docs/foundation-design-tokens--docs#color), or a `url()` for an image
   */
  background?: BackgroundColor;
  /**
   * If defined as a prop, this value will take higher precedence than the corresponding component design token value
   * Any valid [brand color token](/?path=/docs/foundation-design-tokens--docs#color) for the border color
   * Or a responsive prop with borderColor for each breakpoint.
   */
  borderColor?: BorderColor;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const CardFooter: FC<CardFooterProps> = ({
  background = undefined,
  borderColor = undefined,
  borderWidth = 'xs 0 0 0',
  children = null,
  className,
  display = 'block',
  padding = '2xl',
  ...restProps
}) => {
  const classes = classNames(
    {
      [styles['card-footer-background']]: background === undefined,
      [styles['card-footer-border-color']]: borderColor === undefined,
    },
    className
  );

  return (
    <Box
      className={classes}
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
