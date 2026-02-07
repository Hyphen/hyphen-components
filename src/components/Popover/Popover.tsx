import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import classNames from 'classnames';
import styles from './Popover.module.scss';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverPortal = PopoverPrimitive.Portal;

const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  return (
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={classNames(styles.PopoverContent, className)}
      {...props}
    />
  );
});

PopoverContent.displayName = 'PopoverContent';

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverPortal,
  PopoverContent,
};
