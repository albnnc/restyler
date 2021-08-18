import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement>,
    ThemedProps {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (props, ref) => {
    const ThemedTableRow = useThemed('tr', { key: 'table.row' });
    return <ThemedTableRow ref={ref} {...props} />;
  }
);

TableRow.displayName = 'TableRow';
