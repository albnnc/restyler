import React, {
  Children,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  useContext,
  useReducer,
  useState
} from 'react';
import { useIsomorphicLayoutEffect, useSharedRef, useThemed } from '../hooks';
import { StyleProps } from '../models';
import { SystemContext } from './SystemContext';
import { useCleanableRef } from 'src/hooks/useCleanableRef';
import { measureChildren, Measurements } from 'src/utils';

export interface MasonryProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  columns: {
    count?: number;
    minWidth?: string;
    template?: string;
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
    const [measurements, setMeasurements] = useState<Measurements[]>([]);
    useIsomorphicLayoutEffect(() => {
      measureChildren(
        <SystemContext.Provider value={system}>
          {children}
        </SystemContext.Provider>
      ).then(setMeasurements);
    }, [childrenArray.map(v => v.key).join()]);

    const [layout, updateLayout] = useReducer(
      (prev: { [key: string]: number }, el: HTMLDivElement) => {
        const changes = {} as typeof prev;
        const style = getComputedStyle(el);
        const template = style.getPropertyValue('grid-template-columns');
        changes.xCount = template.split(' ').length || 1;
        changes.xGap = parseFloat(style.getPropertyValue('gap')) || 0;
        if (el.firstChild) {
          const childStyle = getComputedStyle(el.firstChild as Element);
          changes.yGap = parseFloat(childStyle.getPropertyValue('gap')) || 0;
        }
        return Object.keys(changes).some(k => changes[k] !== prev[k])
          ? { ...prev, ...changes }
          : prev;
      },
      {
        xCount: 1,
        xGap: 0,
        yGap: 0
      }
    );
    const handleElement = useCleanableRef<HTMLDivElement>(el => {
      updateLayout(el);
      const observer = new ResizeObserver(entries => {
        if (entries.some(v => v.target === el)) {
          updateLayout(el);
        }
      });
      observer.observe(el);
      return () => observer.disconnect();
    }, []);
    const sharedRef = useSharedRef<HTMLDivElement>(null, [ref, handleElement]);

    const columnHeights = new Array(layout.xCount).fill(0);
    const columnElements = childrenArray
      .reduce((columns, child, i) => {
        const targetIndex = columnHeights.indexOf(Math.min(...columnHeights));
        columns[targetIndex].push(child);
        const { height = 1, margin: { top = 0, bottom = 0 } = {} } =
          measurements[i] ?? {};
        columnHeights[targetIndex] += height + top + bottom + layout.yGap;
        return columns;
      }, columnHeights.map(() => []) as ReactElement[][])
      .map((v, i) => (
        <ThemedMasonryColumn
          key={i}
          style={{ display: 'flex', flexDirection: 'column' }}
          {...columns.getProps?.({ index: i, children: v })}
        >
          {v}
        </ThemedMasonryColumn>
      ));
    const gridTemplateColumns = columns.count
      ? `repeat(${columns.count}, 1fr)`
      : columns.minWidth
      ? `repeat(auto-fit, minmax(${columns.minWidth}, 1fr))`
      : columns.template;

    return (
      <ThemedMasonry
        ref={sharedRef}
        style={{ display: 'grid', gridTemplateColumns }}
        {...rest}
      >
        {columnElements}
      </ThemedMasonry>
    );
  }
);
