import { createContext } from 'react';

export const menuContextDefaults = {
  activeIds: [] as (string | number)[],
  onItemClick: (() => {}) as (id: string) => void,
  onGroupClick: (() => {}) as (id: string) => void
};

export const MenuContext = createContext(menuContextDefaults);
