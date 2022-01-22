import { useCallback, useMemo, useReducer } from 'react';
import { hash } from '../utils';
import { useCleanableRef } from './useCleanableRef';

export interface GridAxisOptions {
  count?: number;
  minWidth?: string;
}

export interface GridOptions<
  Element extends HTMLElement,
  Extras extends object
> {
  columns?: GridAxisOptions;
  rows?: GridAxisOptions;
  getExtras?: (element?: Element) => Extras;
}

export interface GridMeasurements {
  gap?: number;
  rowsCount?: number;
  columnsCount?: number;
}

export const useGrid = <
  Element extends HTMLElement,
  Extras extends object = {}
>({
  columns,
  rows,
  getExtras
}: GridOptions<Element, Extras>) => {
  const getAxisTemplate = useCallback(
    ({ count, minWidth }: GridAxisOptions = {}) =>
      count
        ? `repeat(${count}, 1fr)`
        : minWidth
        ? `repeat(auto-fit, minmax(${minWidth}, 1fr))`
        : undefined,
    []
  );

  const style = useMemo(
    () => ({
      display: 'grid',
      gridTemplateColumns: getAxisTemplate(columns),
      gridTemplateRows: getAxisTemplate(rows)
    }),
    [hash(columns), hash(rows)]
  );

  const [measurements, measureElement] = useReducer(
    (prev: GridMeasurements & Extras, element: Element) => {
      const style = getComputedStyle(element);
      const next = {
        gap: parseFloat(style.getPropertyValue('gap')) || 0,
        rowsCount:
          style.getPropertyValue('grid-template-rows').split(' ').length || 1,
        columnsCount:
          style.getPropertyValue('grid-template-columns').split(' ').length ||
          1,
        ...getExtras?.(element)
      } as typeof prev;
      const isEqual = hash(prev) === hash(next);
      return isEqual ? prev : next;
    },
    { ...getExtras?.() } as any
  );

  const handleElement = useCleanableRef<Element>(element => {
    measureElement(element);
    const observer = new ResizeObserver(entries => {
      if (entries.some(v => v.target === element)) {
        measureElement(element);
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { style, measureElement, handleElement, ...measurements };
};
