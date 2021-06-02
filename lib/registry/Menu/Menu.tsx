import React, { forwardRef, HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../../models';
import { menuContextDefaults, MenuContext } from './MenuContext';

export interface MenuProps extends HTMLAttributes<HTMLDivElement>, StyleProps {
  activeIds?: string[];
  onGroupClick?: (id: string) => void;
  onItemClick?: (id: string) => void;
}

export const createMenu: ComponentFactory<HTMLDivElement, MenuProps> = ({
  themed
}) => {
  const ThemedMenu = themed('div', { path: 'menu' });
  return forwardRef(
    ({ onGroupClick, onItemClick, activeIds, ...rest }, ref) => (
      <MenuContext.Provider
        value={{
          activeIds: activeIds ?? menuContextDefaults.activeIds,
          onGroupClick: onGroupClick ?? menuContextDefaults.onGroupClick,
          onItemClick: onItemClick ?? menuContextDefaults.onItemClick
        }}
      >
        <ThemedMenu ref={ref} {...rest} />
      </MenuContext.Provider>
    )
  );
};
