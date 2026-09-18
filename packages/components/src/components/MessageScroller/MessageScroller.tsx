import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box, BoxProps } from '../Box/Box';
import { Button, ButtonProps } from '../Button/Button';

const useClientLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export interface MessageScrollerProps {
  children?: React.ReactNode;
  /** Initial position. Key the provider by conversation ID to reset it. */
  defaultScrollPosition?: 'start' | 'end' | 'last-anchor';
  /** Delay initial positioning until saved messages have loaded. */
  ready?: boolean;
  /** Follow growing content only after reaching or jumping to the live edge. */
  followOutput?: boolean;
  preserveScrollOnPrepend?: boolean;
  scrollMargin?: number;
  scrollPreviousItemPeek?: number;
  scrollEdgeThreshold?: number;
}

export interface MessageScrollOptions {
  behavior?: ScrollBehavior;
  align?: 'start' | 'center' | 'end' | 'nearest';
}

interface ScrollerContext {
  viewport: HTMLDivElement | null;
  setViewport: (node: HTMLDivElement | null) => void;
  content: HTMLDivElement | null;
  setContent: (node: HTMLDivElement | null) => void;
  spacer: React.MutableRefObject<HTMLDivElement | null>;
  scrollToStart: (options?: MessageScrollOptions) => boolean;
  scrollToEnd: (options?: MessageScrollOptions) => boolean;
  scrollToMessage: (id: string, options?: MessageScrollOptions) => boolean;
  scrollable: { start: boolean; end: boolean };
}

const Context = createContext<ScrollerContext | null>(null);
const useScrollerContext = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error('MessageScroller parts must be inside MessageScroller.');
  return context;
};

export const useMessageScroller = () => {
  const { scrollToStart, scrollToEnd, scrollToMessage } = useScrollerContext();
  return { scrollToStart, scrollToEnd, scrollToMessage };
};
export const useMessageScrollerScrollable = () =>
  useScrollerContext().scrollable;

