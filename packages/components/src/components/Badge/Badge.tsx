import React, {
  Children,
  ReactElement,
  ReactNode,
  forwardRef,
} from 'react';
import classNames from 'classnames';
import { ResponsiveProp } from '../../types';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import styles from './Badge.module.scss';
import { Box, BoxElement, BoxProps, BoxRef } from '../Box/Box';

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

interface BadgeOwnProps {
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

export type BadgeProps<T extends BoxElement = 'div'> = BadgeOwnProps &
  Omit<BoxProps<T>, keyof BadgeOwnProps>;

type BadgeComponent = {
  <T extends BoxElement>(
    props: BadgeProps<T> & { as: T; ref?: BoxRef<T> }
  ): ReactElement | null;
  (props: BadgeProps<'div'> & { ref?: BoxRef<'div'> }): ReactElement | null;
  displayName?: string;
};

const BadgeBaseComponent = <T extends BoxElement = 'div'>(
  props: BadgeProps<T>,
  ref: BoxRef<T>
) => {
    const {
      className = '',
      color = 'grey',
      radius = 'full',
      variant = 'soft',
      size = 'md',
      children,
      ...restProps
    } = props as BadgeOwnProps & Omit<BoxProps<T>, keyof BadgeOwnProps>;
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

    const boxProps = {
      className: badgeClasses,
      display: 'inline-flex',
      alignItems: 'center',
      direction: 'row',
      ...restProps,
    } as BoxProps<T>;

    const badgeChildren = renderBadgeChildren(children);

    if (boxProps.as) {
      const boxPropsWithAs = boxProps as BoxProps<T> & { as: T };

      return (
        <Box<T> ref={ref} {...boxPropsWithAs}>
          {badgeChildren}
        </Box>
      );
    }

    return (
      <Box ref={ref as BoxRef<'div'>} {...(boxProps as BoxProps<'div'>)}>
        {badgeChildren}
      </Box>
    );
};

// React.forwardRef cannot preserve a generic `as` parameter, so restore the
// polymorphic call signature after wrapping the implementation.
export const Badge = forwardRef(BadgeBaseComponent as never) as BadgeComponent;

Badge.displayName = 'Badge';
