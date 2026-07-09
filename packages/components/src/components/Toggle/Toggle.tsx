import React, { forwardRef } from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import styles from './Toggle.module.scss';

import classNames from 'classnames';

type ToggleVariant = 'default' | 'outline';

type ToggleProps = React.ComponentPropsWithoutRef<
  typeof TogglePrimitive.Root
> & {
  variant?: ToggleVariant;
};

const Toggle = forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant = 'default', children, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={classNames(
      'br-sm display-flex g-sm p-sm',
      styles.item,
      variant === 'outline' && styles.outline,
      className
    )}
    {...props}
  >
    {children}
  </TogglePrimitive.Root>
));

Toggle.displayName = 'Toggle';

export { Toggle };