const MessageScrollerRoot = ({
  children,
  defaultScrollPosition = 'start',
  ready = true,
  followOutput = true,
  preserveScrollOnPrepend = true,
  scrollMargin = 0,
  scrollPreviousItemPeek = 64,
  scrollEdgeThreshold = 8,
}: MessageScrollerProps) => {
  const [viewportNode, setViewportNode] = useState<HTMLDivElement | null>(null);
  const [contentNode, setContentNode] = useState<HTMLDivElement | null>(null);
  const spacer = useRef<HTMLDivElement | null>(null);
  const following = useRef(false);
  const initialized = useRef(false);
  const history = useRef<{ ids: string[]; anchor?: string }>({ ids: [] });
  const visibleRef = useRef<{ id: string; top: number; scrollTop: number }>();
  const [scrollable, setScrollable] = useState({ start: false, end: false });
  const refresh = useRef<() => void>(() => undefined);

  const move = useCallback(
    (top: number, behavior: ScrollBehavior = 'auto') => {
      const node = viewportNode;
      if (!node) return false;
      const reducedMotion = window.matchMedia?.(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      node.scrollTo({
        top: Math.max(0, top),
        behavior: reducedMotion ? 'auto' : behavior,
      });
      refresh.current();
      return true;
    },
    [viewportNode]
  );

  const scrollToStart = useCallback(
    (options?: MessageScrollOptions) => {
      following.current = false;
      return move(0, options?.behavior);
    },
    [move]
  );

  const scrollToEnd = useCallback(
    (options?: MessageScrollOptions) => {
      const node = viewportNode;
      const list = contentNode;
      if (!node || !list) return false;
      following.current = true;
      const bottom =
        list.getBoundingClientRect().bottom -
        node.getBoundingClientRect().top -
        node.clientTop +
        node.scrollTop;
      return move(
        bottom -
          node.clientHeight +
          (parseFloat(getComputedStyle(node).paddingBottom) || 0) +
          scrollMargin,
        options?.behavior
      );
    },
    [move, viewportNode, contentNode, scrollMargin]
  );

  const scrollToMessage = useCallback(
    (id: string, options?: MessageScrollOptions) => {
      const node = viewportNode;
      const item = Array.from(
        contentNode?.querySelectorAll<HTMLElement>('[data-message-id]') ?? []
      ).find((row) => row.dataset.messageId === id);
      if (!node || !item) return false;
      const rect = item.getBoundingClientRect();
      const top =
        rect.top -
        node.getBoundingClientRect().top -
        node.clientTop +
        node.scrollTop;
      const align = options?.align ?? 'start';
      following.current = false;
      if (
        align === 'nearest' &&
        top >= node.scrollTop &&
        top + rect.height <= node.scrollTop + node.clientHeight
      )
        return true;
      return move(
        top -
          (align === 'center'
            ? (node.clientHeight - rect.height) / 2
            : align === 'end' || (align === 'nearest' && top > node.scrollTop)
              ? node.clientHeight - rect.height - scrollMargin
              : scrollMargin),
        options?.behavior
      );
    },
    [move, scrollMargin, viewportNode, contentNode]
  );

  useClientLayoutEffect(() => {
    const node = viewportNode;
    const list = contentNode;
    const space = spacer.current;
    if (!node || !list || !space) {
      setScrollable((current) =>
        current.start || current.end ? { start: false, end: false } : current
      );
      return;
    }
    let frame = 0;
    let scrollFrame = 0;
    let previousIds = history.current.ids;
    let previousAnchor = history.current.anchor;
    let visible = visibleRef.current;
    let lastScrollTop = node.scrollTop;
    let userScrolling = false;

    const rows = () =>
      Array.from(list.querySelectorAll<HTMLElement>('[data-message-id]'));
    const topOf = (item: HTMLElement) =>
      item.getBoundingClientRect().top -
      node.getBoundingClientRect().top -
      node.clientTop +
      node.scrollTop;
    const remember = () => {
      const item = rows().find(
        (row) =>
          topOf(row) + row.getBoundingClientRect().height > node.scrollTop
      );
      visible = item
        ? {
            id: item.dataset.messageId!,
            top: topOf(item) - node.scrollTop,
            scrollTop: node.scrollTop,
          }
        : undefined;
      visibleRef.current = visible;
    };
    const distanceToEnd = () =>
      topOf(list) +
      list.getBoundingClientRect().height +
      (parseFloat(getComputedStyle(node).paddingBottom) || 0) +
      scrollMargin -
      node.clientHeight -
      node.scrollTop;
    const updateState = (endDistance = distanceToEnd()) => {
      const next = {
        start: node.scrollTop > scrollEdgeThreshold,
        end: endDistance > scrollEdgeThreshold,
      };
      setScrollable((current) =>
        current.start === next.start && current.end === next.end
          ? current
          : next
      );
      remember();
    };
    refresh.current = () => updateState();

    const measure = () => {
      frame = 0;
      if (!ready || node.clientHeight === 0) return;
      const items = rows();
      const ids = items.map((item) => item.dataset.messageId!);
      const anchors = items.filter(
        (item) => item.dataset.scrollAnchor === 'true'
      );
      const anchor = anchors[anchors.length - 1];
      const anchorId = anchor?.dataset.messageId;
      const naturalBottom = topOf(list) + list.getBoundingClientRect().height;
      const anchorTop = anchor
        ? Math.max(0, topOf(anchor) - scrollMargin - scrollPreviousItemPeek)
        : 0;
      // Trailing space lets a short new turn reach the reading line. As its
      // response grows, the space shrinks without moving the reader.
      const paddingBottom =
        parseFloat(getComputedStyle(node).paddingBottom) || 0;
      // Keep the end inset scrollable even when there is no user-turn anchor.
      const spaceHeight = Math.max(
        0,
        scrollMargin,
        anchor
          ? anchorTop + node.clientHeight - naturalBottom - paddingBottom
          : 0
      );
      const height = `${spaceHeight}px`;
      if (space.style.height !== height) space.style.height = height;

      if (!initialized.current) {
        initialized.current = true;
        if (defaultScrollPosition === 'last-anchor' && anchor) move(anchorTop);
        else if (defaultScrollPosition === 'end' && items.length) scrollToEnd();
      } else if (
        anchor &&
        anchorId !== previousAnchor &&
        !previousIds.includes(anchorId!) &&
        (previousIds.length === 0 ||
          (ids.indexOf(anchorId!) >
            ids.indexOf(
              previousAnchor ?? previousIds[previousIds.length - 1]
            ) &&
            ids.includes(
              previousAnchor ?? previousIds[previousIds.length - 1]
            )))
      ) {
        following.current = false;
        userScrolling = false;
        move(anchorTop);
      } else if (
        preserveScrollOnPrepend &&
        visible &&
        previousIds[0] &&
        ids.indexOf(previousIds[0]) > 0
      ) {
        const item = items.find((row) => row.dataset.messageId === visible?.id);
        if (item) {
          // A scroll may arrive before the next measurement frame. Include that
          // movement when preserving a snapshot taken before a same-frame prepend.
          move(topOf(item) - visible.top + node.scrollTop - visible.scrollTop);
        }
      } else if (following.current && followOutput) {
        scrollToEnd();
      }
      previousIds = ids;
      previousAnchor = anchorId;
      history.current = { ids, anchor: anchorId };
      updateState();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const interrupt = () => {
      following.current = false;
      userScrolling = true;
      // Cancel any in-flight smooth jump when the reader interacts.
      node.scrollTo({ top: node.scrollTop, behavior: 'auto' });
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End',
          ' ',
          'Tab',
        ].includes(event.key) ||
        event.ctrlKey ||
        event.metaKey
      )
        interrupt();
    };
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const scrollTop = node.scrollTop;
        // Read current styles once per scroll frame: viewport/ancestor style
        // changes are not all covered by the transcript's mutation observer.
        const endDistance = distanceToEnd();
        if (
          userScrolling &&
          scrollTop > lastScrollTop &&
          endDistance <= scrollEdgeThreshold
        )
          following.current = true;
        lastScrollTop = scrollTop;
        if (frame) {
          // Process pending transcript changes before replacing the visible-row
          // snapshot with measurements from the newly prepended content.
          cancelAnimationFrame(frame);
          measure();
        } else {
          updateState(endDistance);
        }
      });
    };
    const onSelection = () => {
      const selection = window.getSelection();
      if (
        selection &&
        !selection.isCollapsed &&
        node.contains(selection.anchorNode)
      )
        interrupt();
    };
    node.addEventListener('scroll', onScroll, { passive: true });
    node.addEventListener('wheel', interrupt, { passive: true });
    node.addEventListener('touchstart', interrupt, { passive: true });
    node.addEventListener('pointerdown', interrupt);
    node.addEventListener('keydown', onKeyDown);
    document.addEventListener('selectionchange', onSelection);
    const resize =
      typeof ResizeObserver === 'undefined'
        ? undefined
        : new ResizeObserver(schedule);
    resize?.observe(node);
    resize?.observe(list);
    const mutation = new MutationObserver(schedule);
    mutation.observe(list, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['data-message-id', 'data-scroll-anchor'],
    });
    window.addEventListener('resize', schedule);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame);
      resize?.disconnect();
      mutation.disconnect();
      node.removeEventListener('scroll', onScroll);
      node.removeEventListener('wheel', interrupt);
      node.removeEventListener('touchstart', interrupt);
      node.removeEventListener('pointerdown', interrupt);
      node.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('selectionchange', onSelection);
      window.removeEventListener('resize', schedule);
      refresh.current = () => undefined;
    };
  }, [
    viewportNode,
    contentNode,
    ready,
    defaultScrollPosition,
    followOutput,
    preserveScrollOnPrepend,
    scrollMargin,
    scrollPreviousItemPeek,
    scrollEdgeThreshold,
    move,
    scrollToEnd,
  ]);

  const value = useMemo(
    () => ({
      viewport: viewportNode,
      setViewport: setViewportNode,
      content: contentNode,
      setContent: setContentNode,
      spacer,
      scrollToStart,
      scrollToEnd,
      scrollToMessage,
      scrollable,
    }),
    [
      viewportNode,
      contentNode,
      scrollToStart,
      scrollToEnd,
      scrollToMessage,
      scrollable,
    ]
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
MessageScrollerRoot.displayName = 'MessageScroller';

const assignRef = <T,>(ref: React.ForwardedRef<T>, node: T | null) => {
  if (typeof ref === 'function') ref(node);
  else if (ref) ref.current = node;
};

export const MessageScrollerViewport = React.forwardRef<
  HTMLDivElement,
  BoxProps
>(({ children, style, ...props }, ref) => {
  const context = useScrollerContext();
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      context.setViewport(node);
      assignRef(ref, node);
    },
    [context.setViewport, ref]
  );
  const edges = [
    context.scrollable.start && 'start',
    context.scrollable.end && 'end',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <Box
      ref={setRef}
      role="region"
      aria-label="Messages"
      tabIndex={0}
      display="block"
      overflow="auto"
      minHeight="0"
      minWidth="0"
      flex="auto"
      data-scrollable={edges || undefined}
      style={{ overflowAnchor: 'none', ...style }}
      {...props}
    >
      {children}
      <div
        ref={context.spacer}
        aria-hidden="true"
        style={{ height: 0, pointerEvents: 'none' }}
      />
    </Box>
  );
});
MessageScrollerViewport.displayName = 'MessageScrollerViewport';

