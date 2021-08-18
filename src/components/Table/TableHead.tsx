import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface TableHeadProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    ThemeProps {}

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  (props, ref) => {
    const ThemedTableHead = useThemed('thead', { key: 'table.head' });
    return <ThemedTableHead ref={ref} {...props} />;
  }
);

TableHead.displayName = 'TableHead';
