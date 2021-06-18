import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface TableHeadProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    StyleProps {}

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  (props, ref) => {
    const ThemedTableHead = useThemed('thead', { path: 'table.head' });
    return <ThemedTableHead ref={ref} {...props} />;
  }
);

TableHead.displayName = 'TableHead';