export const MessageScrollerContent = React.forwardRef<
  HTMLDivElement,
  BoxProps
>((props, ref) => {
  const { setContent } = useScrollerContext();
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      setContent(node);
      assignRef(ref, node);
    },
    [setContent, ref]
  );
  return (
    <Box
      ref={setRef}
      role="log"
      aria-relevant="additions"
      gap="2xl"
      {...props}
    />
  );
});
MessageScrollerContent.displayName = 'MessageScrollerContent';

export interface MessageScrollerItemProps extends BoxProps {
  messageId: string;
  scrollAnchor?: boolean;
}
export const MessageScrollerItem = React.forwardRef<
  HTMLDivElement,
  MessageScrollerItemProps
>(({ messageId, scrollAnchor = false, ...props }, ref) => (
  <Box
    ref={ref}
    minWidth="0"
    flex="none"
    {...props}
    data-message-id={messageId}
    data-scroll-anchor={scrollAnchor ? 'true' : 'false'}
  />
));
MessageScrollerItem.displayName = 'MessageScrollerItem';

export interface MessageScrollerButtonProps extends ButtonProps {
  direction?: 'start' | 'end';
  behavior?: ScrollBehavior;
}
export const MessageScrollerButton = React.forwardRef<
  HTMLButtonElement,
  MessageScrollerButtonProps
