import { BoxShadowSize, IconName, ResponsiveProp } from '../../types';
import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FocusEvent,
  MouseEvent,
  ReactNode,
  createElement,
  forwardRef,
} from 'react';

import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
import classNames from 'classnames';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import { getElementType } from '../../lib/getElementType';
import { handleReactRouterClick } from '../../lib/reactRouterClickHandler';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseButtonProps {
  /**
   * Contents of the button.
   */
  children?: ReactNode;
  /**
   * Additional ClassNames to add to button.
   */
  className?: string;
  /**
   * Button takes up the full width of its parent container.
   */
  fullWidth?: boolean;
  /**
   * Name of the icon to include before the button text
   */
  iconPrefix?: IconName;
  /**
   * Name of the icon to include after the button text
   */
  iconSuffix?: IconName;
  /**
   * A unique identifier for the button.
   */
  id?: string;
  /**
   * URL to navigate to when clicked. Passing this attribute automatically
   * renders an anchor <a> tag, NOT a <button> element.
   */
  href?: string;
  /**
   * Disables the button, making it inoperable.
   */
  isDisabled?: boolean;
  /**
   * Replaces the button text with a loading indicator and disables the button.
   */
  isLoading?: boolean;
  /**
   * Prop reserved for when component is wrapped by `<Link>` from react-router.
   */
  navigate?: () => void;
  /**
   * Callback when Button is pressed.
   */
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /**
   * Callback when focus leaves Button.
   */
  onBlur?: (event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /**
   * Callback when Button receives focus.
   */
  onFocus?: (event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /**
   * The size of the drop shadow applied to the Box
   */
  shadow?: BoxShadowSize | ResponsiveProp<BoxShadowSize>;
  /**
   * Specify the tabIndex of the button.
   */
  tabIndex?: number;
  /**
   * Useful when using button as an anchor tag.
   */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  /**
   * The size of the button.
   */
  size?: ButtonSize | ResponsiveProp<ButtonSize>;
  /**
   * The color variant of the button
   */
  variant?: ButtonVariant;
  /**
   * ref - currently cannot be typed due to limitations of using the `as` prop
   */
}

export type AnchorButtonProps = { as: 'a' } & BaseButtonProps &
  Omit<
    React.DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    'ref'
  >;

export type NormalButtonProps = { as?: 'button' } & BaseButtonProps &
  Omit<
    React.DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'ref'
  >;

export type ButtonProps = NormalButtonProps | AnchorButtonProps;

export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(
  (
    {
      children = undefined,
      as = 'button',
      className = '',
      fullWidth = false,
      id = undefined,
      href = undefined,
      iconPrefix = undefined,
      iconSuffix = undefined,
      isDisabled = false,
      isLoading = false,
      navigate = undefined,
      onClick = undefined,
      onFocus = undefined,
      onBlur = undefined,
      shadow = undefined,
      size = 'md',
      tabIndex = undefined,
      target = undefined,
      type = undefined,
      variant = 'primary',
      ...restProps
    },
    ref
  ) => {
    const disabled = isLoading || isDisabled;

    const responsiveClasses = generateResponsiveClasses('size', size).map(
      (c) => styles[c]
    );

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

    const handleClick = handleReactRouterClick;

    const handleFocus = (
      event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      if (onFocus) onFocus(event);
    };

    const handleBlur = (
      event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      if (onBlur) onBlur(event);
    };

    const buttonContent =
      iconPrefix || iconSuffix ? (
        <Box display="inline-flex" direction="row" alignItems="center" gap="md">
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
          {children && <span className={styles.label}>{children}</span>}
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
        </Box>
      ) : (
        <>
          {isLoading && <Spinner className={styles['spinner-wrapper']} />}
          {(() => {
            if (children) {
              return <span className={styles.label}>{children}</span>;
            }
            return null;
          })()}
        </>
      );

    const buttonElement = getElementType(Button, { as });

    return createElement(
      buttonElement,
      {
        ['aria-disabled']: disabled,
        id,
        href,
        className: buttonClasses,
        disabled,
        target: as === 'a' && href ? target : null,
        rel:
          as === 'a' && href && target === '_blank'
            ? 'noopener noreferrer'
            : null,
        onBlur: handleBlur,
        onClick: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) =>
          handleClick(event, onClick, target, navigate),
        onFocus: handleFocus,
        ref,
        type: type || (as !== 'a' && !href ? 'button' : undefined),
        tabIndex,
        ...restProps,
      },
      buttonContent
    );
  }
);
