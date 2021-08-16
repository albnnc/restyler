import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface TabOptionProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {
  id: string;
  isActive?: boolean;
}

export const TabOption = forwardRef<HTMLDivElement, TabOptionProps>(
  (props, ref) => {
    const ThemedTabOption = useThemed<
      'div',
      Pick<TabOptionProps, 'id' | 'isActive'>
    >('div', 'tab.option');
    return <ThemedTabOption ref={ref} {...props} />;
  }
);

TabOption.displayName = 'TabOption';
