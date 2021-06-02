import { Navbar } from 'docs/components/shared';
import {
  Box,
  Container,
  Heading,
  Menu,
  MenuGroup,
  MenuItem
} from 'docs/components/shared';
import { capitalizeFirst } from 'lib';
import React, { useEffect, useState } from 'react';
import {
  useHistory,
  useRouteMatch,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { groups } from './groups';

export const DocsPage = () => {
  const history = useHistory();
  const [activeIds, setActiveIds] = useState<string[]>([]);

  const match = useRouteMatch<{
    group: string;
    item?: string;
  }>('/docs/:group/:item?');
  const { group, item } = match?.params ?? {};

  useEffect(() => {
    if (activeIds.length === 0) {
      setActiveIds(
        [
          group && `/docs/${group}`,
          group && item && `/docs/${group}/${item}`
        ].filter(v => v) as string[]
      );
    }
  }, [match?.params?.group]);

  return (
    <>
      <Navbar />
      <Container background="darkGrey" padding={{ vertical: 'larger' }}>
        <Heading kind="1" color="white" margin="none">
          {capitalizeFirst(item)}
        </Heading>
      </Container>
      <Container padding={{ vertical: 'larger' }}>
        <Box margin="-1rem" direction="row" wrap="reverse">
          <Box
            extend={{
              margin: '1rem',
              flex: '100 1',
              minWidth: '300px'
            }}
          >
            <Switch>
              {groups
                .reduce((prev, curr) => [...prev, ...curr.items], [])
                .map(item => (
                  <Route
                    key={item.path}
                    path={item.path}
                    component={item.component}
                  />
                ))}
              <Redirect to="/docs/general/introduction" />
            </Switch>
          </Box>
          {item && (
            <Box
              extend={{
                margin: '1rem',
                flex: '1 0',
                minWidth: '250px'
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
                  <MenuGroup
                    key={group.path}
                    id={group.path}
                    title={group.title}
                  >
                    {group.items.map(item => (
                      <MenuItem key={item.path} id={item.path}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </MenuGroup>
                ))}
              </Menu>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};