>(
  (
    {
      direction = 'end',
      behavior = 'smooth',
      children,
      onClick,
      style,
      disabled,
      ...props
    },
    ref
  ) => {
    const context = useScrollerContext();
    const active = context.scrollable[direction];
    return (
      <Button
        ref={ref}
        type="button"
        size="sm"
        variant="secondary"
        iconPrefix={
          children == null
            ? direction === 'end'
              ? 'arrow-down'
              : 'arrow-up'
            : undefined
        }
        aria-label={
          children == null
            ? direction === 'end'
              ? 'Jump to latest'
              : 'Scroll up'
            : undefined
        }
        title={
          children == null
            ? direction === 'end'
              ? 'Jump to latest'
              : 'Scroll up'
            : undefined
        }
        {...props}
        disabled={disabled || !active}
        tabIndex={active ? props.tabIndex : -1}
        aria-hidden={active ? undefined : true}
        data-active={active ? 'true' : 'false'}
        style={{
          ...style,
          ...(!active ? { visibility: 'hidden', pointerEvents: 'none' } : {}),
        }}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            (direction === 'end' ? context.scrollToEnd : context.scrollToStart)(
              { behavior }
            );
          }
        }}
      >
        {children}
      </Button>
    );
  }
);
MessageScrollerButton.displayName = 'MessageScrollerButton';

export const MessageScroller = Object.assign(MessageScrollerRoot, {
  Viewport: MessageScrollerViewport,
  Content: MessageScrollerContent,
  Item: MessageScrollerItem,
  Button: MessageScrollerButton,
});
