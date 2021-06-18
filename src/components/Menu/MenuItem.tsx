import React, { forwardRef, useContext, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';
import { MenuContext } from './MenuContext';

export interface MenuItemProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  id: string;
}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ id, onClick, children, ...rest }, ref) => {
    const ThemedMenuItemTitle = useThemed<'div', { isActive: boolean }>('div', {
      path: 'menu.item.title'
    });
    const ThemedMenuItem = useThemed('div', { path: 'menu.item' });
    const { activeIds, onItemClick } = useContext(MenuContext);
    return (
      <ThemedMenuItem ref={ref}>
        <ThemedMenuItemTitle
          isActive={activeIds.includes(id)}
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
