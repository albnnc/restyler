import React, { forwardRef, TdHTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface TableCellProps
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'>,
    ThemeProps {}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (props, ref) => {
    const ThemedTableCell = useThemed('td', { key: 'table.cell' });
    return <ThemedTableCell ref={ref} {...(props as any)} />;
  }
);

TableCell.displayName = 'TableCell';
