import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    StyleProps {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props, ref) => {
    const ThemedTableBody = useThemed('tbody', { path: 'table.body' });
    return <ThemedTableBody ref={ref} {...props} />;
  }
);

TableBody.displayName = 'TableBody';
