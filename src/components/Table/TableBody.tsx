import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    ThemedProps {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props, ref) => {
    const ThemedTableBody = useThemed('tbody', { key: 'table.body' });
    return <ThemedTableBody ref={ref} {...props} />;
  }
);

TableBody.displayName = 'TableBody';
