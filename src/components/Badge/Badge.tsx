import React, { ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import { ResponsiveProp } from '../../types';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import styles from './Badge.module.scss';
import { Box, BoxProps } from '../Box/Box';

export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgeVariant =
  | 'light-grey'
  | 'dark-grey'
  | 'inverse'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'red'
  | 'purple'
  | 'orange'
  | 'hyphen';

export interface BadgeProps extends BoxProps {
  /**
   * @deprecated Use children instead. The text message or ReactNode to be rendered in the badge.
   */
  message?: string | ReactNode;
  /**
   * The size of the badge.
   */
  size?: BadgeSize | ResponsiveProp<BadgeSize>;
  /**
   * The type/color of the badge to show.
   */
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className = '',
      message = '',
      variant = 'light-grey',
      size = 'md',
      children,
      ...restProps
    },
    ref
  ) => {
    const responsiveClasses = generateResponsiveClasses('size', size).map(
      (c) => styles[c]
    );

    const badgeClasses: string = classNames(
      styles.badge,
      className,
      responsiveClasses,
      {
        [styles[variant]]: variant,
      }
    );

    return (
      <Box
        ref={ref}
        className={badgeClasses}
        display="inline-flex"
        alignItems="center"
        direction="row"
        {...restProps}
      >
        {children || message}
      </Box>
    );
  }
);

Badge.displayName = 'Badge';
