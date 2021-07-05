import React, {
  Children,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  useContext,
  useState
} from 'react';
import {
  GridAxisOptions,
  useGrid,
  useIsomorphicLayoutEffect,
  useSharedRef,
  useThemed
} from '../hooks';
import { StyleProps } from '../models';
import { SystemContext } from './SystemContext';
import { BoxMeasurements, measureChildren } from 'src/utils';

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

    const system = useContext(SystemContext);
    const childrenArray = Children.toArray(children) as ReactElement[];
    const [measurements, setMeasurements] = useState<
      BoxMeasurements[] | undefined
    >();
    useIsomorphicLayoutEffect(() => {
      measureChildren(
        <SystemContext.Provider value={system}>
          {children}
        </SystemContext.Provider>
      ).then(setMeasurements);
    }, [childrenArray.map(v => v.key).join()]);

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
    const isMeasured = !!(measurements && columnsCount && childGaps);

    const columnHeights = new Array(columnsCount).fill(0);
    const columnElements = childrenArray
      .reduce((columns, child, i) => {
        const targetIndex = columnHeights.indexOf(Math.min(...columnHeights));
        columns[targetIndex].push(child);
        const { height = 1, margin: { top = 0, bottom = 0 } = {} } =
          measurements?.[i] ?? {};
        const gap = childGaps?.[targetIndex] ?? 0;
        columnHeights[targetIndex] += height + top + bottom + gap;
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
