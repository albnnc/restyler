import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '~lib/models';

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    StyleProps {}

export const createTableBody: ComponentFactory<
  HTMLTableSectionElement,
  TableBodyProps
> = ({ themed }) => themed('tbody', { path: 'table.body' });
