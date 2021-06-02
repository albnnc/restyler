import { AllHTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '~lib/models';

export interface TableCellProps
  extends AllHTMLAttributes<HTMLTableCellElement>,
    StyleProps {}

export const createTableCell: ComponentFactory<
  HTMLTableCellElement,
  TableCellProps
> = ({ themed }) =>
  themed('td', { path: 'table.cell', style: { textAlign: 'center' } });
