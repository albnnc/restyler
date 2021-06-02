import { useState } from 'react';
import { Column } from './Column';
import { SortSelection } from './Sort';

export const getSorted = <T extends object>(
  data: T[],
  { key, direction, comparator }: SortSelection
) =>
  data.sort((a, b) => {
    const x = a?.[key];
    const y = b?.[key];
    const defaultComparator = (x, y) => (x > y ? 1 : x < y ? -1 : 0);
    return (
      (direction === 'asc' ? 1 : -1) *
      (comparator?.(x, y) ?? defaultComparator(x, y))
    );
  });

export const useSortSelections = (columns: Column<any>[]) => {
  const [sortSelections, setSortSelections] = useState<SortSelection[]>(
    columns.reduce(
      (prev, { key, sort }) => [
        ...prev,
        ...(typeof sort === 'object' && sort.defaultDirection
          ? [
              {
                key,
                direction: sort.defaultDirection,
                comparator: sort.comparator
              }
            ]
          : [])
      ],
      []
    )
  );
  const toggleSortSelection = (key: string) => {
    const sortSelectionIndex = sortSelections.findIndex(v => v.key === key);
    const sortSelection = sortSelections[sortSelectionIndex];
    const updates = sortSelections.slice();
    if (sortSelection) {
      updates.splice(sortSelectionIndex);
    }
    const direction = {
      '': 'asc',
      asc: 'desc',
      desc: undefined
    }[sortSelection?.direction ?? ''] as 'asc' | 'desc' | undefined;
    if (direction) {
      updates.push({ key, direction });
    }
    setSortSelections(updates);
  };
  return { sortSelections, setSortSelections, toggleSortSelection };
};
