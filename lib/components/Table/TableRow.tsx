import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement>,
    StyleProps {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (props, ref) => {
    const ThemedTableRow = useThemed('tr', { path: 'table.row' });
    return <ThemedTableRow ref={ref} {...props} />;
  }
);
