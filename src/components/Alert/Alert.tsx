import React, {
  FC,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  memo,
} from 'react';
import classNames from 'classnames';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import styles from './Alert.module.scss';
import { AlertVariant } from './Alert.types';
import { ALERT_ICONS_MAP } from './Alert.constants';

export interface AlertProps {
  /**
   * Custom class to apply to the alert.
   */
  className?: string;
  /**
   * Whether the alert as an icon that corresponds to its variant (Success, warning, etc.).
   */
  hasIcon?: boolean;
  /**
   * Renders a version of the alert with smaller padding.
   */
  isCompact?: boolean;
  /**
   * @deprecated Use children instead. The text message or ReactNode to be rendered in the alert.
   */
  message?: string | ReactNode;
  /**
   * Whether the alert can be closed by the user. If `true` it will render
   * the 'close' icon on the right hand side of the alert.
   */
  onClose?: (
    event: MouseEvent<HTMLOrSVGElement> | KeyboardEvent<HTMLSpanElement>
  ) => void;
  /**
   * A render function that returns JSX if preferred over a static ReactNode or string.
   */
  render?: () => ReactNode;
  /**
   * The title for the alert.
   */
  title?: string;
  /**
   * The type/color of the alert to show.
   */
  variant?: AlertVariant;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

const AlertComponent: FC<AlertProps> = ({
  children,
  className = '',
  hasIcon = false,
  isCompact = false,
  message = '',
  onClose = undefined,
  render = undefined,
  title = '',
  variant = 'default',
  ...restProps
}) => {
  const handleClose = useCallback(
    (
      event: MouseEvent<HTMLOrSVGElement> | KeyboardEvent<HTMLSpanElement>
    ): void => {
      if (!onClose) return;

      onClose(event);
    },
    [onClose]
  );

  const handleCloseKeyPress = useCallback(
    (event: KeyboardEvent<HTMLSpanElement>): void => {
      if (event.keyCode === 13) handleClose(event);
    },
    [handleClose]
  );

  const alertContainerClasses = useMemo(
    () => classNames(styles[`alert__${variant}`], styles.alert, className),
    [variant, className]
  );

  const alertIcon = useMemo(() => {
    if (!hasIcon) return null;

    return (
      <Box fontSize="md" className={styles[`alert__icon__${variant}`]}>
        <Icon
          name={ALERT_ICONS_MAP[variant].icon}
          data-testid={`alert-icon-${variant}-test-id`}
        />
      </Box>
    );
  }, [hasIcon, variant]);

  const closeIcon = useMemo(() => {
    if (!onClose) return null;

    return (
      <Box
        margin="0 0 0 auto"
        color="secondary"
        className={styles['close-icon']}
      >
        <button
          type="button"
          onClick={handleClose}
          onKeyUp={handleCloseKeyPress}
          aria-label="dismiss"
        >
          <Icon name="remove" data-testid="alert-close-icon-test-id" />
        </button>
      </Box>
    );
  }, [onClose, handleClose, handleCloseKeyPress]);

  const content = useMemo(() => {
    if (render) {
      return render();
    }

    return (
      <Box display="block" childGap={message && title ? '2xs' : undefined}>
        {title && (
          <Box
            as="h4"
            fontSize="sm"
            fontWeight="semibold"
            className={styles['alert-heading']}
          >
            {title}
          </Box>
        )}
        {children ||
          (message &&
            (typeof message === 'string' ? <p>{message}</p> : message))}
      </Box>
    );
  }, [render, message, title, children]);

  return (
    <Box
      alignItems="flex-start"
      gap="md"
      className={alertContainerClasses}
      direction="row"
      padding={isCompact ? 'md' : '2xl'}
      radius="md"
      role="alert"
      fontSize="sm"
      {...restProps}
    >
      {alertIcon}
      <div>{content}</div>
      {closeIcon}
    </Box>
  );
};

export const Alert = memo(AlertComponent);
