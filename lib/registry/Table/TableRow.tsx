import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '~lib/models';

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement>,
    StyleProps {}

export const createTableRow: ComponentFactory<
  HTMLTableRowElement,
  TableRowProps
> = ({ themed }) => themed('tr', { path: 'table.row' });
