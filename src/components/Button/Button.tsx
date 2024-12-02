import { BoxShadowSize, IconName, ResponsiveProp } from '../../types';
import { Slot, Slottable } from '@radix-ui/react-slot';
import React, { ButtonHTMLAttributes, FC, forwardRef } from 'react';

import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
import classNames from 'classnames';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseButtonProps {
  /**
   * The button element to render as. Useful for when you want to render a Link that looks like a button.
   */
  asChild?: boolean;
  /**
   * Additional ClassNames to add to button.
   */
  className?: string;
  /**
   * Button takes up the full width of its parent container.
   */
  fullWidth?: boolean;
  /**
   * Icon displayed before the button label
   */
  iconPrefix?: IconName;
  /**
   * Icon displayed after the button label
   */
  iconSuffix?: IconName;
  /**
   * Disables the button
   */
  isDisabled?: boolean;
  /**
   * Displays a loading spinner and disables the button
   */
  isLoading?: boolean;
  /**
   * Size of the drop shadow applied to the Box
   */
  shadow?: BoxShadowSize | ResponsiveProp<BoxShadowSize>;
  /**
   * Size of the button.
   */
  size?: ButtonSize | ResponsiveProp<ButtonSize>;
  /**
   * Visual variant of the button
   */
  variant?: ButtonVariant;
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    BaseButtonProps {}

export const Button: FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      asChild,
      children,
      className,
      fullWidth,
      iconPrefix,
      iconSuffix,
      isDisabled,
      isLoading,
      onClick,
      onBlur,
      onFocus,
      shadow,
      size = 'md',
      variant = 'primary',
      ...restProps
    },
    ref
  ) => {
    const disabled = isLoading || isDisabled;

    const responsiveClasses = generateResponsiveClasses('size', size)
      .map((c) => styles[c])
      .filter(Boolean);

    const buttonClasses = classNames(
      'hyphen-components__variables__form-control',
      styles.button,
      className,
      responsiveClasses,
      generateResponsiveClasses('shadow', shadow),
      {
        [styles.loading]: isLoading,
        [styles[variant]]: variant,
        [styles['full-width']]: fullWidth,
      }
    );

    const handleClick = !disabled ? onClick : undefined;
    const handleBlur = !disabled ? onBlur : undefined;
    const handleFocus = !disabled ? onFocus : undefined;

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        {...(disabled && { 'aria-disabled': true })}
        disabled={disabled}
        className={buttonClasses}
        onClick={handleClick}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={ref}
        {...restProps}
      >
        {isLoading && <Spinner className={styles['spinner-wrapper']} />}
        {iconPrefix && (
          <Icon
            className={styles.label}
            name={iconPrefix}
            aria-hidden="true"
            focusable="false"
            data-testid="prefixIcon"
            size={size === 'md' ? 'sm' : size}
          />
        )}
        {children && (
          <Slottable>
            {asChild ? (
              children
            ) : (
              <span className={styles.label}>{children}</span>
            )}
          </Slottable>
        )}

        {iconSuffix && (
          <Icon
            className={styles.label}
            name={iconSuffix}
            aria-hidden="true"
            focusable="false"
            data-testid="suffixIcon"
            size={size === 'md' ? 'sm' : size}
          />
        )}
      </Comp>
    );
  }
);
