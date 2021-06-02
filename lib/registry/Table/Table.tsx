import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../../models';

export interface TableProps
  extends HTMLAttributes<HTMLTableElement>,
    StyleProps {}

export const createTable: ComponentFactory<HTMLTableElement, TableProps> = ({
  themed
}) => themed('table', { path: 'table' });
