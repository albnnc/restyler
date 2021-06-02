import { useEffect, useState } from 'react';
import { Column } from './Column';
import { Sort, SortDirection, SortSelection } from './Sort';

export const getSortObject = <T extends Sort | undefined>(
  sort: T
): T extends object | true ? Exclude<Sort, boolean> : undefined => {
  return (typeof sort === 'object' ? sort : sort ? {} : undefined) as any;
};

export const getSorted = <T extends object>(
  data: T[],
  { key, direction, comparator }: SortSelection
) => {
  const defaultComparator = (x, y) => (x > y ? 1 : x < y ? -1 : 0);
  return data.sort((a, b) => {
    const x = a?.[key];
    const y = b?.[key];
    return (
      (direction === 'asc' ? 1 : -1) *
      (comparator?.(x, y) ?? defaultComparator(x, y))
    );
  });
};

export const getDefaultSortSelections = (
  columns: Column<any>[]
): SortSelection[] =>
  columns.reduce((prev, { key, sort }) => {
    const { comparator, direction, defaultDirection } =
      getSortObject(sort) ?? {};
    return prev.concat(
      direction || defaultDirection
        ? [
            {
              key,
              direction: (direction ?? defaultDirection) as SortDirection,
              comparator
            }
          ]
        : []
    );
  }, [] as SortSelection[]);

export const useSortSelections = (columns: Column<any>[]) => {
  const [sortSelections, setSortSelections] = useState<SortSelection[]>(
    getDefaultSortSelections(columns)
  );

  useEffect(() => {
    columns.forEach(({ key, sort }) => {
      const sortObject = getSortObject(sort);
      const sortSelectionIndex = sortSelections.findIndex(v => v.key === key);
      const sortSelectionDirection =
        sortSelections[sortSelectionIndex]?.direction;
      if (
        sortObject?.direction &&
        sortObject.direction !== sortSelectionDirection
      ) {
        // force direction if sort is controlled
        // differers from sort selection
        const updates = sortSelections.slice();
        if (sortSelectionIndex >= 0) {
          updates.splice(sortSelectionIndex);
        }
        updates.push({ key, direction: sortObject.direction });
        setSortSelections(updates);
      } else if (!sort && sortSelectionDirection) {
        // remove sort selection if column became non-sortable
        const updates = sortSelections.slice();
        updates.splice(sortSelectionIndex, 1);
        setSortSelections(updates);
      }
    });
  }, [columns]);

  const toggleSortSelection = (key: string) => {
    // controlled sort
    const sort = columns.find(v => v.key === key)?.sort;
    const sortObject = getSortObject(sort);
    if (sortObject?.direction) {
      return;
    }
    // uncontrolled sort, toggling
    const sortSelectionIndex = sortSelections.findIndex(v => v.key === key);
    const sortSelection = sortSelections[sortSelectionIndex];
    const updates = sortSelections.slice();
    if (sortSelectionIndex >= 0) {
      updates.splice(sortSelectionIndex, 1);
    }
    const direction = {
      '': 'asc',
      asc: 'desc',
      desc: undefined
    }[sortSelection?.direction ?? ''] as SortDirection | undefined;
    if (direction) {
      updates.push({ key, direction, comparator: sortObject?.comparator });
    }
    setSortSelections(updates);
  };

  return { sortSelections, setSortSelections, toggleSortSelection };
};
