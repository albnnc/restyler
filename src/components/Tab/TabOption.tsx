import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface TabOptionProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  id: string;
  isActive?: boolean;
}

export const TabOption = forwardRef<HTMLDivElement, TabOptionProps>(
  (props, ref) => {
    const ThemedTabOption = useThemed<'div', TabOptionProps>('div', {
      path: 'tab.option'
    });
    return <ThemedTabOption ref={ref} {...props} />;
  }
);

TabOption.displayName = 'TabOption';
