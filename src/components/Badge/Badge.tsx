import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import {
  BackgroundColor,
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
  | 'inverse'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'red'
  | 'purple'
  | 'hyphen';

export type BadgeColorAttributes = {
  font: FontColor;
  background: BackgroundColor;
};

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
    blue: { font: 'base', background: 'info' },
    inverse: { font: 'base', background: 'inverse' },
    green: { font: 'base', background: 'success' },
    red: { font: 'base', background: 'danger' },
    grey: { font: 'base', background: 'secondary' },
    yellow: { font: 'base', background: 'warning' },
    purple: { font: 'base', background: 'purple' },
    hyphen: { font: 'base', background: 'brand' },
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
