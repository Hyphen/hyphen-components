import React, { Children, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import { ResponsiveProp } from '../../types';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import styles from './Badge.module.scss';
import { Box, BoxProps } from '../Box/Box';

export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgeVariant = 'solid' | 'soft' | 'surface' | 'outline';

export type BadgeHue =
  | 'grey'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'red'
  | 'purple'
  | 'orange'
  | 'brand';

export type BadgeSemanticColor = 'danger' | 'success' | 'warning' | 'info';

export type BadgeColor = BadgeHue | BadgeSemanticColor;

export type BadgeRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

/**
 * Semantic color names resolve to a hue, so `color="danger"` and `color="red"` render identically.
 * Retheming a semantic color is a change here rather than at every call site.
 */
const BADGE_COLOR_ALIASES: Record<BadgeSemanticColor, BadgeHue> = {
  danger: 'red',
  success: 'green',
  warning: 'yellow',
  info: 'blue',
};

/**
 * Wraps bare text in an element so the stylesheet can tell a label from a nested graphic.
 * Text nodes are invisible to `:first-child` / `:last-child`, so without this an icon could
 * not be identified as leading or trailing.
 */
const renderBadgeChildren = (children: ReactNode) =>
  Children.map(children, (child) =>
    typeof child === 'string' || typeof child === 'number' ? (
      <span className={styles.label}>{child}</span>
    ) : (
      child
    )
  );

export interface BadgeProps extends Omit<BoxProps, 'color' | 'radius'> {
  /**
   * The color of the badge. Accepts a hue, or one of the semantic names
   * (`danger`, `success`, `warning`, `info`) which map onto `red`, `green`, `yellow` and `blue`.
   */
  color?: BadgeColor;
  /**
   * The roundness of the badge's corners.
   */
  radius?: BadgeRadius;
  /**
   * The size of the badge.
   */
  size?: BadgeSize | ResponsiveProp<BadgeSize>;
  /**
   * The visual style of the badge. Use `color` to set its color.
   */
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className = '',
      color = 'grey',
      radius = 'full',
      variant = 'soft',
      size = 'md',
      children,
      ...restProps
    },
    ref
  ) => {
    const responsiveClasses = generateResponsiveClasses('size', size).map(
      (c) => styles[c]
    );

    const hue = BADGE_COLOR_ALIASES[color as BadgeSemanticColor] ?? color;

    const badgeClasses: string = classNames(
      styles.badge,
      className,
      responsiveClasses,
      styles[variant],
      styles[`color-${hue}`],
      styles[`radius-${radius}`]
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
        {renderBadgeChildren(children)}
      </Box>
    );
  }
);

Badge.displayName = 'Badge';
