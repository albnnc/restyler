import React, { forwardRef, HTMLAttributes } from 'react';
import { GridAxisOptions, useGrid, useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface FormGridProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  columns?: GridAxisOptions;
}

export const FormGrid = forwardRef<HTMLDivElement, FormGridProps>(
  ({ columns, ...rest }, ref) => {
    const ThemedFormGrid = useThemed('div', { path: 'form.grid' });
    const { style } = useGrid({ columns });
    return <ThemedFormGrid ref={ref} style={style} {...rest} />;
  }
);

FormGrid.displayName = 'FormGrid';
