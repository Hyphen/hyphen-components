import React, { forwardRef, ReactElement } from 'react';
import classNames from 'classnames';
import { Box, BoxElement, BoxProps, BoxRef } from '../Box/Box';
import styles from './Marker.module.scss';

export type MarkerProps<T extends BoxElement = 'div'> = BoxProps<T> & {
  /** Inline note, bottom-bordered row, or centered labeled divider. */
  variant?: 'default' | 'border' | 'separator';
};

type MarkerComponent = {
  <T extends BoxElement>(
    props: MarkerProps<T> & { as: T; ref?: BoxRef<T> }
  ): ReactElement | null;
  (props: MarkerProps & { ref?: BoxRef<'div'> }): ReactElement | null;
  displayName?: string;
};

const MarkerBase = <T extends BoxElement = 'div'>(
  { variant = 'default', className, ...props }: MarkerProps<T>,
  ref: BoxRef<T>
) => (
  <Box
    direction="row"
    alignItems="center"
    gap="md"
    width="100"
    minWidth="0"
    color="secondary"
    fontSize="sm"
    padding="md 0"
    {...props}
    ref={ref}
    data-marker=""
    data-variant={variant}
    className={classNames(styles.marker, styles[variant], className)}
  />
);

// Preserve Box's polymorphic element props and ref types across forwardRef.
const MarkerRoot = forwardRef(MarkerBase as never) as MarkerComponent;
MarkerRoot.displayName = 'Marker';

export const MarkerIcon = forwardRef<HTMLSpanElement, BoxProps<'span'>>(
  (props, ref) => (
    <Box
      as="span"
      flex="none"
      alignItems="center"
      justifyContent="center"
      {...props}
      ref={ref}
      data-marker-icon=""
      aria-hidden="true"
    />
  )
);
MarkerIcon.displayName = 'Marker.Icon';

export const MarkerContent = forwardRef<HTMLSpanElement, BoxProps<'span'>>(
  ({ className, ...props }, ref) => (
    <Box
      as="span"
      display="block"
      minWidth="0"
      {...props}
      ref={ref}
      data-marker-content=""
      className={classNames(styles.content, className)}
    />
  )
);
MarkerContent.displayName = 'Marker.Content';

export const Marker = Object.assign(MarkerRoot, {
  Icon: MarkerIcon,
  Content: MarkerContent,
});
