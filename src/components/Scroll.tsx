import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  HTMLAttributes,
  useCallback
} from 'react';
import { ThemedOptions, useThemed } from '../hooks';
import { ThemedProps } from '../models';

export interface ScrollProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemedProps {
  hasLeftOffset: boolean;
  hasRightOffset: boolean;
  containerContentProps?: HTMLAttributes<HTMLDivElement> & ThemedProps;
  containerProps?: HTMLAttributes<HTMLDivElement> & ThemedProps;
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
    const ThemedScroll = useTyped('div', { key: 'scroll' });
    const ThemedScrollContainer = useTyped('div', { key: 'scroll.container' });
    const ThemedScrollContainerContent = useTyped('div', {
      key: 'scroll.container.content'
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const [holder] = useState({} as any);
    const [hasLeftOffset, setHasLeftOffset] = useState(false);
    const [hasRightOffset, setHasRightOffset] = useState(false);
    const themedProps = { hasLeftOffset, hasRightOffset };

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
      <ThemedScroll ref={ref} {...themedProps} {...rest}>
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
          {...themedProps}
          {...containerProps}
        >
          <ThemedScrollContainerContent
            {...themedProps}
            {...containerContentProps}
          >
            {children}
          </ThemedScrollContainerContent>
        </ThemedScrollContainer>
      </ThemedScroll>
    );
  }
);

const useTyped = <Tag extends keyof JSX.IntrinsicElements>(
  tag: Tag,
  options: ThemedOptions
) =>
  useThemed<Tag, Pick<ScrollProps, 'hasLeftOffset' | 'hasRightOffset'>>(
    tag,
    options
  );
