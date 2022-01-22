import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  HTMLAttributes,
  useCallback
} from 'react';
import { useThemedFactory } from '../hooks';
import { ThemeProps } from '../models';

export interface ScrollProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {
  containerContentProps?: HTMLAttributes<HTMLDivElement> & ThemeProps;
  containerProps?: HTMLAttributes<HTMLDivElement> & ThemeProps;
  transformDelta?: (v: number) => number;
}

export const Scroll = forwardRef<HTMLDivElement, ScrollProps>(
  (
    {
      containerProps,
      containerContentProps,
      transformDelta,
      children,
      ...rest
    },
    ref
  ) => {
    const useThemed = useThemedFactory<{
      hasLeftOffset?: boolean;
      hasRightOffset?: boolean;
    }>();
    const ThemedScroll = useThemed('div', 'scroll');
    const ThemedScrollContainer = useThemed('div', 'scroll.container');
    const ThemedScrollContainerContent = useThemed(
      'div',
      'scroll.container.content'
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const [holder] = useState({} as any);
    const [hasLeftOffset, setHasLeftOffset] = useState(false);
    const [hasRightOffset, setHasRightOffset] = useState(false);
    const extraProps = { hasLeftOffset, hasRightOffset };

    const updateOffsets = () => {
      if (!containerRef.current) {
        return;
      }
      setHasLeftOffset(containerRef.current?.scrollLeft > 0);
      setHasRightOffset(
        containerRef.current.scrollLeft <
          containerRef.current.scrollWidth - containerRef.current.offsetWidth
      );
    };

    useEffect(() => {
      if (!containerRef.current) {
        return;
      }
      const resizeObserver = new ResizeObserver(updateOffsets);
      resizeObserver.observe(containerRef.current);
      updateOffsets();
    }, [containerRef.current]);

    const getHandlers = useCallback(
      (names: { [key: string]: string }, getX: (e: any) => number) => {
        const noopName = 'noop';
        const handlers = {
          [names.onCapture ?? noopName]: e => {
            if (holder.isMoving) {
              e.stopPropagation();
            }
            holder.isMoving = false;
          },
          [names.onStart ?? noopName]: e => {
            if (!containerRef.current) {
              return;
            }
            holder.isActive = true;
            holder.startX = getX(e) - containerRef.current.offsetLeft;
            holder.scrollLeft = containerRef.current.scrollLeft;
          },
          [names.onStop ?? noopName]: () => (holder.isActive = false),
          [names.onLeave ?? noopName]: () => (holder.isActive = false),
          [names.onMove ?? noopName]: e => {
            if (!containerRef.current || !holder.isActive) {
              return;
            }
            e.preventDefault();
            const x = getX(e) - containerRef.current.offsetLeft;
            const walk = (transformDelta ?? (v => v))(x - holder.startX);
            const scrollLeft = holder.scrollLeft - walk;
            containerRef.current.scrollLeft = scrollLeft;
            updateOffsets();
            holder.isMoving = true;
          }
        };
        delete handlers[noopName];
        return handlers;
      },
      []
    );

    return (
      <ThemedScroll ref={ref} {...extraProps} {...rest}>
        <ThemedScrollContainer
          ref={containerRef}
          style={{ overflow: 'hidden' }}
          {...getHandlers(
            {
              onCapture: 'onClickCapture',
              onStart: 'onMouseDown',
              onStop: 'onMouseUp',
              onLeave: 'onMouseLeave',
              onMove: 'onMouseMove'
            },
            e => e?.pageX ?? 0
          )}
          {...getHandlers(
            {
              onCapture: 'onGotPointerCapture',
              onStart: 'onTouchStart',
              onStop: 'onTouchEnd',
              onMove: 'onTouchMove'
            },
            e => e?.touches?.[0]?.pageX ?? 0
          )}
          {...extraProps}
          {...containerProps}
        >
          <ThemedScrollContainerContent
            {...extraProps}
            {...containerContentProps}
          >
            {children}
          </ThemedScrollContainerContent>
        </ThemedScrollContainer>
      </ThemedScroll>
    );
  }
);

Scroll.displayName = 'Scroll';
