import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface TableProps
  extends HTMLAttributes<HTMLTableElement>,
    StyleProps {}

export const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const ThemedTable = useThemed('table', { path: 'table' });
  return <ThemedTable ref={ref} {...props} />;
});
