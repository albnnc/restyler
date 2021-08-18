import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface TableProps
  extends HTMLAttributes<HTMLTableElement>,
    ThemedProps {}

export const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const ThemedTable = useThemed('table', { key: 'table' });
  return <ThemedTable ref={ref} {...props} />;
});

Table.displayName = 'Table';
