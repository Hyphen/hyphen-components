import React, { createContext, useContext, forwardRef, ReactNode } from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import styles from './ToggleGroup.module.scss';

import classNames from 'classnames';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';

type ToggleVariant = 'default' | 'outline';

const ToggleGroupContext = createContext<{ variant: ToggleVariant }>({
  variant: 'default',
});

type ToggleGroupProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Root
> & {
  variant?: ToggleVariant;
  name?: string;
  /**
   * Mark the toggle group as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: ReactNode;
};

const ToggleGroup = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, variant = 'default', children, error, ...props }, ref) => (
  <div>
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={classNames(
        'display-flex align-items-center justify-content-start g-xs',
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>

    {error && <InputValidationMessage>{error}</InputValidationMessage>}
  </div>
));

type ToggleGroupItemProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Item
> & {
  variant?: ToggleVariant;
};

const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, children, value, variant, ...props }, ref) => {
  const { variant: contextVariant } = useContext(ToggleGroupContext);
  const appliedVariant = variant || contextVariant;

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={classNames(
        styles.item,
        appliedVariant === 'outline' && styles.outline,
        className
      )}
      value={value}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
