import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../../models';

export interface TableHeadProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    StyleProps {}

export const createTableHead: ComponentFactory<
  HTMLTableSectionElement,
  TableHeadProps
> = ({ themed }) => themed('thead', { path: 'table.head' });
