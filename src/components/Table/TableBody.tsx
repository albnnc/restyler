import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    ThemeProps {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props, ref) => {
    const ThemedTableBody = useThemed('tbody', { id: 'table.body' });
    return <ThemedTableBody ref={ref} {...props} />;
  }
);

TableBody.displayName = 'TableBody';
