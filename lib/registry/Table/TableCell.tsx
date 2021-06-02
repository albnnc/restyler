import { TdHTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../../models';

export interface TableCellProps
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'>,
    StyleProps {}

export const createTableCell: ComponentFactory<
  HTMLTableCellElement,
  TableCellProps
> = ({ themed }) =>
  themed('td', { path: 'table.cell', style: { textAlign: 'center' } });
