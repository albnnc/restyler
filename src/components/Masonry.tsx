import React, { Children, forwardRef, HTMLAttributes, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { GridAxisOptions, useGrid, useSharedRef, useThemed } from '../hooks';
import { StyleProps } from '../models';
import { getChildrenKey } from '../utils';

export interface MasonryProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  columns: GridAxisOptions & {
    getProps?: (options: {
      index: number;
    }) => Omit<HTMLAttributes<HTMLDivElement>, 'children'> & StyleProps;
  };
}

export const Masonry = forwardRef<HTMLDivElement, MasonryProps>(
  ({ columns, children, ...rest }, ref) => {
    const ThemedMasonry = useThemed('div', { path: 'masonry' });
    const ThemedMasonryColumn = useThemed('div', { path: 'masonry.column' });

    const { style, columnsCount, handleElement } = useGrid<HTMLDivElement>({
      columns
    });
    const sharedRef = useSharedRef<HTMLDivElement>(null, [ref, handleElement]);
    const entries = useMemo(
      () =>
        Children.map(children, (v, i) => {
          const container = document.createElement('div');
          const portal = createPortal(v, container, i.toString());
          return { container, portal };
        }) ?? [],
      [getChildrenKey(children)]
    );

    const columnChildren = useMemo(() => {
      if (!columnsCount) {
        return [];
      }
      let mountedCount = 0;
      const elements = new Array(columnsCount).fill(
        null as HTMLDivElement | null
      );
      return elements.map((_, i) => (
        <ThemedMasonryColumn
          key={i}
          ref={(element: HTMLDivElement | null) => {
            if (element) {
              elements[i] = element;
              if (++mountedCount === columnsCount) {
                const heights = new Array(elements.length).fill(0);
                entries.forEach(({ container }) => {
                  const targetIndex = heights.indexOf(Math.min(...heights));
                  elements[targetIndex]!.appendChild(container);
                  heights[targetIndex] = elements[targetIndex]!.offsetHeight;
                });
              }
            } else {
              elements.forEach(v => {
                while (v && v.firstChild) {
                  v.removeChild(v.firstChild);
                }
              });
            }
          }}
          style={{ display: 'flex', flexDirection: 'column' }}
          {...columns.getProps?.({ index: i })}
        />
      ));
    }, [columns, columnsCount, entries]);

    return (
      <ThemedMasonry
        ref={sharedRef}
        style={{ ...style, alignItems: 'start' }}
        {...rest}
      >
        {entries.map(v => v.portal)}
        {columnChildren}
      </ThemedMasonry>
    );
  }
);
