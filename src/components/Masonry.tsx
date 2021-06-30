import React, {
  Children,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  useContext,
  useReducer,
  useState
} from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { useIsomorphicLayoutEffect, useSharedRef, useThemed } from '../hooks';
import { StyleProps } from '../models';
import { SystemContext } from './SystemContext';

export interface MasonryProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  template?: string;
  columnProps?: HTMLAttributes<HTMLDivElement> & StyleProps;
}

export const Masonry = forwardRef<HTMLDivElement, MasonryProps>(
  ({ columnProps, template, children, ...rest }, ref) => {
    const ThemedMasonry = useThemed('div', { path: 'masonry' });
    const ThemedMasonryColumn = useThemed('div', { path: 'masonry.column' });

    const childrenArray = Children.toArray(children) as ReactElement[];
    const [heights, setHeights] = useState(childrenArray.map(() => 1));
    const system = useContext(SystemContext);
    useIsomorphicLayoutEffect(() => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      render(
        <SystemContext.Provider value={system}>
          {children}
        </SystemContext.Provider>,
        container,
        () => {
          const heights = Array.from(container.childNodes).map(
            (v: HTMLElement) => v.offsetHeight
          );
          setHeights(heights);
          unmountComponentAtNode(container);
          document.body.removeChild(container);
        }
      );
    }, []);

    const [columnsCount, updateColumnsCount] = useReducer(
      (_: number, el: HTMLDivElement) => {
        if (!el) {
          return;
        }
        const style = getComputedStyle(el);
        const columns = style.getPropertyValue('grid-template-columns');
        return columns.split(' ').length ?? 1;
      },
      1
    );
    const sharedRef = useSharedRef<HTMLDivElement>(null, [
      ref,
      updateColumnsCount
    ]);
    const columnHeights = new Array(columnsCount).fill(0);
    const columns = childrenArray
      .reduce((columns, child, i) => {
        let targetIndex = 0;
        for (let i = 1; i < columnHeights.length; ++i) {
          if (columnHeights[i] < columnHeights[targetIndex]) {
            targetIndex = i;
          }
        }
        columns[targetIndex].push(child);
        columnHeights[targetIndex] += heights[i];
        return columns;
      }, columnHeights.map(() => []) as ReactElement[][])
      .map((v, i) => (
        <ThemedMasonryColumn
          key={i}
          style={{ display: 'flex', flexDirection: 'column' }}
          {...columnProps}
        >
          {v}
        </ThemedMasonryColumn>
      ));

    return (
      <ThemedMasonry
        ref={sharedRef}
        style={{ display: 'grid', gridTemplateColumns: template }}
        {...rest}
      >
        {columns}
      </ThemedMasonry>
    );
  }
);

Masonry.displayName = 'Masonry';
