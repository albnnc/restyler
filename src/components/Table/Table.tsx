import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface TableProps
  extends HTMLAttributes<HTMLTableElement>,
    ThemeProps {}

export const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const ThemedTable = useThemed('table', { id: 'table' });
  return <ThemedTable ref={ref} {...props} />;
});

Table.displayName = 'Table';
