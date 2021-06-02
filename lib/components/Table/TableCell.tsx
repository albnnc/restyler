import { forwardRef, TdHTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface TableCellProps
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'>,
    StyleProps {}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (props, ref) => {
    const ThemedTableCell = useThemed('td', {
      path: 'table.cell',
      style: { textAlign: 'center' }
    });
    return <ThemedTableCell ref={ref} {...(props as any)} />;
  }
);
