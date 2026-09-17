import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { Box, BoxProps } from '../Box/Box';

const AlignmentContext = createContext<'start' | 'end'>('start');
const useClientLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export interface MessageProps extends Omit<BoxProps, 'align'> {
  /** The sender's side of the conversation. Surface styling belongs to the content. */
  align?: 'start' | 'end';
}

export const MessageRoot = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ align = 'start', style, ...props }, ref) => (
    <AlignmentContext.Provider value={align}>
      <Box
        ref={ref}
        direction={align === 'end' ? 'row-reverse' : 'row'}
        alignItems="flex-end"
        gap="md"
        width="100"
        minWidth="0"
        data-message-align={align}
        style={
          { '--message-footer-offset': '0px', ...style } as React.CSSProperties
        }
        {...props}
      />
    </AlignmentContext.Provider>
  )
);
MessageRoot.displayName = 'Message';

export const MessageContent = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => (
    <Box ref={ref} minWidth="0" gap="sm" data-message-content="" {...props} />
  )
);
MessageContent.displayName = 'MessageContent';

export const MessageAvatar = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ style, ...props }, ref) => (
    <Box
      ref={ref}
      flex="none"
      alignSelf="flex-end"
      data-message-avatar=""
      style={{ marginBottom: 'var(--message-footer-offset, 0px)', ...style }}
      {...props}
    />
  )
);
MessageAvatar.displayName = 'MessageAvatar';

export const MessageHeader = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => {
    const align = useContext(AlignmentContext);
    return (
      <Box
        ref={ref}
        direction="row"
        gap="sm"
        fontSize="sm"
        justifyContent={align === 'end' ? 'flex-end' : 'flex-start'}
        {...props}
      />
    );
  }
);
MessageHeader.displayName = 'MessageHeader';

export const MessageFooter = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => {
    const align = useContext(AlignmentContext);
    const footerRef = useRef<HTMLDivElement | null>(null);
    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        footerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    useClientLayoutEffect(() => {
      const footer = footerRef.current;
      const root = footer?.closest<HTMLElement>('[data-message-align]');
      const content = footer?.closest<HTMLElement>('[data-message-content]');
      if (!footer || !root || !content) return;

      const measure = () => {
        // Keep the avatar level with the surface, including when footer actions
        // wrap or metadata expands. Preserve the caller's content wrapper/DOM.
        const gap = parseFloat(getComputedStyle(content).rowGap) || 0;
        const margin = parseFloat(getComputedStyle(footer).marginTop) || 0;
        const offset = Math.max(
          0,
          content.getBoundingClientRect().bottom -
            footer.getBoundingClientRect().top +
            gap +
            margin
        );
        root.style.setProperty('--message-footer-offset', `${offset}px`);
      };
      measure();
      const observer =
        typeof ResizeObserver === 'undefined'
          ? undefined
          : new ResizeObserver(measure);
      observer?.observe(footer);
      observer?.observe(content);
      window.addEventListener('resize', measure);
      return () => {
        observer?.disconnect();
        window.removeEventListener('resize', measure);
        root.style.setProperty('--message-footer-offset', '0px');
      };
    }, []);

    return (
      <Box
        ref={setRef}
        direction="row"
        gap="sm"
        fontSize="xs"
        color="tertiary"
        alignSelf={align === 'end' ? 'flex-end' : 'flex-start'}
        justifyContent={align === 'end' ? 'flex-end' : 'flex-start'}
        {...props}
      />
    );
  }
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
