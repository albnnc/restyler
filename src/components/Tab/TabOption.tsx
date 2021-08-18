import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemedFactory } from '../../hooks';
import { ThemeProps } from '../../models';

export interface TabOptionProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {
  id: string;
  isActive?: boolean;
}

export const TabOption = forwardRef<HTMLDivElement, TabOptionProps>(
  (props, ref) => {
    const useThemed =
      useThemedFactory<Pick<TabOptionProps, 'id' | 'isActive'>>();
    const ThemedTabOption = useThemed('div', { id: 'tab.option' });
    return <ThemedTabOption ref={ref} {...props} />;
  }
);

TabOption.displayName = 'TabOption';
