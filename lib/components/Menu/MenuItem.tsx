import React, { forwardRef, useContext, HTMLAttributes, useMemo } from 'react';
import { useThemedFactory } from '../../hooks';
import { ThemeProps } from '../../models';
import { MenuContext } from './MenuContext';

export interface MenuItemProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {
  id: string;
}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ id, onClick, children, ...rest }, ref) => {
    const useThemed = useThemedFactory<{ isActive: boolean }>();
    const ThemedMenuItemTitle = useThemed('div', 'menu.item.title');
    const ThemedMenuItem = useThemed('div', 'menu.item');
    const { activeIds, onItemClick } = useContext(MenuContext);
    const isActive = useMemo(() => activeIds.includes(id), [activeIds]);
    const extraProps = { isActive };
    return (
      <ThemedMenuItem ref={ref} {...extraProps}>
        <ThemedMenuItemTitle
          onClick={e => {
            onItemClick(id);
            onClick?.(e);
          }}
          {...extraProps}
          {...rest}
        >
          {children}
        </ThemedMenuItemTitle>
      </ThemedMenuItem>
    );
  }
);

MenuItem.displayName = 'MenuItem';
