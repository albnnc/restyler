import React, { forwardRef, TdHTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface TableCellProps
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'>,
    ThemedProps {}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (props, ref) => {
    const ThemedTableCell = useThemed('td', { key: 'table.cell' });
    return <ThemedTableCell ref={ref} {...(props as any)} />;
  }
);

TableCell.displayName = 'TableCell';
