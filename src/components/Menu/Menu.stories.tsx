/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useReducer } from 'react';
import { Menu, MenuGroup, MenuItem } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Navigation/Menu'
} as Meta;

export const Basics = () => {
  const [activeIds, handle] = useReducer(
    (ids: string[], action: { id: string; target: 'group' | 'item' }) => {
      const index = ids.indexOf(action.id);
      return action.target === 'group'
        ? index < 0
          ? ids.concat([action.id])
          : ids.filter((_, i) => i !== index)
        : index < 0
        ? ids.filter(v => !v.startsWith('item')).concat([action.id])
        : ids;
    },
    ['group-1', 'item-11']
  );
  return (
    <Menu
      activeIds={activeIds}
      sx={{ width: '100%', maxWidth: '250px' }}
      onGroupClick={id => handle({ id, target: 'group' })}
      onItemClick={id => handle({ id, target: 'item' })}
    >
      <MenuGroup id="group-1" title="Group 1">
        <MenuItem id="item-11">Item 11</MenuItem>
        <MenuItem id="item-12">Item 12</MenuItem>
        <MenuItem id="item-13">Item 13</MenuItem>
      </MenuGroup>
      <MenuGroup id="group-2" title="Group 2">
        <MenuItem id="item-21">Item 21</MenuItem>
        <MenuItem id="item-22">Item 22</MenuItem>
        <MenuItem id="item-23">Item 23</MenuItem>
        <MenuItem id="item-24">Item 24</MenuItem>
      </MenuGroup>
      <MenuItem id="item-3">Item 3</MenuItem>
      <MenuItem id="item-4">Item 4</MenuItem>
    </Menu>
  );
};

export const Blueprint = createBlueprint('menu');
