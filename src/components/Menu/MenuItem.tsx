import React, { forwardRef, useContext, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';
import { MenuContext } from './MenuContext';

export interface MenuItemProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {
  id: string;
}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ id, onClick, children, ...rest }, ref) => {
    const ThemedMenuItemTitle = useThemed<'div', { isActive: boolean }>(
      'div',
      'menu.item.title'
    );
    const ThemedMenuItem = useThemed<'div', { isActive: boolean }>(
      'div',
      'menu.item'
    );
    const { activeIds, onItemClick } = useContext(MenuContext);
    const isActive = activeIds.includes(id);
    return (
      <ThemedMenuItem ref={ref} isActive={isActive}>
        <ThemedMenuItemTitle
          isActive={isActive}
          onClick={e => {
            onItemClick(id);
            onClick?.(e);
          }}
          {...rest}
        >
          {children}
        </ThemedMenuItemTitle>
      </ThemedMenuItem>
    );
  }
);

MenuItem.displayName = 'MenuItem';
