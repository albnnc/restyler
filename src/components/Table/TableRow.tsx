import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement>,
    ThemeProps {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (props, ref) => {
    const ThemedTableRow = useThemed('tr', { id: 'table.row' });
    return <ThemedTableRow ref={ref} {...props} />;
  }
);

TableRow.displayName = 'TableRow';
