import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemedProps } from '../../models';
import { menuContextDefaults, MenuContext } from './MenuContext';

export interface MenuProps extends HTMLAttributes<HTMLDivElement>, ThemedProps {
  activeIds?: string[];
  onGroupClick?: (id: string) => void;
  onItemClick?: (id: string) => void;
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ onGroupClick, onItemClick, activeIds, ...rest }, ref) => {
    const ThemedMenu = useThemed('div', { key: 'menu' });
    return (
      <MenuContext.Provider
        value={{
          activeIds: activeIds ?? menuContextDefaults.activeIds,
          onGroupClick: onGroupClick ?? menuContextDefaults.onGroupClick,
          onItemClick: onItemClick ?? menuContextDefaults.onItemClick
        }}
      >
        <ThemedMenu ref={ref} {...rest} />
      </MenuContext.Provider>
    );
  }
);
