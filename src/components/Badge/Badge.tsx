import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import {
  BrandColor,
  FontColor,
  FontSize,
  BaseSpacing,
  ResponsiveProp,
} from '../../types';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import styles from './Badge.module.scss';
import { Box } from '../Box/Box';

export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgeVariant =
  | 'grey'
  | 'primary'
  | 'green'
  | 'purple'
  | 'yellow'
  | 'blue'
  | 'red';

export type BadgeColorAttributes = { font: FontColor; background: BrandColor };

export type BadgeSizeAttributes = { fontSize: FontSize; padding: BaseSpacing };
export interface BadgeProps {
  /**
   * Custom class to apply to the badge container div.
   */
  className?: string;
  /**
   * The text message or ReactNode to be rendered in the badge.
   */
  message?: string | ReactNode;
  /**
   * The size of the button.
   */
  size?: BadgeSize | ResponsiveProp<BadgeSize>;
  /**
   * The type/color of the badge to show.
   */
  variant?: BadgeVariant;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const BADGE_COLOR_MAP: { [key in BadgeVariant]: BadgeColorAttributes } =
  {
    blue: { font: 'grey-600', background: 'blue-100' },
    primary: { font: 'grey-600', background: 'primary-100' },
    green: { font: 'grey-600', background: 'green-100' },
    red: { font: 'grey-600', background: 'red-100' },
    purple: { font: 'grey-600', background: 'purple-100' },
    grey: { font: 'grey-600', background: 'grey-100' },
    yellow: { font: 'grey-600', background: 'yellow-100' },
  };

export const Badge: FC<BadgeProps> = ({
  className = '',
  message = '',
  variant = 'grey',
  size = 'md',
  ...restProps
}) => {
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
    <Box className={badgeClasses} display="inline-block" {...restProps}>
      {message}
    </Box>
  );
};
