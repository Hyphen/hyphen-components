import React from 'react';
import { Box, BoxProps } from '../Box/Box';

export interface MessageProps extends Omit<BoxProps, 'align'> {
  /** The sender's side of the conversation. Surface styling belongs to the content. */
  align?: 'start' | 'end';
}

export const MessageRoot = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ align = 'start', ...props }, ref) => (
    <Box
      ref={ref}
      direction={align === 'end' ? 'row-reverse' : 'row'}
      alignItems="flex-start"
      gap="md"
      width="100"
      minWidth="0"
      data-message-align={align}
      {...props}
    />
  )
);
MessageRoot.displayName = 'Message';

export const MessageContent = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => <Box ref={ref} minWidth="0" gap="sm" {...props} />
);
MessageContent.displayName = 'MessageContent';

export const MessageAvatar = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => <Box ref={ref} flex="none" {...props} />
);
MessageAvatar.displayName = 'MessageAvatar';

export const MessageHeader = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => (
    <Box ref={ref} direction="row" gap="sm" fontSize="sm" {...props} />
  )
);
MessageHeader.displayName = 'MessageHeader';

export const MessageFooter = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => (
    <Box
      ref={ref}
      direction="row"
      gap="sm"
      fontSize="xs"
      color="tertiary"
      {...props}
    />
  )
);
MessageFooter.displayName = 'MessageFooter';

export const MessageGroup = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => <Box ref={ref} gap="sm" {...props} />
);
MessageGroup.displayName = 'MessageGroup';

export const Message = Object.assign(MessageRoot, {
  Avatar: MessageAvatar,
  Content: MessageContent,
  Header: MessageHeader,
  Footer: MessageFooter,
  Group: MessageGroup,
});
