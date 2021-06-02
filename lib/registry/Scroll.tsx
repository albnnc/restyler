import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  HTMLAttributes
} from 'react';
import { ComponentFactory, StyleProps } from '../models';

interface ScrollOptions {
  hasLeftOffset: boolean;
  hasRightOffset: boolean;
}

export interface ScrollProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  containerContentProps?: HTMLAttributes<HTMLDivElement> & StyleProps;
  containerProps?: HTMLAttributes<HTMLDivElement> & StyleProps;
  transformDelta?: (v: number) => number;
}

export const createScroll: ComponentFactory<HTMLDivElement, ScrollProps> = ({
  themed
}) => {
  const ThemedScroll = themed<'div', ScrollOptions>('div', { path: 'scroll' });
  const ThemedScrollContainer = themed<'div', ScrollOptions>('div', {
    path: 'scroll.container',
    style: { overflow: 'hidden' }
  });
  const ThemedScrollContainerContent = themed<'div', ScrollOptions>('div', {
    path: 'scroll.container.content'
  });

  return forwardRef(
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
      const containerRef = useRef<HTMLDivElement>(null);
      const [holder] = useState({} as any);
      const [hasLeftOffset, setHasLeftOffset] = useState(false);
      const [hasRightOffset, setHasRightOffset] = useState(false);
      const scrollOptions = { hasLeftOffset, hasRightOffset };

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
        // @ts-ignore
        // https://github.com/Microsoft/TypeScript/issues/28502
        const resizeObserver = new ResizeObserver(updateOffsets);
        resizeObserver.observe(containerRef.current);
        updateOffsets();
      }, [containerRef.current]);

      return (
        <ThemedScroll {...scrollOptions} ref={ref} {...rest}>
          <ThemedScrollContainer
            ref={containerRef}
            onClickCapture={e => {
              if (holder.isMoving) {
                e.stopPropagation();
              }
              holder.isMoving = false;
            }}
            onMouseDown={e => {
              if (!containerRef.current) {
                return;
              }
              holder.isMouseDown = true;
              holder.startX = e.pageX - containerRef.current.offsetLeft;
              holder.scrollLeft = containerRef.current.scrollLeft;
            }}
            onMouseLeave={() => {
              holder.isMouseDown = false;
            }}
            onMouseUp={e => {
              holder.isMouseDown = false;
            }}
            onMouseMove={e => {
              if (!containerRef.current || !holder.isMouseDown) {
                return;
              }
              e.preventDefault();
              const x = e.pageX - containerRef.current.offsetLeft;
              const walk = (transformDelta ?? (v => v))(x - holder.startX);
              const scrollLeft = holder.scrollLeft - walk;
              containerRef.current.scrollLeft = scrollLeft;
              updateOffsets();
              holder.isMoving = true;
            }}
            {...scrollOptions}
            {...containerProps}
          >
            <ThemedScrollContainerContent
              {...scrollOptions}
              {...containerContentProps}
            >
              {children}
            </ThemedScrollContainerContent>
          </ThemedScrollContainer>
        </ThemedScroll>
      );
    }
  );
};
