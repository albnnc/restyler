import { jsx } from '@emotion/core';
import { Box, Menu, MenuGroup, MenuItem } from 'docs/components/shared';
import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { groups } from './groups';
import { useDocsRoute } from './useDocsRoute';

export const DocsMenu = () => {
  const history = useHistory();
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const docsRoute = useDocsRoute();
  const { group, item } = docsRoute;

  useEffect(() => {
    if (activeIds.length === 0) {
      setActiveIds(
        [
          group && `/docs/${group}`,
          group && item && `/docs/${group}/${item}`
        ].filter(v => v) as string[]
      );
    }
  }, [group]);

  if (activeIds.length < 1) {
    return null;
  }

  return (
    <Box
      css={{
        margin: '1rem',
        flex: '1 0 240px',
        maxWidth: '100%'
      }}
    >
      <Menu
        onGroupClick={id =>
          setActiveIds(
            activeIds.includes(id)
              ? activeIds.filter(v => v !== id)
              : [...activeIds, id]
          )
        }
        onItemClick={id => {
          setActiveIds([
            ...activeIds.filter(v => groups.some(g => g.path === v)),
            id
          ]);
          history.push(id);
        }}
        activeIds={activeIds}
      >
        {groups.map(group => (
          <MenuGroup key={group.path} id={group.path} title={group.title}>
            {group.items.map(item => (
              <MenuItem key={item.path} id={item.path}>
                {item.title}
              </MenuItem>
            ))}
          </MenuGroup>
        ))}
      </Menu>
    </Box>
  );
};
