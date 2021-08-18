import React, { forwardRef, HTMLAttributes } from 'react';
import { GridAxisOptions, useGrid, useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface FormGridProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemedProps {
  columns?: GridAxisOptions;
}

export const FormGrid = forwardRef<HTMLDivElement, FormGridProps>(
  ({ columns, ...rest }, ref) => {
    const ThemedFormGrid = useThemed('div', { key: 'form.grid' });
    const { style } = useGrid({ columns });
    return <ThemedFormGrid ref={ref} style={style} {...rest} />;
  }
);
