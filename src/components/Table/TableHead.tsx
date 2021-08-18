import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface TableHeadProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    ThemedProps {}

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  (props, ref) => {
    const ThemedTableHead = useThemed('thead', { key: 'table.head' });
    return <ThemedTableHead ref={ref} {...props} />;
  }
);

TableHead.displayName = 'TableHead';
