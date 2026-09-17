import React, { useEffect, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect';

export interface SidebarResizeProps {
  /** Enable desktop resizing with SidebarRail. Disabled by default. */
  resizable?: boolean;
  /** Initial expanded width in pixels. Defaults to 256 left / 384 right. */
  defaultWidth?: number;
  /** Minimum expanded width in pixels. Defaults to 256. */
  minWidth?: number;
  /** Maximum expanded width in pixels, also capped at 2/3 of the provider. */
  maxWidth?: number;
  /** Optional localStorage key for the preferred expanded width. */
  widthStorageKey?: string;
}

export function useSidebarResize({
  resizable = false,
  defaultWidth,
  minWidth = 256,
  maxWidth = 960,
  widthStorageKey,
  side,
  isMobile,
  expanded,
  rootRef,
}: SidebarResizeProps & {
  side: 'left' | 'right';
  isMobile: boolean;
  expanded: boolean;
  rootRef: React.RefObject<HTMLDivElement>;
}) {
  const initialWidth = defaultWidth ?? (side === 'left' ? 256 : 384);
  const [preferredWidth, setPreferredWidth] = useState(initialWidth);
  const [containerWidth, setContainerWidth] = useState<number>(Infinity);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef<{
    id: number;
    x: number;
    width: number;
    preferred: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const currentWidth = useRef(preferredWidth);
  const enabled = resizable && !isMobile && expanded;
  const maximum = Math.max(0, Math.min(maxWidth, containerWidth * (2 / 3)));
  const minimum = Math.min(Math.max(0, minWidth), maximum);
  const clamp = (value: number) => Math.max(minimum, Math.min(maximum, value));
  const width = clamp(preferredWidth);
  const [settledWidth, setSettledWidth] = useState(width);

  // Restore and measure before paint so the first frame uses the saved width.
  useIsomorphicLayoutEffect(() => {
    if (!resizable) return;
    let savedWidth = initialWidth;
    try {
      const saved = widthStorageKey && localStorage.getItem(widthStorageKey);
      if (saved && Number.isFinite(Number(saved)) && Number(saved) > 0) {
        savedWidth = Number(saved);
      }
    } catch {
      // Resizing still works when browser storage is unavailable.
    }
    setPreferredWidth(savedWidth);
  }, [resizable, initialWidth, widthStorageKey]);

  useIsomorphicLayoutEffect(() => {
    if (!resizable || isMobile) return;
    const container = rootRef.current?.closest('[data-sidebar-provider]');
    if (!container) return;
    const measure = () =>
      setContainerWidth(container.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [resizable, isMobile, rootRef]);

  // Only expanding and collapsing animate. A width change (restore, container
  // cap, keyboard, drag release) is committed with transitions off; flushing
  // styles at that width lets the next render turn them back on without the
  // browser animating from the old width.
  useIsomorphicLayoutEffect(() => {
    if (dragging || width === settledWidth) return;
    rootRef.current?.getBoundingClientRect();
    setSettledWidth(width);
  }, [dragging, width, settledWidth, rootRef]);

  useEffect(() => {
    if (!enabled) {
      gesture.current = null;
      setDragging(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!dragging) return;
    const { cursor, userSelect } = document.body.style;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    return () => {
      document.body.style.cursor = cursor;
      document.body.style.userSelect = userSelect;
    };
  }, [dragging]);

  const update = (next: number) => {
    currentWidth.current = clamp(next);
    setPreferredWidth(currentWidth.current);
  };
  const persist = () => {
    if (!widthStorageKey) return;
    try {
      localStorage.setItem(widthStorageKey, String(currentWidth.current));
    } catch {
      // A storage failure must not interrupt the interaction.
    }
  };
  const cancel = () => {
    if (!gesture.current) return;
    setPreferredWidth(gesture.current.preferred);
    gesture.current = null;
    setDragging(false);
  };

  const railProps: React.ComponentProps<'button'> = {
    onPointerDown: (event) => {
      suppressClick.current = false;
      if (!enabled || event.button !== 0 || gesture.current) return;
      gesture.current = {
        id: event.pointerId,
        x: event.clientX,
        width,
        preferred: preferredWidth,
        moved: false,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    onPointerMove: (event) => {
      const start = gesture.current;
      if (!start || start.id !== event.pointerId) return;
      const delta = event.clientX - start.x;
      if (!start.moved && Math.abs(delta) < 4) return;
      start.moved = true;
      suppressClick.current = true;
      setDragging(true);
      update(start.width + (side === 'left' ? delta : -delta));
    },
    onPointerUp: (event) => {
      const start = gesture.current;
      if (!start || start.id !== event.pointerId) return;
      if (start.moved) {
        update(
          start.width + (side === 'left' ? 1 : -1) * (event.clientX - start.x)
        );
        persist();
      }
      gesture.current = null;
      setDragging(false);
      event.currentTarget.releasePointerCapture(event.pointerId);
    },
    onPointerCancel: cancel,
    onLostPointerCapture: cancel,
    onClickCapture: (event) => {
      if (suppressClick.current && event.detail !== 0) {
        event.preventDefault();
        event.stopPropagation();
        suppressClick.current = false;
      }
    },
    onKeyDown: (event) => {
      if (!enabled) return;
      let next: number;
      switch (event.key) {
        case 'ArrowLeft':
          next = width + (side === 'left' ? -10 : 10);
          break;
        case 'ArrowRight':
          next = width + (side === 'left' ? 10 : -10);
          break;
        case 'Home':
          next = minimum;
          break;
        case 'End':
          next = maximum;
          break;
        default:
          return;
      }
      event.preventDefault();
      update(next);
      persist();
    },
  };

  return {
    width,
    animate: !dragging && width === settledWidth,
    enabled,
    railProps,
  };
}

export const SidebarResizeContext = React.createContext<ReturnType<
  typeof useSidebarResize
> | null>(null);
