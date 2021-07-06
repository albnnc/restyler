import React, {
  Children,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  useState
} from 'react';
import {
  GridAxisOptions,
  useGrid,
  useIsomorphicLayoutEffect,
  useMeter,
  useSharedRef,
  useThemed
} from '../hooks';
import { StyleProps } from '../models';

export interface MasonryProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  columns: GridAxisOptions & {
    getProps?: (options: {
      index: number;
      children: ReactElement[];
    }) => Omit<HTMLAttributes<HTMLDivElement>, 'children'> & StyleProps;
  };
}

export const Masonry = forwardRef<HTMLDivElement, MasonryProps>(
  ({ columns, children, ...rest }, ref) => {
    const ThemedMasonry = useThemed('div', { path: 'masonry' });
    const ThemedMasonryColumn = useThemed('div', { path: 'masonry.column' });

    const childrenArray = Children.toArray(children) as ReactElement[];
    const [heights, setHeights] = useState<number[] | undefined>();
    const measureChildren = useMeter(
      container =>
        Array.from(container.childNodes).map((v: HTMLElement) => {
          const style = getComputedStyle(v);
          return (
            v.offsetHeight +
            parseFloat(style.getPropertyValue('margin-top')) +
            parseFloat(style.getPropertyValue('margin-bottom'))
          );
        }),
      { deps: [] }
    );
    useIsomorphicLayoutEffect(() => {
      // FIXME: `setHeights` might be called after component unmount.
      measureChildren?.(children).then(setHeights);
    }, [measureChildren, childrenArray.map(v => v.key).join()]);

    const { style, columnsCount, childGaps, handleElement } = useGrid<
      HTMLDivElement,
      { childGaps: number[] | undefined }
    >({
      columns,
      getExtras: element => {
        const children = Array.from(element?.childNodes ?? []);
        const childGaps = children.map((v: HTMLElement) =>
          parseFloat(getComputedStyle(v).getPropertyValue('gap'))
        );
        return { childGaps };
      }
    });
    const sharedRef = useSharedRef<HTMLDivElement>(null, [ref, handleElement]);
    const isMeasured = !!(heights && columnsCount && childGaps);

    const columnHeights = new Array(columnsCount).fill(0);
    const columnElements = childrenArray
      .reduce((columns, child, i) => {
        const targetIndex = columnHeights.indexOf(Math.min(...columnHeights));
        columns[targetIndex].push(child);
        const height = heights?.[i] ?? 1;
        const gap = childGaps?.[targetIndex] ?? 0;
        columnHeights[targetIndex] += height + gap;
        return columns;
      }, columnHeights.map(() => []) as ReactElement[][])
      .map((v, i) => (
        <ThemedMasonryColumn
          key={i}
          style={{ display: 'flex', flexDirection: 'column' }}
          {...columns.getProps?.({ index: i, children: v })}
        >
          {isMeasured && v}
        </ThemedMasonryColumn>
      ));

    return (
      <ThemedMasonry ref={sharedRef} style={style} {...rest}>
        {columnElements}
      </ThemedMasonry>
    );
  }
);
