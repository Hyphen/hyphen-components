import React, { FC } from 'react';
import { Box, BoxProps } from '../../../Box/Box';
import { Button } from '../../../Button/Button';

export type ModalHeaderProps = Omit<
  BoxProps,
  'as' | 'radius' | 'justifyContent'
> & {
  /**
   * id of the element containing the title, used by the Modal `aria-labelledby` prop
   */
  id: string;
  /**
   * Modal's header title
   */
  title?: string;
  /**
   * Additional content to render in the modal header, displayed alongside the title.
   */
  children?: React.ReactNode;
  /**
   * If defined, will render a 'x' close button on the right side of the ModalHeader
   */
  onDismiss?: (event?: React.SyntheticEvent) => void;
};

export const ModalHeader: FC<ModalHeaderProps> = ({
  id,
  onDismiss,
  direction = 'row',
  alignItems = 'center',
  title = undefined,
  children,
  style,
  ...restProps
}) => {
  const justifyContentValue = title || children ? 'space-between' : 'flex-end';

  return (
    <Box
      direction={direction}
      alignItems={alignItems}
      justifyContent={justifyContentValue}
      gap="3xl"
      style={{
        flexShrink: 0,
        ...style,
      }}
      {...restProps}
    >
      {(title || children) && (
        <Box gap="2xs">
          {title && (
            <Box as="h4" fontSize={{ base: 'md', tablet: 'lg' }} id={id}>
              {title}
            </Box>
          )}
          {children}
        </Box>
      )}
      {onDismiss && (
        <Button
          aria-label="close"
          variant="tertiary"
          onClick={onDismiss}
          iconPrefix="remove"
          size="sm"
          type="button"
        />
      )}
    </Box>
  );
};
